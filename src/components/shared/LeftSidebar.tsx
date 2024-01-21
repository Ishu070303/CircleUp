import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  
  const { pathname } = useLocation();
  const naviagate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if(isSuccess) naviagate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-8">
        <Link to={"/"} className="flex gap-3 items-center">
          <img 
            src="/assets/images/circleup.png"
            alt="logo"
            width={190}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img 
            src={user.imageUrl || "assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
          {/* flex col for one another up down */}
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </Link>

        {/* Buttons */}
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li 
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink 
                  to={link.route}
                  className="flex gap-4 items-center p-2"
                >
                  <img 
                    src={link.imgURL}
                    alt={link.label}
                    className=
                    {`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}                  
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      {/* logout button */}
      <Button
        variant="ghost"
        className="shad-button_ghost p-2"
        onClick={() => signOut()}
      >
        <img src="assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium ">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar;