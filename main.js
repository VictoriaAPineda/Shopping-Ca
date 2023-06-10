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
                        <i class="bi bi-dash-lg"></i>
                        <div id =${id} class="quantity">0</div>
                        <i class="bi bi-plus-lg"></i>
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