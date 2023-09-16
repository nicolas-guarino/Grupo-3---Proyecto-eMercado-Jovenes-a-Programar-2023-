const URL_BASE = "https://japceibal.github.io/emercado-api/products/"
const URL_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/";

const user = localStorage.getItem('usuarioLogueado')
async function getProductDetails(prodID) {
    try {
        const URL = `${URL_BASE}${prodID}.json`;
        let response = await fetch(URL);
        let product = await response.json();


        let productHTML = `
            <h1 class="pTitle">${product.name}</h1>
            <p class="pProducts"><span>Precio:</span> ${product.currency} ${product.cost}</p>
            <p class="pProducts"><span>Descripción:</span> ${product.description}</p>
            <p class="pProducts"><span>Categoria:</span> ${product.category}</p>
            <p class="pProducts"><span>Vendidos:</span> ${product.soldCount}</p>
            <div class="imgsProductFlex">
            <p><img class="imgsProduct" src="${product.images[1]}"></p>
            <p><img class="imgsProduct" src="${product.images[0]}"></p>
            <p><img class="imgsProduct" src="${product.images[2]}"></p>
            <p><img class="imgsProduct" src="${product.images[3]}"></p>
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



const newComment = document.getElementById("new-comment");
const ratesSelect = document.getElementById("rates");
const submitBtn = document.getElementById("comment-submit");
const prodNewComment = document.getElementById("prod-newComment");

function createStarRating(rating) {
    const maxRating = 5;
    let starHTML = "";
    for (let i = 1; i <= maxRating; i++) {
        if (i <= rating) {
            starHTML += '<span class="fa fa-star checked"></span>';
        } else {
            starHTML += '<span class="fa fa-star"></span>';
        }
    }
    return starHTML;
}

submitBtn.addEventListener("click", function () {

    const comment = newComment.value;
    const rating = parseInt(ratesSelect.value);

    const date = new Date(); // Obtenemos la Fecha Actual creando un nuevo objeto Date
    const year = date.getFullYear(); // Obtenemos el Año
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtenemos el mes y usamos .padStart(2, '0') para que el minimo de la cadena sea 2 digitos en caso de tener un solo digito se añade un 0 adelante.
    const day = String(date.getDate()).padStart(2, '0'); // Obtenemos el dia
    const hours = String(date.getHours()).padStart(2, '0'); // Obtenemos la hora
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Obtenemos los minutos
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Obtenemos los segundos

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Creamos el string de la fecha formateada


    const commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = `
    <div class="commentsContainer">
        <p class="pComment"> ${user} - ${formattedDate} - ${createStarRating(rating)} </p>
        <p class="pComment"> ${comment}</p>
    </div>    
    `;

    prodNewComment.appendChild(commentElement);

    newComment.value = "";
    ratesSelect.selectedIndex = 0;
});


async function getProductComments(prodID) {
    try {
        const URL_COMMENT = `${URL_COMMENTS}${prodID}.json`;
        let response = await fetch(URL_COMMENT);
        let comments = await response.json();

        let productscommentsHTML = "";

        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            let starRating = createStarRating(comment.score);
            productscommentsHTML += `
            <div class="commentsContainer">
                <p class="pComment">${comment.user} - ${comment.dateTime} - ${starRating}</p>
                <p class="pComment">${comment.description}</p>
                </div>
            `;
        }
        

        document.getElementById("container-comments").innerHTML = productscommentsHTML;
    } catch (error) {
        console.error("Error al obtener los comentarios del producto:", error);
        document.getElementById("container-comments").innerHTML = "<p>Error al obtener los comentarios del producto.</p>";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const prodID = localStorage.getItem("prodID");

    if (prodID !== null) {
        getProductComments(prodID);
    } else {
        document.getElementById("container-comments").innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
    }
});