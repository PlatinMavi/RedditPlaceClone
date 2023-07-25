import Canvas from "../componments/canvas"
import Header from "../componments/header"


export default function IndexPage(){

    return(
        <main className='bg-slate-300 max-h-screen overflow-hidden'>
          <Header />
          <hr className="bg-black h-1" />
          <div className="">
            <Canvas/>
          </div>  
        </main>
    )
}