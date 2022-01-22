import Link from "next/link"
function Header() {
    return (
        <header className="flex justify-between p-5 max-w-6xl mx-auto">

            <div className="flex items-cemter space-x-5">
                <Link href="/">
                    <img src="/assets/Images/MediumLogo.png" alt="" className="object-contain w-44 cursor-pointer" />
                </Link>
                <div className="hidden md:inline-flex items-center space-x-5">
                    <h3 className="cursor-pointer">About</h3>
                    <h3 className="cursor-pointer">Contact</h3>
                    <h3 className="text-white bg-green-600 px-4 py-2 rounded-full cursor-pointer">Follow</h3>
                </div>
            </div>
            <div className="flex items-center space-x-5 ">
                <h3 className="hidden lg:inline-flex  cursor-pointer">Out Story</h3>
                <h3 className="hidden lg:inline-flex  cursor-pointer">Membership</h3>
                <h3 className="hidden lg:inline-flex  cursor-pointer">Write</h3>
                <h3 className="text-green-600 cursor-pointer">Sign In</h3>
                <h3 className=" text-green-600 border px-4 py-1 rounded-full border-green-600 cursor-pointer ">Get Started</h3>
            </div>
        </header>
    )
}

export default Header
