//Cambiamos el nombre a URL base, quitando así la referencia a solo 101.

const URL_BASE = "https://japceibal.github.io/emercado-api/cats_products/";
const search = document.getElementById("product-search");
const article_list = document.getElementsByClassName("list-group-item");
const filter = document.getElementById("rangeFilterCost");
const minPrice = document.getElementById("rangeFilterCostMin");
const maxPrice = document.getElementById("rangeFilterCostMax");
const clear = document.getElementById("clearRangeFilter");
const list = document.getElementById("list");
let catName = "";

let products = [];
showProducts();
async function getProducts() {
    try {
        //Creamos una constante llamada catID, que tome la info desde el localStorage. Y otra constante, que modificara la URL a usar en las funciones, que tomara la categoría a la que el cliente haga click
        const catID = localStorage.getItem('catID')
        const URL = `${URL_BASE}${catID}.json`;

        let response = await fetch(URL);
        let info = await response.json();
        catName = info.catName;
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

filter.addEventListener("click", function () {
    filterProductos();
});

clear.addEventListener("click", function () {
    minPrice.value = "";
    maxPrice.value = "";

    showProducts(products);
});

function generateHTML(id, image, name, currency, cost, desc, soldCount){
    return `
    <div onclick="setProdID(${id})" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4>`+ name + " - " + currency + " <span>" + cost + `</span></h4> 
                        <p> `+ desc + `</p> 
                    </div>
                    <small class="text-muted">` + soldCount + ` vendidos </small> 
                </div>
            </div>
        </div>
    </div>`;
}

async function filterProductos() {
    let articles = await getProducts();
    htmlContentToAppend = "";
    for (const article of articles) {
        if (article.cost <= maxPrice.value && article.cost >= minPrice.value) {
            htmlContentToAppend += generateHTML(article.id, article.image, article.name, article.currency, article.cost, article.description, article.soldCount);
        }
        list.innerHTML = htmlContentToAppend;
    }
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


async function showProducts() {
    try {
        let array = await getProducts();
        let htmlContentToAppend = "";


        // Botones para filtrar por precio (POR DEFECTO, ESTÁ SIN FILTRO)
        const priceAscButton = document.getElementById("sortAsc");
        const priceDescButton = document.getElementById("sortDesc");
        const soldDescButton = document.getElementById("sortByCount");

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

        soldDescButton.addEventListener("click", function () {
            // Sin filtro, se usa el array original
            filteredArray = array.slice().sort((a, b) => b.soldCount - a.soldCount);
            renderProducts(filteredArray);
        });

        // Función para renderizar los productos en el HTML
        function renderProducts(products) {
            htmlContentToAppend = "";

            document.getElementById("cat-name").innerHTML = catName;

            for (let i = 0; i < products.length; i++) {
                let category = products[i];
                htmlContentToAppend += generateHTML(category.id, category.image, category.name, category.currency, category.cost, category.description, category.soldCount);
            }
            list.innerHTML = htmlContentToAppend;
        }

        // Muestra productos con el nuevo array filtrado
        renderProducts(array);

    } catch (error) {
        console.error("Error al mostrar los productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = localStorage.getItem("loggedUser");
    const displayUser = document.getElementById("userDisplayed");

    if (loggedUser) {
        userDisplayed.innerHTML = `Hola: ${loggedUser}`;
    } else {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'login.html';
    }
});

showProducts();



