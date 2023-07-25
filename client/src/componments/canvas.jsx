import { useEffect, useContext, useRef } from "react";
import { useState } from "react";
import { UserContext } from "../usercontext";

export default function Canvas() {
    const [currentPixel, setCurrentPixel] = useState("");
    const [currentColor, setCurrentColor] = useState("red");
    const { userInfo } = useContext(UserContext);
    const [count, setCount] = useState(0);
    const currentColorRef = useRef(currentColor); // Create a ref to hold the latest value

    function Build(xw, yh, handlePutPixel) {
        const canvas = document.getElementById("canvas");

        for (let x = 0; x < xw; x++) {
        const column = document.createElement("div");
        column.className = "flex flex-col"; // Use flex flex-col for column direction
        canvas.appendChild(column);

        for (let y = 0; y < yh; y++) {
            const row = document.createElement("div");
            row.className = `w-2 h-2 bg-white border hover:cursor-pointer border-tranparent`; // Set the class name
            row.id = `${x},${y}`;
            column.appendChild(row);

            row.addEventListener("click", () => {
            setCurrentPixel(row.id);
            const [x, y] = row.id.split(",");
            handlePutPixel(x, y)
            
            ; // Use the handlePutPixel function here
            });
        }
        }
    }

    function BuildNonUser(xw, yh) {
        const canvas = document.getElementById("canvas");

        for (let x = 0; x < xw; x++) {
        const column = document.createElement("div");
        column.className = "flex flex-col"; // Use flex flex-col for column direction
        canvas.appendChild(column);

        for (let y = 0; y < yh; y++) {
            const row = document.createElement("div");
            row.className = `w-2 h-2 bg-white border hover:cursor-pointer border-tranparent`; // Set the class name
            row.id = `${x},${y}`;
            column.appendChild(row);

            row.addEventListener("click", () => {
                alert("login to put pixel")
            ; // Use the handlePutPixel function here
            });
        }
        }
    }

    function PutPixel(x, y, user, color) {
        // Check if userInfo is null and show alert
        console.log(currentColorRef.current); // Use currentColorRef instead of currentColor
        fetch("http://localhost:4000/canvas/putpixel", {
          method: "POST",
          body: JSON.stringify({
            user: user,
            x_coordinate: x,
            y_coordinate: y,
            color: color, // Use the color parameter instead of currentColorRef
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
      }

    async function UpdateBoard() {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        while (true) {
            GetBoardData();
            await delay(1000);
        }
    }

    function GetBoardData() {
        fetch("http://localhost:4000/canvas/getcanvas")
        .then((response) => response.json())
        .then((data) => ConfigBoard(data));
    }

    function ConfigBoard(data) {
        try{
            for (let pix = 0; pix < data.length; pix++) {
            const element = data[pix];
            const pixel = document.getElementById(`${element.x},${element.y}`);
            pixel.classList.add(`bg-${element.color}-600`);
            }
        }catch{}
    }

    useEffect(() => {
        // Update the PutPixel function whenever currentColor changes
        function handlePutPixel(x, y) {
            PutPixel(x, y, userInfo.id, currentColorRef.current);
        }

        if (!userInfo || userInfo.id === undefined) {
            if (count === 0) {
                BuildNonUser(100, 100);
                setCount(1);
                UpdateBoard();
            }
        } else {
            if (count === 0) {
                Build(100, 100, handlePutPixel);
                setCount(1);
                UpdateBoard();
            }
    }

    }, [userInfo, currentColorRef]); // Add userInfo and currentColorRef as dependencies

    useEffect(() => {
        currentColorRef.current = currentColor; // Update the ref whenever currentColor changes
    }, [currentColor]);

    return (
        <div className="wrapper relative">
            <div className="overflow-auto w-max mx-auto flex" id="canvas"></div>
            <div className="absolute right-1/2 translate-x-16">
                <h1 className="font-bold text-lg">Current Color: {currentColor}</h1>
            </div>
            <div className="bg-white">
                <hr className="bg-black h-1" />
                <div className="w-full h-24 text-center items-center justify-center flex flex-wrap gap-6">
                <div
                    className="w-8 h-8 bg-red-600 colorSelection hover:cursor-pointer"
                    onClick={() => setCurrentColor("red")}
                ></div>
                <div
                    className="w-8 h-8 bg-yellow-600 colorSelection hover:cursor-pointer"
                    onClick={() => setCurrentColor("yellow")}
                ></div>
                <div
                    className="w-8 h-8 bg-blue-600 colorSelection hover:cursor-pointer"
                    onClick={() => setCurrentColor("blue")}
                ></div>
                <div
                    className="w-8 h-8 bg-green-600 colorSelection hover:cursor-pointer"
                    onClick={() => setCurrentColor("green")}
                ></div>
                </div>
            </div>
        </div>

    );
    }
