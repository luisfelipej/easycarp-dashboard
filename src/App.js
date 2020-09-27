import React, { Suspense } from 'react'
import { Spinner } from '@chakra-ui/core'
import { useAuth } from './context'
const Login = React.lazy(() => import(`./screens/Login`))
const MainApp = React.lazy(() => import(`./screens/MainApp`))
const Layout = React.lazy(() => import(`./Layout`))
//components
function App() {
  const { user } = useAuth()
  return (
    <Suspense
      fallback={
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      }
    >
      {user ? (
        <Layout>
          <MainApp />
        </Layout>
      ) : (
        <Login />
      )}
    </Suspense>
  )
}

export default App
