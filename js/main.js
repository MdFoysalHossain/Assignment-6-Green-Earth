
let currentCurtAmount = 0;











function loadCat(){
    const catUtl = "https://openapi.programming-hero.com/api/categories";
    let buttonContainer = document.getElementById("categories-btn");

    fetch(catUtl)
        .then(response => response.json())
        .then(output => {
            buttonContainer.innerHTML = `
                <button id="cat-button-0" onclick="loadItems('all')" class="active font-light text-[#1F2937] hover:cursor-pointer w-[150px] 2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-[200px] text-left p-1.5 rounded-md hover:bg-[#15803D] hover:text-white active:bg-[#15803D]">All Trees</button>
            `;

            for(let i = 0; i < output.categories.length; i++){
                buttonContainer.innerHTML += `
                    <button id="cat-button-${output.categories[i].id}" onclick="chosenCat('${output.categories[i].category_name}')" class="font-light text-[#1F2937] hover:cursor-pointer w-[150px] 2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-[200px]  text-left p-1.5 rounded-md hover:bg-[#15803D] hover:text-white active:bg-[#15803D]">${output.categories[i].category_name}</button>
                `;

            }
        })
}


function chosenCat(cat){
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let itemsContainer = document.getElementById("items-container");

    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {
            itemsContainer.innerHTML = "";

            for(let i = 0; i < output.plants.length; i++){

                if(output.plants[i].category === cat){
                    itemsContainer.innerHTML += `
                        <div class="card bg-base-100 w-[335px]  pt-4 shadow-sm
                        2xl:w-96
                        xl:w-96
                        lg:w-96
                        md:w-96">
                            <figure class="p-4 mb-2 max-h-[200px]">
                                <img class="rounded-lg overflow-hidden"
                                src="${output.plants[i].image}"
                                alt="${output.plants[i].name} Image" />
                            </figure>
                            <div class="px-5">
                                <h2 onclick="loadModal(${output.plants[i].id})" class="card-title text-lg">${output.plants[i].name}</h2>
                                <span class="text-sm">${output.plants[i].description}</span>
                                <div class="flex flex-row justify-between items-center w-full mt-4">
                                    <span class="bg-[#DCFCE7] text-[#15803D] inline-block px-3 py-1 rounded-2xl">${output.plants[i].category}</span>
                                    <p class="text-right">৳${output.plants[i].price}</p>
                                </div>
                                <button onclick="addToCart(${output.plants[i].id})" class="btn bg-[#15803D] rounded-3xl text-white my-3 w-full text-center py-5">Add to Cart</button>
                            </div>
                        </div>
                    `;
                }
            }
        })

        
        removeActive();
        makeBtnActive(cat);

}

function makeBtnActive(buttonName){
    const catUtl = "https://openapi.programming-hero.com/api/categories";

    console.log(buttonName);
    if(buttonName === "all"){
        let activeTheBtn = document.getElementById('cat-button-0')
        activeTheBtn.classList.add("active");
    }else{

        fetch(catUtl)
            .then(response => response.json())
            .then(output => {
                for(let i = 0; i < output.categories.length; i++)
                    if(output.categories[i].category_name === buttonName){
                        let catButton = document.getElementById(`cat-button-${i+1}`);
                        catButton.classList.add("active");

                    } else{
                        console.log("Others");
                    }
               
            })
    }
}


function loadItems(buttonName){
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let itemsContainer = document.getElementById("items-container");

    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {
            itemsContainer.innerHTML = "";

            for(let i = 0; i < output.plants.length; i++){
                itemsContainer.innerHTML += `
                    <div class="card bg-base-100 w-[335px]  pt-4 shadow-sm
                        2xl:w-96
                        xl:w-96
                        lg:w-96
                        md:w-96
                    ">
                        <figure class="p-4 mb-2 max-h-[200px]">
                            <img class="rounded-lg overflow-hidden"
                            src="${output.plants[i].image}"
                            alt="${output.plants[i].name} Image" />
                        </figure>
                        <div class="px-5">
                            <h2 onclick="loadModal(${output.plants[i].id})" class="card-title text-lg">${output.plants[i].name}</h2>
                            <span class="text-sm">${output.plants[i].description}</span>
                            <div class="flex flex-row justify-between items-center w-full mt-4">
                                <span class="bg-[#DCFCE7] text-[#15803D] inline-block px-3 py-1 rounded-2xl">${output.plants[i].category}</span>
                                <p class="text-right">৳${output.plants[i].price}</p>
                            </div>
                            <button onclick="addToCart(${output.plants[i].id})" class="btn bg-[#15803D] rounded-3xl text-white my-3 w-full text-center py-5">Add to Cart</button>
                        </div>
                    </div>
                `;
            }
        })
    
    removeActive();
    makeBtnActive(buttonName);

}


function addToCart(cartId){
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let cartContainer = document.getElementById("cart-details");
    let totalCart = document.getElementById("total-cart-amount");
    console.log("Cart Id:", cartId);
    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {
            for(let i = 0; i < output.plants.length; i++){
                if(output.plants[i].id === cartId){
                    cartContainer.innerHTML += `
                        <div id="item-${cartId}" class="single-cart w-full flex flex-row justify-between rounded-lg items-center bg-[#F0FDF4] px-5 py-3">
                            <div class="left flex-1">
                                <h3 class="font-semibold ">${output.plants[i].name}</h3>
                                <p class="text-[#1f29378a]">৳${output.plants[i].price} <i class="fa-solid fa-xmark text-sm"></i> 1 </p>
                            </div>
                            <div class="right text-right text-[#1f29378a]">
                                <button onclick="removeItem(${cartId})" class="hover:cursor-pointer"><i class="fa-solid fa-xmark text-sm"></i></button>
                            </div>
                        </div>
                    `;

                    currentCurtAmount += output.plants[i].price;

                    totalCart.innerText = `৳${currentCurtAmount}`;

                }

            }
        })
}


function removeItem(cartId){
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let cartContainer = document.getElementById("cart-details");
    let totalCart = document.getElementById("total-cart-amount");

    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {
            let deleteItem = document.getElementById(`item-${cartId}`)
            deleteItem.remove();
            for(let i = 0; i < output.plants.length; i++){
                if(output.plants[i].id === cartId){
                    currentCurtAmount -= output.plants[i].price;
                    totalCart.innerText = `৳${currentCurtAmount}`;
                }

            }
        })
}


function removeActive(){
    for (let i = 0; i <= 11; i++) {
            let catButton = document.getElementById(`cat-button-${i}`);
            if (catButton) {  
                catButton.classList.remove("active");
            }
        }
}

function loadModal(id){
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let modalContainer = document.getElementById("my_modal_5");

    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {;
            modalContainer.innerHTML = "";

            for(let i = 0; i < output.plants.length; i++){
                if(output.plants[i].id === id){
                    modalContainer.innerHTML += `
                    <div class="modal-box">
                        <figure class="p-4 mb-2 max-h-[400px] flex justify-center items-center overflow-hidden">
                            <img class="" src="${output.plants[i].image}" alt="${output.plants[i].name}" />
                        </figure>
                        <h3 id="modal-head" class="font-bold text-2xl">${output.plants[i].name}</h3>
                        <p id="modal-cat">Catagory: ${output.plants[i].category}</p>
                        <p id="modal-price">Price: ${output.plants[i].price}</p>
                        <p id="modal-des" class="py-4">${output.plants[i].description}</p>
                        <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn">Close</button>
                            </form>
                        </div>
                    </div>
                `;
                }
                


            }
        })

        my_modal_5.showModal();

}

loadItems();
loadCat();
