import Canvas from "../componments/canvas"
import Header from "../componments/header"
import { UserContext } from "../usercontext";
import React, { useContext } from "react";

export default function IndexPage(){

  const { userInfo } = useContext(UserContext);

    return(
        <main className='bg-slate-300 max-h-screen overflow-hidden'>
          <Header />
          <hr className="bg-black h-1" />
          <div className="">
            <Canvas isLoading={!userInfo} />
          </div>  
        </main>
    )
}