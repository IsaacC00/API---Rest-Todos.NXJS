'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { JSX } from 'react'
import { CiBookmarkCheck } from 'react-icons/ci'

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
}

export const SidebarItem = ({ icon, path, title }: Props) => {
    const pathName = usePathname();
    return (
        <li>
            <Link href={path} className={`
            ${pathName === path && 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'} 
            hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white 
            px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 grou
            `}>
                {icon}
                <span className="-mr-1 font-medium">{title}</span>
            </Link>
        </li>
    )
}
