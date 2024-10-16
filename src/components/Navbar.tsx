'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import ThemeSwitcher from "./Themeswitcher";
import { useTheme } from "next-themes";

type Props = {
    isAuth: boolean;
};

const Navbar = ({ isAuth }: Props) => {
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
        <div className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? "bg-[rgb(239,238,234)] text-black" : "bg-[rgb(15,23,42)] text-white"} flex flex-row justify-evenly items-center py-4`}>
            <Link href='/' className="text-2xl font-semibold ">GenieAI</Link>
            <div className="center">
                {/* <Button>Subscribe</Button> */}
            </div>
            <div className={`right flex space-x-5 ${darkMode ? " text-black" : "text-white"}`}>
                {!isAuth && 
                (
                    <Link href="/signup">
                        <Button className={`border ${darkMode ?  "border-black hover:bg-black hover:text-white" : "border-white hover:bg-white hover:text-black" }`}>
                            Signup
                            <LogIn className="w-4 ml-2" />
                        </Button>
                    </Link>
                )}
                {isAuth && <UserButton afterSignOutUrl="/" />}
                <ThemeSwitcher/>
            </div>
        </div>
    );
};

export default Navbar;
