// let div =  document.querySelector("div");
// console.log(div);
// let id = div.getAttribute("id");
// console.log(id);
// let para = document.querySelector("p");
// console.log(para.setAttribute("class", "newClass"))


// accessing and changing the style of any element:
// let div = document.querySelector('div')
// console.log(div.style)
// div.style.backgroundColor = "yellow"
// div.innerText = "Hello!"
// div.style.visibility = "hidden"

// adding a new element :
// its a two step process, i> first we have to create the element which we want to add
// ii> second then we will append it 

// let newBtn = document.createElement("button")
// newBtn.innerText="Click me"
// console.log(newBtn)

// let div = document.querySelector("div")
// div.append(newBtn)
// div.prepend(newBtn)
// div.before(newBtn)
// div.after(newBtn)

// let newHeading = document.createElement("h1")
// newHeading.innerHTML= "<i>Hi, I am new</i>"
// document.querySelector("body").prepend(newHeading)

// removing any element:
// let paragraph = document.querySelector(".para")
// paragraph.remove()

// appendChild() and removeChild()

// Qn1)


// Events


let btn1 = document.querySelector("#btn")
// link this button to wikipedia website
// if user click on the button then it will redirect to the wikipedia website
btn1.addEventListener("click",() =>{
    window.location.href = "https://www.wikipedia.org"
})

    


