const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
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
