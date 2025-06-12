import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_mainLayout/_main/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_mainLayout/_main/cek"!</div>
}
