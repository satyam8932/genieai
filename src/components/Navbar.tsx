import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <div className="bg-[rgb(15,23,42)] z-10 flex flex-row justify-evenly items-center p-3">
            <div className="text-2xl font-semibold text-white">GenieAI</div>
            <div className="center">
                {/* <Button>Subscribe</Button> */}
            </div>
            <div className="right">
                <Link href="/signup">
                    <Button className="border border-white hover:bg-white hover:text-black">
                        Signup
                        <LogIn className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
