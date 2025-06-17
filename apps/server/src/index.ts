import 'dotenv/config';
import { RPCHandler } from '@orpc/server/fetch';
import { createContext } from './lib/context';
import { appRouter } from './routers/index';
import { auth } from './lib/auth';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

app.use(logger());
app.use(
  '/*',
  cors({
    origin: (origin) => {
      const allowed = ['http://localhost:3001', 'https://your-frontend.com'];
      return allowed.includes(origin ?? '') ? origin : '';
    },
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.on(['GET', 'POST', 'OPTIONS'], '/api/auth/**', async (c) => {
  if (c.req.method === 'OPTIONS') {
    const res = c.newResponse(null, 204);
    res.headers.set(
      'Access-Control-Allow-Origin',
      c.req.header('Origin') || '',
    );
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }

  return auth.handler(c.req.raw);
});

const handler = new RPCHandler(appRouter);
app.use('/rpc/*', async (c, next) => {
  const context = await createContext({ context: c });
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
    context: context,
  });
  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

app.get('/', (c) => {
  return c.text('OK');
});

import { serve } from '@hono/node-server';

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
// testing
