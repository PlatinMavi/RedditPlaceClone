import { useEffect,useContext } from "react"
import { useState } from "react";
import { UserContext } from "../usercontext";

export default function Canvas(){

    const [current,setCurrent] = useState("")
    const { userInfo } = useContext(UserContext)
    const [count, setCount]= useState(0)
    
    function Build(xw, yh) {
        const canvas = document.getElementById("canvas");
    
        for (let x = 0; x < xw; x++) {
        const column = document.createElement("div");
        column.className = "flex flex-col"; // Use flex flex-col for column direction
        canvas.appendChild(column);
            for (let y = 0; y < yh; y++) {
                const row = document.createElement("div");
                row.className = `w-2 h-2 bg-white border hover:cursor-pointer border-tranparent`; // Set the class name
                row.id = `${x},${y}`
                column.appendChild(row);
        
                row.addEventListener("click", () => {
                    setCurrent(row.id);
                    const [x, y] = row.id.split(",");
                    PutPixel(x, y,userInfo.id);
                });
            }
        }
    }

    function PutPixel(x,y,user){
        console.log(user)
        fetch('http://localhost:4000/canvas/putpixel', {
        method: 'POST',
        body: JSON.stringify({
            user:user,
            x_coordinate:x,
            y_coordinate:y,
            color:"red"}),
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
        }).then(response =>response.json()).then(json => console.log(json))
    }

    function reload(){
        const parentElement = document.getElementById("parentElementId");
        parentElement.innerHTML = '';
    }

    useEffect(() => {
        console.log("Current state has been updated:", current);
        console.log("userInfo:", userInfo); // Access userInfo in the useEffect hook
        if (count===0){Build(100,100);setCount(1)}
        
    }, [current, userInfo ]); // Add userInfo as a dependency

    return(
        <div className=" overflow-auto flex" id="canvas">
            
        </div>
    )
}