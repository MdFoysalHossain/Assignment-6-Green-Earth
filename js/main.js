function loadCat(){
    const catUtl = "https://openapi.programming-hero.com/api/categories";
    let buttonContainer = document.getElementById("categories-btn");

    fetch(catUtl)
        .then(response => response.json())
        .then(output => {
            console.log(output.categories);
            buttonContainer.innerHTML = "";

            for(let i = 0; i < output.categories.length; i++){
                console.log(output.categories[i].category_name)
                buttonContainer.innerHTML += `
                    <button onclick="chosenCat('${output.categories[i].category_name}')" class="font-light text-[#1F2937] hover:cursor-pointer w-[200px] text-left p-1.5 rounded-md hover:bg-[#15803D] hover:text-white active:bg-[#15803D]">${output.categories[i].category_name}</button>
                `;

            }
        })
}


function chosenCat(cat){
    console.log(cat)
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let itemsContainer = document.getElementById("items-container");

    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {
            console.log(output.plants);
            itemsContainer.innerHTML = "";

            for(let i = 0; i < output.plants.length; i++){
                // console.log(output.plants[i].name)

                if(output.plants[i].category === cat)
                itemsContainer.innerHTML += `
                    <div class="card bg-base-100 w-96  pt-4 shadow-sm">
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
                            <button class="btn bg-[#15803D] rounded-3xl text-white my-3 w-full text-center py-5">Add to Cart</button>
                        </div>
                    </div>
                `;


            }
        })
}


function loadItems(){
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let itemsContainer = document.getElementById("items-container");

    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {
            console.log(output.plants);
            itemsContainer.innerHTML = "";

            for(let i = 0; i < output.plants.length; i++){
                console.log(output.plants[i].name)
                itemsContainer.innerHTML += `
                    <div class="card bg-base-100 w-96  pt-4 shadow-sm">
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
                            <button class="btn bg-[#15803D] rounded-3xl text-white my-3 w-full text-center py-5">Add to Cart</button>
                        </div>
                    </div>
                `;


            }
        })

}

function loadModal(id){
    const itemsUrl = "https://openapi.programming-hero.com/api/plants";
    let modalContainer = document.getElementById("my_modal_5");

    fetch(itemsUrl)
        .then(response => response.json())
        .then(output => {
            // console.log(output.plants);
            modalContainer.innerHTML = "";

            for(let i = 0; i < output.plants.length; i++){
                // console.log(output.plants[i].name)
                if(output.plants[i].id === id){
                    // console.log(output.plants[i].id)
                    // console.log(output.plants[i].name)
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
