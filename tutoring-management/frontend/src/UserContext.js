import { createContext, useState } from 'react'

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, setUser] = useState('')

    return (
        <UserContext.Provider value={ [user, setUser] }>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext