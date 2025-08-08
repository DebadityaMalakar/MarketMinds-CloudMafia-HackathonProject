import Dashboard from '@/components/Dashboards/dashboard'
import { createFileRoute } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Fragment>
      <Dashboard/>
    </Fragment>
  )
}
