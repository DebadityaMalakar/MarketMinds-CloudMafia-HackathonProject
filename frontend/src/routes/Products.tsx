import { createFileRoute } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'
import ProductsDashboard from '@/components/Products/Dashboard'
import { useVerifyConstant } from '@/utils/verifytoken'

export const Route = createFileRoute('/Products')({
  component: RouteComponent,
})

function RouteComponent() {
  useVerifyConstant({
    token: localStorage.getItem('token') || '',
    onVerified: () => {
      console.log('Token verified successfully');
    },
    onFailed: (message) => {
      console.error('Token verification failed:', message);
      if(localStorage.getItem("token")) localStorage.removeItem('token');
      // Optionally redirect to login or show an error
      window.location.href = '/login';
    },
    intervalMs: 60000 // Check every minute
  });
  return (
    <Fragment>
      <ProductsDashboard/>
    </Fragment>
  )
}
