import React, {useState, useEffect, createContext} from 'react'
import {auth, db} from './Firebase'

const AuthContext = createContext()

export const AuthContextProvider = props => {
    const [authState, setAuthState] = useState()

    const getAuth = () => {
        auth.onAuthStateChanged(async user => {
            if (user) {
                const response = await db.collection('admin').where('uid', '==', user.uid).get()
                setAuthState(response.docs[0].data())
            }
        })
    }

    useEffect(() => {
        getAuth()
    }, [])

    return (
        <AuthContext.Provider value={{authState}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext