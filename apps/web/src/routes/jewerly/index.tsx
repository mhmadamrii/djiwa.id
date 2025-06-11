import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/jewerly/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/jewerly/"!</div>
}
