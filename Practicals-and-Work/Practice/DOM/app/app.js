let btn1 = document.querySelector("#btn1")
// btn1.onclick = () =>{
//     console.log("btn1 was click")
// }
let div1 = document.querySelector(".box")
// div1.onmouseover = ()=> {
//     console.log("You are inside the div")
// }

// let i = 1
// btn1.ondblclick = () => {
//     let newDiv = document.createElement("div")
//     newDiv.setAttribute("class", ".box1")
//     newDiv.innerText = `Div${i}`
//     newDiv.style.backgroundColor = "yellow"
//     newDiv.style.height = "150px"
//     newDiv.style.width="150px"
//     newDiv.style.margin="10px"
//     i++

//     document.querySelector("body").appendChild(newDiv)
// }


// btn1.addEventListener("click", ()=>{
//     console.log("btn1 was clicked")
// })
// const dbclicker = ()=>{
//     console.log("btn1 was clicked 2x")
// }
// btn1.addEventListener("dblclick", dbclicker)

// btn1.removeEventListener("dblclick", dbclicker)


let flag = "w"
btn1.addEventListener("click", ()=>{
    if(flag === "w"){
        document.querySelector("body").style.backgroundColor = "black"
        document.querySelector("body").style.color = "white"
        
        flag = "b"
    }
    else{
        document.querySelector("body").style.backgroundColor = "white"
        document.querySelector("body").style.color = "black"
        flag = "w"
    }
})
// can aslo be done using classList.add and classList.remove