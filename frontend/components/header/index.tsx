import React from 'react';
import Link from "next/link";
import HeaderLink from "@/components/header-link";

const Header = () => {

    return (
        <header id="main-header">
            <div id="logo">
                <Link href="/">NextNews</Link>
            </div>
            <nav>
                <ul>
                    <HeaderLink pathName={"news"}>News</HeaderLink>
                    <HeaderLink pathName={"archive"}>Archive</HeaderLink>

                </ul>
            </nav>
        </header>
    );
};

export default Header;