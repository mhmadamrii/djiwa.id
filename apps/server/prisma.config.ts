import 'dotenv/config'; // uncomment this to load .env
import path from 'node:path';

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema'),
};
