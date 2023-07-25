import { useEffect } from "react"
import { useState } from "react";

export default function Canvas(){

    const [current,setCurrent] = useState("")

    useEffect(() => {
        Build(100, 100);
      }, []);
    
    function Build(xw, yh) {
        const canvas = document.getElementById("canvas");
    
        for (let x = 0; x < xw; x++) {
        const column = document.createElement("div");
        column.className = "flex flex-col"; // Use flex flex-col for column direction
        canvas.appendChild(column);
            for (let y = 0; y < yh; y++) {
                const row = document.createElement("div");
                row.className = `w-2 h-2 bg-white border hover:cursor-pointer border-tranparent`; // Set the class name
                row.id = `x=${x},y=${y}`
                column.appendChild(row);
        
                row.addEventListener("click", () => {
                    setCurrent(row.id);
                });
            }
        }
    }

    useEffect(() => {
        console.log("Current state has been updated:", current);
    }, [current]);

    return(
        <div className=" overflow-auto flex" id="canvas"></div>
    )
}