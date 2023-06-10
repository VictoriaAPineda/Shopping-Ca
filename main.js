let shop = document.getElementById("shop");

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

// will retrieve data stores, or if none stored, sets an empty array
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

// id is used to specfiy which card is being inc/dec/updated
let increment = (id) => {
    let selectedItem = id;
    // checks to see if the item is already in the cart/basket
    let search = basket.find( (x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({ id: selectedItem.id, item: 1});
    }else{
        search.item += 1;
    }

   // console.log(basket)
   //  "data" is a key name , basket is the object getting stored
  
    update(selectedItem.id);
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
    // basket will only hold products that have above 1 item counts
    basket = basket.filter((x)=> x.item !== 0)
    //console.log(basket)
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;

    //console.log(search.item)
    calculation();

}
// this will add the number of items in basket, then display it
// within the cart icon 
let calculation = () =>{
    let cardIcon = document.getElementById("cartAmount");
    // x is prev # y is the next #
    // 0 is the default number / it's starts at 0
    // reduce is adding
    cardIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x + y, 0);

}
// everytime the application loads, runs, then shows the total in cart 
calculation()