const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const search = document.getElementById("product-search");
const article_list = document.getElementById("lista").getElementsByClassName("container");
const article = document.getElementsByClassName("list-group-item");
let products = [];

async function getProducts() {
    try {
        let response = await fetch(URL);
        let info = await response.json();
        let array = info.products;

        return array;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return [];
    }
}

search.addEventListener("input", function(){
    const searchTerm = search.value.toLowerCase();
    // container hace referencia a los artículos, y list al listado
    for (const container of article_list){
        const title = container.querySelector('h4').textContent.toLowerCase();
        const description = container.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            container.style.display = 'block';
          } else {
            container.style.display = 'none';
          }
    }
});



async function showProducts(array) {
    try {
        let array = await getProducts();
        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) {
            let category = array[i];
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>`+ category.name +`</h4> 
                                <p> `+ category.description +`</p> 
                            </div>
                            <small class="text-muted">` + category.soldCount + ` artículos</small> 
                        </div>
                    </div>
                </div>
            </div>`;
        }
        
        document.getElementById("lista").innerHTML = htmlContentToAppend;
    } catch (error) {
        console.error("Error al mostrar los productos:", error);
    }
}


showProducts();
