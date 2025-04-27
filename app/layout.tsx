import React from 'react'
import "../style/globals.css";
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local';


const primaryFont = Poppins({
    subsets: ["latin"],
    weight: "400"
})

const secondFont = localFont({
    src: "../assets/fonts/InterVariable.woff2",
    variable: '--font-primary',
})

const RootLayout = ({ children }: any) => {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body className={`${secondFont.variable}`} >
                {children}
            </body>
        </html>
    )
}

export default RootLayout