//Cambiamos el nombre a URL base, quitando así la referencia a solo 101.

const URL_BASE = "https://japceibal.github.io/emercado-api/cats_products/";
const search = document.getElementById("product-search");
const article_list = document.getElementsByClassName("list-group-item");
const filtrar = document.getElementById("rangeFilterCost");
const precioMin = document.getElementById("rangeFilterCostMin");
const precioMax = document.getElementById("rangeFilterCostMax");
const limpiar = document.getElementById("clearRangeFilter");
const lista = document.getElementById("lista");

let products = [];
showProducts();
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

search.addEventListener("input", function () {
    const searchTerm = search.value.toLowerCase();
    //container hace referencia a los artículos, y list al listado
    for (const article of article_list) {
        const title = article.querySelector('h4').textContent.toLowerCase();
        const description = article.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    }
});

filtrar.addEventListener("click", function () {
    filtrarProductos();
});

limpiar.addEventListener("click", function () {
    precioMin.value = "";
    precioMax.value = "";

    showProducts(products);
});

async function filtrarProductos() {
    let articles = await getProducts();
    htmlContentToAppend = "";
    for (const article of articles) {
        if (article.cost <= precioMax.value && article.cost >= precioMin.value) {
            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + article.image + `" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4>`+ article.name + " - " + article.currency + " <span>" + article.cost + `</span></h4> 
                                    <p> `+ article.description + `</p> 
                                </div>
                                <small class="text-muted">` + article.soldCount + ` vendidos </small> 
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        lista.innerHTML = htmlContentToAppend;
    }
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


async function showProducts(productsArray) {
    try {
        let array = await getProducts();
        let htmlContentToAppend = "";

        // Botones para filtrar por precio (POR DEFECTO, ESTÁ SIN FILTRO)
        const priceAscButton = document.getElementById("sortAsc");
        const priceDescButton = document.getElementById("sortDesc");
        const priceNoneButton = document.getElementById("sortByCount");

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
                <div onclick="setProdID(${category.id})" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>`+ category.name + " - " + category.currency + " <span>" + category.cost + `</span></h4> 
                                <p> `+ category.description + `</p> 
                            </div>
                            <small class="text-muted">` + category.soldCount + ` vendidos</small> 
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



