let main_body = document.body;
let checkbox = document.getElementById("checkitem");
     
// Función para actualizar el carrito y mostrar la lista en cart.html
function updateCart(cart) {
  const cartList = document.getElementById("cartList");

  if(cartList) {
  cartList.innerHTML = "";
  
// Realizamos una solicitud a la URL del JSON y trabajamos con los datos
fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
  .then((response) => response.json())
  .then((data) => {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = "";

    data.articles.forEach((article, index) => {
      // Generamos una fila para cada artículo
      let cartHTML = `
        <tr>
          <td><img src="${article.image}" width="80px" class="cartImg"></td>
          <td>${article.name}</td>
          <td>${article.currency} ${article.unitCost}</td>
          <td><input type="number" id="cartCount${index}" value="${article.count}" class="cartCant" data-index="${index}"></td>
          <td id="cartSub${index}">${article.currency} ${article.unitCost * article.count}</td>
        </tr>
      `;

      cartList.innerHTML += cartHTML;

      const cant = document.getElementById(`cartCount${index}`);
      const subTotal = document.getElementById(`cartSub${index}`);

      // Desarrollamos un controlador de eventos para los campos de cantidad
      cant.addEventListener("input", function () {
        const count = parseInt(cant.value, 10);
        const unitCost = parseFloat(article.unitCost);
        subTotal.textContent = `${article.currency} ${count * unitCost}`;
        data.articles[index].count = count; // Aquí se actualiza la cantidad en el objeto JSON
        updateTotalCost();
      });
         totalCost += article.cost;
    });
  })
  .catch((error) => {
    console.error("Error al obtener los detalles del producto:", error);
  });
  }
}

function updateTotalCost() {
  let totalCost = 0;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((product) => {
    totalCost += product.cost * (product.count || 1);
  });

  // Actualiza el contenido del elemento con id "totalCost"
  const totalCostElement = document.getElementById("totalCost");
  if (totalCostElement) {
    totalCostElement.textContent = `Total: ${totalCost.toFixed(2)}`;
  }
}
//Función para aplicar el "dark-mode"
function enableDarkMode() {
   main_body.classList.toggle("dark");
   localStorage.setItem("checkbox-status", checkbox.checked);

   //En caso de querer confirmar si el checkbox está "checked"
   if (document.getElementById("checkitem").checked) {
     console.log("checked");
   } else {
     console.log("Not checked");
   }

    //Guardamos el modo en localStorage
    if (main_body.classList.contains("dark")) {
     localStorage.setItem("dark-mode", "true");
    } else {
     localStorage.setItem("dark-mode", "false");
    }
}

// Obtenemos el estado del checkbox guardado en localStorage
const checkboxStatus = localStorage.getItem("checkbox-status");
if (checkboxStatus === "true") {
  checkbox.checked = true;
} else {
  checkbox.checked = false;
}

//Obtener el modo actual
if (localStorage.getItem("dark-mode") === "true") {
  main_body.classList.add("dark");
} else {
  main_body.classList.remove("dark");
}
enableDarkMode;

// Obtenemos la lista de productos del localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Obtenemos la tabla donde se mostrarán los productos
const cartList = document.getElementById("cartList");

// Limpiamos la tabla antes de agregar los productos
cartList.innerHTML = "";

// Esta variable sirve para calcular el costo total
let totalCost = 0;

// Recorremos la lista de productos en el carrito
cart.forEach((product, index) => {
  // Creamos una nueva fila para el producto
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${product.images[0]}" width="80px" class="cartImg"></td>
    <td>${product.name}</td>
    <td>${product.currency} ${product.cost}</td>
    <td><input type="number" id="cartCount${index}" value="${product.count}" class="cartCant" data-index="${index}"></td>
    <td id="cartSub${index}">${product.currency} ${product.cost * product.count}</td>
  `;

  // Aquí se agrega la fila a la tabla
  cartList.appendChild(row);

  const cant = row.querySelector(`#cartCount${index}`);
  const subTotal = row.querySelector(`#cartSub${index}`);

  // Desarrollamos un controlador de eventos para los campos de cantidad
  cant.addEventListener("input", function () {
    const count = parseInt(cant.value, 10);
    const unitCost = parseFloat(product.cost);
    subTotal.textContent = `${product.currency} ${count * unitCost}`;

    // Actualizamos la cantidad en el objeto JSON del producto
    cart[index].count = count;

    // Actualizamos el costo total
    updateTotalCost();
  });

  // Aquí se calcula el costo total para este producto
  const productCost = product.cost * product.count;
  totalCost += productCost;
});



enableDarkMode;
