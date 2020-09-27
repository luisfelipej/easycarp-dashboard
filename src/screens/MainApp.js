import React from 'react'
import { useAuth } from '../context'

function MainApp() {
  const { user } = useAuth()
  return <p>Hola {user.name}</p>
}

export default MainApp
