import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropDown from "./UserDropDown";
import { User } from "better-auth";

const NavBar = ({ user }: { user: User }) => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/dashboard">
          <Image
            src="/icons/logo.png"
            alt="Stock App Logo"
            width={40}
            height={40}
            className="logo"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        <UserDropDown user={user} />
      </div>
    </header>
  );
};

export default NavBar;
