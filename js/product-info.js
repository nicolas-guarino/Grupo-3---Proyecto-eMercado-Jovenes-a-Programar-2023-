const URL_BASE = "https://japceibal.github.io/emercado-api/products/"


function redirectRelProd(prodID){ //Función que almacena el prodID del producto en el local storage y redirige a product-info
    localStorage.setItem("prodID", prodID);
    window.location = "product-info.html"
}

async function getProductDetails(prodID) { //Función para obtener los detalles del producto
    try {
        const URL = `${URL_BASE}${prodID}.json`;
        let response = await fetch(URL);
        let product = await response.json();

        let relProds = product.relatedProducts;
        let relProdsHTML = "";

        const productImages = product.images; // Array con las imagenes
        let carouselImages = '';
        // Bucle que recorre el array y genera el codigo html para las imagenes del carousel, se le coloca la clase 'active' al elemento 0 del array
        for (let i = 0; i < productImages.length; i++) {
            carouselImages += `
                <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img class="d-block imgsProduct" src="${productImages[i]}" alt="imgsProduct">
                </div>
            `;
        }

        //Generamos el HTML para mostrar los detalles del producto, con el carrusel de imágenes
        let productHTML = `
            <h1 class="pTitle">${product.name}</h1>
            <button class="buy-button">Comprar</button>
            <p class="pProducts"><span>Precio:</span> ${product.currency} ${product.cost}</p>
            <p class="pProducts"><span>Descripción:</span> ${product.description}</p>
            <p class="pProducts"><span>Categoria:</span> ${product.category}</p>
            <p class="pProducts"><span>Vendidos:</span> ${product.soldCount}</p>
            
            <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-inner imgsProductFlex">
                    ${carouselImages}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;

        document.getElementById("containerInfo").innerHTML = productHTML;

        for (let i = 0; i < relProds.length; i++) { //For que recorre los productos relacionados
            //Generamos el HTML para cada producto, llamando a la función con el atributo onclick para que nos redirija a su respectivo product-info
            relProdsHTML += ` <div id="relProd" onclick="redirectRelProd(${relProds[i].id})"><p><img id="imgRelProds" src="${relProds[i].image}"> ${relProds[i].name}</p></div>`
        }
        document.getElementById("relatedContainer").innerHTML = relProdsHTML;

    } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);

        document.getElementById("containerInfo").innerHTML = "<p>Error al obtener los detalles del producto.</p>";
    }
}


async function getProductComments(prodID) { //Función para obtener los comentarios del producto
    try {
        const URL_COMMENT = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
        let response = await fetch(URL_COMMENT);
        let comments = await response.json();

        let productscommentsHTML = "";

        for (let i = 0; i < comments.length; i++) { //Recorremos los comentarios, creando su puntuación de estrellas y generando el HTML para mostrar cada comentario
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

function createStarRating(rating) { //Función para la puntuación de estrellas, le enviamos la puntuación por parámetro
    const maxRating = 5; //Puntuación máxima
    let starHTML = "";
    for (let i = 1; i <= maxRating; i++) { 
        //Recorremos del 1 a la puntuación máxima, si el rating es mayor o igual al número, coloca una estrella dorada
        if (i <= rating) { 
            starHTML += '<span class="fa fa-star checked"></span>';
        } else {
            starHTML += '<span class="fa fa-star"></span>';
        }
    }
    return starHTML;
}


document.getElementById("comment-submit").addEventListener("click", function () { //Función para mostrar un comentario nuevo
    const prodNewComment = document.getElementById("prod-newComment");
    const user = localStorage.getItem('loggedUser');
    const newComment = document.getElementById("new-comment");
    const comment = newComment.value;
    const ratesSelect = document.getElementById("rates");
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
    //Generamos el HTML del comentario
    commentElement.innerHTML = `
    <div class="commentsContainer">
        <p class="pComment"> ${user} - ${formattedDate} - ${createStarRating(rating)} </p>
        <p class="pComment"> ${comment}</p>
    </div>    
    `;

    prodNewComment.appendChild(commentElement);

    //Limpiamos los controles para añadir un nuevo comentario
    newComment.value = "";
    ratesSelect.selectedIndex = 0;
});



document.addEventListener("DOMContentLoaded", function () {
    const prodID = localStorage.getItem("prodID");
    
    if (prodID !== null) { //Verificamos que haya un prodID en el local storage y cargamos la información del producto
        getProductDetails(prodID);
        getProductComments(prodID);
    } else {
        document.getElementById("container-comments").innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
    }
});


document.getElementById("addToCart").addEventListener("click", function () { //Funcionalidad para añadir el producto al carrito 
    const prodID = localStorage.getItem("prodID");
    const cart = JSON.parse(localStorage.getItem("cart")) || []; //Obtenemos el carrito del local storage, o lo inicializamos en caso de que aún no haya uno guardado
    const conversionRate = 43; // 1 USD = 43 UYU
    if (prodID !== null) {
         // Aquí obtenemos información del producto
        const URL = `${URL_BASE}${prodID}.json`;
        fetch(URL)
            .then((response) => response.json())
            .then((article) => {
                //Creamos un objeto nuevo con los datos del producto
                const newItem = {id: prodID, name: article.name, count: 1, unitCost: article.cost, currency: article.currency, image: article.images[0]};
                
                if (newItem.currency === "UYU") { //Si el producto está en pesos uruguayos, hacemos la conversión a USD
                    newItem.currency = "USD";
                    newItem.unitCost = Math.round(newItem.unitCost / conversionRate);
                }

                const index = cart.findIndex(item => item.id === newItem.id); //Recorremos el carrito y verificamos si hay un item existente con el mismo id
                if (index !== -1) { //Si encuentra un index distinto a -1, no duplicamos el producto e incrementamos la cantidad del producto existente
                    cart[index].count += 1;
                } else {
                    cart.push(newItem); //Si el producto no se encuentra aún en el carrito, lo añadimos
                }
                // Agregamos el carrito al local storage
                localStorage.setItem("cart", JSON.stringify(cart));
                // Redirige al usuario a la página del carrito
                window.location.href = "cart.html";
                // Desplegamos un mensaje de confirmación
                document.getElementById("addToCartMessage").style.display = "block";
            })
            .catch((error) => {
                console.error("Error al obtener detalles del producto:", error);
            });
    }
});

