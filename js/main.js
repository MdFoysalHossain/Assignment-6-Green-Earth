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
                    <button class="font-light text-[#1F2937] hover:cursor-pointer w-[200px] text-left p-1.5 rounded-md hover:bg-[#15803D] hover:text-white">${output.categories[i].category_name}</button>
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
                            alt="Shoes" />
                        </figure>
                        <div class="px-5">
                            <h2 class="card-title text-lg">${output.plants[i].name}</h2>
                            <span class="text-sm">${output.plants[i].description}</span>
                            <div class="flex flex-row justify-between items-center w-full mt-4">
                                <span class="bg-[#DCFCE7] text-[#15803D] inline-block px-3 py-1 rounded-2xl">${output.plants[i].category}</span>
                                <p class="text-right">৳500</p>
                            </div>
                            <button class="btn bg-[#15803D] rounded-3xl text-white my-3 w-full text-center py-5">Add to Cart</button>
                        </div>
                    </div>
                    
                `;


            }
        })

}

loadItems();
loadCat();