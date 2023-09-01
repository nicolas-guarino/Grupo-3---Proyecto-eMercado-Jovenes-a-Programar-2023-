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
//Se agrega un escuchador de eventos al elemento "searchInput" El evento "input"  se activa cuadno el contenido del campo de búsqueda cambia.
search.addEventListener("input", function(){
    //Se obtiene el valor actual del campo de búsqueda ("searchInput") y lo estamos pasando a minúsculas con "toLowerCase()" para asegurarnos que la comparación no sea sensible a mayúsculas y minúsculas.
   const searchTerm = search.value.toLowerCase();
   // Iniciamos un bucle "for...of" que va a recorrer cada elemento de "articleList". article hace referencia a los artículos, y article_list al listado.
   for (const article of article_list){
       //Dentro del bucle, estamos buscando dentro del elemento actual de la iteración (article) un elemento <h4> y un elemento <p>. Luego, estamos obteniendo el texto contenido en estos elementos usando .textContent y lo convierto a minúsculas con .toLowerCase().Y así nos dará el título y la descripción del artículo actual en minúsculas.
       const title = article.querySelector('h4').textContent.toLowerCase();
        const description = article.querySelector('p').textContent.toLowerCase();
       //Usamos un declaración if para verificar si el término de búsqueda (searchTerm) aparece en el título o la descripción del artículo actual. Si es así, establecemos el estilo display del artículo en "block", lo que significa que se mostrará en la página. Si no se encuentra el término de búsqueda en el título ni en la descripción, establecemos el estilo display en "none", ocultando así el artículo.
       if (title.includes(searchTerm) || description.includes(searchTerm)) {
          article.style.display = 'block';
        } else {
           article.style.display = 'none';
         }
   }
});
 


async function showProducts(productsArray) {
    try {
        let array = await getProducts();
        let htmlContentToAppend = "";

        // Botones para filtrar por precio (POR DEFECTO, ESTÁ SIN FILTRO)
         const priceAscButton = document.getElementById("asc");
         const priceDescButton = document.getElementById("desc");
         const priceNoneButton = document.getElementById("none");

         let filteredArray = array.slice(); // Array inicial sin filtrar
 
         priceAscButton.addEventListener("click", function () {
             // Ordena el array por precio de forma ascendente
             filteredArray = array.slice().sort((a, b) => a.cost - b.cost);
             renderProducts(filteredArray);
         });

         priceDescButton.addEventListener("click", function () {
             // Ordena el array por precio de forma descendente
             filteredArray = array.slice().sort((a, b) => b.cost - a.cost);
             renderProducts(filteredArray);
         });

         priceNoneButton.addEventListener("click", function () {
             // Sin filtro, se usa el array original
             filteredArray = array.slice();
             renderProducts(filteredArray);
         });

 
         // Función para renderizar los productos en el HTML
         function renderProducts(products) {
             htmlContentToAppend = "";


        for (let i = 0; i < products.length; i++) {
            let category = products[i];
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
    }

    // Muestra productos con el nuevo array filtrado
    renderProducts(array);
    
    } catch (error) {
        console.error("Error al mostrar los productos:", error);
    }
}


showProducts();
