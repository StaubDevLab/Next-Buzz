'use client';
import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

const HeaderLink = ({pathName, children}: { pathName: string, children: React.ReactNode}) => {
    const path = usePathname();
    return (
        <li>

            <Link href={`/${pathName}`} className={path.startsWith(`/${pathName}`) ? "active" : ""}>{children}</Link>


        </li>
    );
};

export default HeaderLink;