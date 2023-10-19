import { options } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Nav = async () => {
  const session = await getServerSession(options);
  console.log("session", session);
  return (
    <div className="w-full h-[70px] flex items-center justify-between px-12">
      <div className="logo">Auth</div>
      <div>
        {session ? (
          <Link href={"/api/auth/signout?callbackUrl=/"}>Logout</Link>
        ) : (
          <Link href={"/api/auth/signin"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
