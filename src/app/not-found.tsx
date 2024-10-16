"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "dark" ? systemTheme : theme;
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
      if(currentTheme==='dark'){
        setDarkMode(true);
      }
      else{
        setDarkMode(false);
      }
    },[currentTheme])
  
    // console.log(themeCheck)
    // console.log(darkMode)
    return (
        <body className={`flex flex-col h-screen justify-center items-center ${darkMode ? "bg-black/85" : "bg-white/40"}`}>
            <div className={`flex flex-col items-center ${darkMode ? "text-gray-100" : "text-gray-700"}`}>
                <h1 className="text-[120px] font-extrabold ">404</h1>
                <p className="text-2xl font-medium  mb-6">Page Not Found</p>
                <Button>
                    <a href="/" className="px-4 py-2">
                        Go Home
                    </a>
                </Button>
            </div>
        </body>
    )
}