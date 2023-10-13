let main_body = document.body;
let checkbox = document.getElementById("checkitem");
     
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
      });
    });
  })
  .catch((error) => {
    console.error("Error al obtener los detalles del producto:", error);
  });


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
