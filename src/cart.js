// These lines were copied from the main.js

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Adds the number quantity of items in basket, then displays total
// within the cart icon 
let calculation = () =>{
    let cardIcon = document.getElementById("cartAmount");
    // x is prev number y is the next numer, 0 is the default number
    // reduce() is adding
    cardIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x + y, 0);
}

// Everytime the application loads, runs, then shows the total in cart 
calculation()