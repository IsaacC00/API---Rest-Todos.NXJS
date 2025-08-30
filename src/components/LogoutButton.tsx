'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { CiLogout } from 'react-icons/ci'

export const LogoutButton = () => {

    //? simplemente para cerrar sesion deemos tomar la data de usue Session
    const { data: session, status } = useSession()
    if (status === 'loading') {
        (<button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Waiting...</span>
        </button>)
    }

    if (status === 'unauthenticated') {
        (<button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Ingresar</span>
        </button>)
    }

    return (
        <button
            onClick={() => signOut()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    )
}