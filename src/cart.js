let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

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


// Load up products in cart 
let generateCardItems = () => {
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                // destructure the x, which is from basket
                let {id,item} = x;
                // y is comming for the Data.js
                // want to match id in basket to its corresponding one in Data.js
                let search = shopItemsData.find((y) => y.id === id) || [];
            return `
                <div class="cart-item">
                    <img width="100" src = ${search.img} alt=""/>

                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p class="cart-item-price">$ ${search.price}</p>
                            </h4>
                            <i class="bi bi-x-lg"></i>
                        </div>

                        <div class="button">
                            <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id =${id} class="quantity"> ${item}</div>
                            <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                         </div>

                        <h3></h3>
                    </div>
                </div>
            `
        }).join(""));
    }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to Home</button>
            </a>
        `
    }
}
generateCardItems();



let increment = (id) => {
    // id is used to track which card is being inc/dec/updated
    let selectedItem = id;
    // checks to see if the item's id is already in the cart/basket (T/F)
    let search = basket.find( (x) => x.id === selectedItem.id);

    if(search === undefined){
        // adds a new product obj
        basket.push({ id: selectedItem.id, item: 1});
    }else{
        // adds to the item's quantity
        search.item += 1;
    }
    update(selectedItem.id);
     // "data" is a key name , basket is the object getting stored
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find( (x) => x.id === selectedItem.id);

    if(search === undefined){
        return // does nothing
    }
    else if(search.item === 0){
        return
    }else{
        search.item -= 1;
    }
    update(selectedItem.id);
    // basket will only hold products that have a item count above 1
    basket = basket.filter((x)=> x.item !== 0);
    generateCardItems(); // rerenders
    localStorage.setItem("data", JSON.stringify(basket))
}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}