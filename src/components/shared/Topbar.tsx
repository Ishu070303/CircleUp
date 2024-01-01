import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";


const Topbar = () => {

  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  
  useEffect(() => {
    if(isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
        <div className="flex-between py-3 px-1">
            <Link to={"/"} className="flex gap-3 items-center">
                <img 
                  src="/assets/images/logomobile.png"
                  alt="logo"
                  width={150}
                  height={325}
                />
            </Link>

            <div className="flex gap-4">
                <Button variant="ghost" className="shadcn-button_ghost" onClick={ () => signOut()}>
                    <img 
                       className="cursor-pointer"
                       src="/assets/icons/logout.svg"
                     />
                </Button>
            </div>
        </div>
    </section>
  )
}

export default Topbar;