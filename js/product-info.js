const URL_BASE = "https://japceibal.github.io/emercado-api/products/"

async function getProductDetails(prodID) {
    try {
        const URL = `${URL_BASE}${prodID}.json`;
        let response = await fetch(URL);
        let product = await response.json();


        let productHTML = `
            <h2>${product.name}</h2>
            <p class="pProducts">Descripción: ${product.description}</p>
            <p class="pProducts">Precio: ${product.currency} ${product.cost}</p>
            <p class="pProducts">Vendidos: ${product.soldCount}</p>
            <div class="imgsProductFlex">
            <p><img class="imgsProduct" src="${product.images[1]}"</p>
            <p><img class="imgsProduct" src="${product.images[0]}"</p>
            <p><img class="imgsProduct" src="${product.images[2]}"</p>
            <p><img class="imgsProduct" src="${product.images[3]}"</p>
            <div>
        `;

        document.getElementById("contenedor-info").innerHTML = productHTML;
    } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);

        document.getElementById("contenedor-info").innerHTML = "<p>Error al obtener los detalles del producto.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const prodID = localStorage.getItem("prodID");


    if (prodID !== null) {
        getProductDetails(prodID);
    } else {
        document.getElementById("contenedor-info").innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
    }
});

