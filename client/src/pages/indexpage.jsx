import Canvas from "../componments/canvas"
import Header from "../componments/header"


export default function IndexPage(){

    return(
        <main className='bg-slate-300 min-h-screen '>
          <Header />
          <hr className="bg-black h-1" />
          <div className="w-max my-12 mx-auto m-4">
            <Canvas/>
          </div>  
        </main>
    )
}