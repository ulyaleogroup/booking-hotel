
import { Button, buttonVariants } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { cn } from "@/lib/utils";
  
  import { AlignJustify } from "lucide-react";

  import Link from "next/link";


const ActionButtons = () => {
    return ( 
    <div>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <AlignJustify />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            <div className="flex flex-col space-y-4 items-start w-full text-lg text-black mt-10">
                                <Link
                                href="/"
                                >
                                    Sign in 
                                </Link>
                                <Link
                                href="/"
                                >
                                   Get Started
                                </Link>
                                <Link
                                href="/"
                                >
                                    Pricing
                                </Link>
                                <Link
                                href="/"
                                >
                                    Contact
                                </Link>
                                <Link
                                href="/"
                                >
                                   About
                                </Link>
                           
                       
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            </div>


            <div className="hidden md:flex md:space-x-4">
                <Button
                className="text-md"
                variant="ghost"
                >
                    Sign in
                </Button>
                <Link
                href="/form-booking"
                className={cn(buttonVariants(), "text-md bg-blue-500")}>
                    Get Started
                </Link>

            </div>
 

    </div> 
    );
}
 
export default ActionButtons;