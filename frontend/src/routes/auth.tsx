import { createFileRoute } from '@tanstack/react-router'
import AuthPage from '@/components/auth'
import { Fragment } from 'react/jsx-runtime'

import { useVerifyConstant } from '@/utils/verifytoken'
import { use } from 'react'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  useVerifyConstant({
    token: localStorage.getItem('token') || '',
    onVerified: () => {
      if (localStorage.getItem("token")) window.location.href = '/products';
      console.log('Token verified successfully');
    },
    onFailed: (message) => {
      console.log(message)
    },
    intervalMs: 60000 // Check every minute
  });
  return (
    <Fragment>
        <AuthPage/>
    </Fragment>
  )
}
