import TeamCarousel from '@/components/TeamCarousel'
import { createFileRoute } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Fragment>
      <TeamCarousel/>
    </Fragment>
  )
}
