import '../globals.css';
import React from "react";
import Header from "@/components/header";

export const metadata = {
    title: 'NextBuzz',
    description: 'Learn how to route to different pages.',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fr">

        <body>
        <div id={"page"}>
            <Header/>
            {children}
        </div>
        </body>
        </html>
    )
}
