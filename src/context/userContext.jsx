import { createContext, useState, useEffect } from 'react'
import {createUserDocumentFromAuth, onAuthStateChangeListerner } from '../utils/firebase'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {}
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = {
    currentUser,
    setCurrentUser
  }

  useEffect(() => {
    const unsubcribe = onAuthStateChangeListerner((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }

      setCurrentUser(user)
    })

    return unsubcribe
  },[])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}