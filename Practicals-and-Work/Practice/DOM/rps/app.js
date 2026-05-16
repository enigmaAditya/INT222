let userScore= 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");

const genCompChoice = () =>{
    let options = ["rock", "paper", "scissors"]
    const randidx = Math.floor(Math.random() * 3)
    return options[randidx]
}

const playgame = (userChoice) => {
    console.log("userChoice = ", userChoice)
    // Generate Computer Choice
    const compchoice = genCompChoice();
    console.log("comp choice: ", compchoice)

}
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice =  choice.getAttribute("id");
        // console.log("choice was clicked",userChoice)
        playgame(userChoice)
    })
})