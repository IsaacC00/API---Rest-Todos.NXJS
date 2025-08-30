import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { CiLogout } from 'react-icons/ci'
import { FaBagShopping } from 'react-icons/fa6'
import { LiaCookieSolid } from 'react-icons/lia'
import { IoCheckboxOutline, IoHomeOutline, IoListOutline } from 'react-icons/io5'

import { SidebarItem } from './SidebarItem'
import imageLogo from '../../public/logo.png'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { TiUserOutline } from 'react-icons/ti'
import { LogoutButton } from './LogoutButton'

const menuItems = [
    {
        path: '/dashboard',
        icon: <IoHomeOutline size={30} />,
        title: 'Inicio',
    },
    {
        path: '/dashboard/rest-todos',
        icon: <IoCheckboxOutline size={30} />,
        title: 'Rest TODOS',
    },
    {
        path: '/dashboard/server-todos',
        icon: <IoListOutline size={30} />,
        title: 'Server Actions',
    },
    {
        path: '/dashboard/cookies',
        icon: <LiaCookieSolid size={30} />,
        title: 'Cookies',
    },
    {
        path: '/dashboard/products',
        icon: <FaBagShopping size={30} />,
        title: 'Productos',
    },
    {
        path: '/dashboard/profile',
        icon: <TiUserOutline size={30} />,
        title: 'Profile',
    },
]

export const Sidebar = async() => {

    //? obtenemos la sesion con la funcion y recibe como parametro authOptions
    const session = await getServerSession(authOptions);

    //? si no existe sesion redirecionamos al signin
    if (!session) {
        redirect('/api/auth/signin');
    }

    const userName = session.user?.name ?? '';
    const userImage = session.user?.image ?? '';
    const userRoles = session.user?.roles ?? ['client'];

    return (
        <aside className="overflow-auto fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    {/* TODO: Next/Link hacia dashboard */}
                    <Link href="#" title="home">
                        {/* Next/Image */}
                        <Image src={imageLogo} width={100} height={100} alt="tailus logo" />
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    {/* Next/Image */}
                    <Image src={userImage} width={100} height={100} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                    <span className=" text-gray-400 text-sm capitalize">{userRoles.join(',')}</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        menuItems.map(item => (<SidebarItem key={item.path} {...item} />))

                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
              
               <LogoutButton />
            </div>
        </aside>

    )
}
