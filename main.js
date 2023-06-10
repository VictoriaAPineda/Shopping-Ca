// Selects the shop div in the HTML file
let shop = document.getElementById("shop");

// Holds data about each product card
let shopItemsData = [
        {
            id: "oneID",
            name:"Casual Shirt",
            price: 45,
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing" ,
            img: "images/img-1.jpg"
        },
        {   id: "twoID",
            name:"Office Shirt",
            price: 100,
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing" ,
            img: "images/img-2.jpg"
            },
        {
            id: "threeID",
            name:"T-Shirt",
            price: 25,
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing" ,
            img: "images/img-3.jpg"
        },
        {
            id: "fourID",
            name:"Men's Suit",
            price: 300,
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing" ,
            img: "images/img-4.jpg" 
        }
    ];

// Retrieves data stored, or if nothing has been stored, sets up an empty array
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Template
let generateShop = () => {
    /**
     * ! the return will have destination.innferHTML
     * to where the content literal will be sent to
     * in this case the div where the class "shop"
     * is in. 
     * ! `` are Template Strings
     * "x" is used to loop through the array as a object
     * the "id" will be used to keep track of the quantity of a product
     */
    return  (shop.innerHTML  = shopItemsData
        .map((x)=>{
            // destructuring (otherwise you have to write x.name)
            let {id,name,price,desc, img} = x;
            // if something is found store it or return an empty array
            let search = basket.find((x)=> x.id === id) || [];
        return  `
        <div id = product-id-${id} class="item">
            <img width="220" src= ${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="button">
                        <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id =${id} class="quantity">
                            ${search.item === undefined ? 0: search.item}
                        </div>
                        <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div> 
        `
    }).join(""));
    /**
     * ! .joins removes the comma seperating the array item data 
     * ! fixing th visual issue
     */
};
generateShop();


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
    basket = basket.filter((x)=> x.item !== 0)
    localStorage.setItem("data", JSON.stringify(basket))
}

// Displays the item count on the webpage
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}
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