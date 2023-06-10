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


let basket = [];


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
                        <div id =${id} class="quantity">0</div>
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

    console.log(basket)
}

let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find( (x) => x.id === selectedItem.id);

    if(search.item === 0){
        return
    }else{
        search.item -= 1;
    }

    console.log(basket)
}

let update = () => {}
