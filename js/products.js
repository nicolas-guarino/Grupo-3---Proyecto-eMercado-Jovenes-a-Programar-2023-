//Cambiamos el nombre a URL base, quitando así la referencia a solo 101.

const URL_BASE = "https://japceibal.github.io/emercado-api/cats_products/";
const search = document.getElementById("product-search");
const article_list = document.getElementsByClassName("list-group-item");

let products = [];

async function getProducts() {
    try {
//Creamos una constante llamada catID, que tome la info desde el localStorage. Y otra constante, que modificara la URL a usar en las funciones, que tomara la categoría a la que el cliente haga click
        const catID = localStorage.getItem('catID')
        const URL = `${URL_BASE}${catID}.json`;

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
     //container hace referencia a los artículos, y list al listado
   for (const article of article_list){
       const title = article.querySelector('h4').textContent.toLowerCase();
        const description = article.querySelector('p').textContent.toLowerCase();
       if (title.includes(searchTerm) || description.includes(searchTerm)) {
          article.style.display = 'block';
        } else {
           article.style.display = 'none';
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
