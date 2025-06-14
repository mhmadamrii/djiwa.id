import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_mainLayout/_main/my-sales')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_mainLayout/_main/my-sales"!</div>
}
