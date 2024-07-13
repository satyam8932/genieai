import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

type Props = {};

const Navbar = (props: Props) => {

    const { userId } = auth();
    const isAuth = !!userId

    return (
        <div className="bg-[rgb(15,23,42)] flex flex-row justify-evenly items-center py-4">
            <Link href='/' className="text-2xl font-semibold text-white">GenieAI</Link>
            <div className="center">
                {/* <Button>Subscribe</Button> */}
            </div>
            <div className="right flex space-x-5">
                {!isAuth && 
                (
                    <Link href="/signup">
                        <Button className="border border-white hover:bg-white hover:text-black">
                            Signup
                            <LogIn className="w-4 ml-2" />
                        </Button>
                    </Link>
                )}
                {isAuth && <UserButton afterSignOutUrl="/" />}
            </div>
        </div>
    );
};

export default Navbar;
