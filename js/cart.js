const cartList = document.getElementById("cartList");
let cart = [];
let localCart = JSON.parse(localStorage.getItem("cart"));
let preloadedItem = [];
let main_body = document.body;
let checkbox = document.getElementById("checkitem");
let totalCost = 0;

async function getCartItems() {
  try {
    let response = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");
    let info = await response.json();
    preloadedItem = info.articles;

    cart.unshift(preloadedItem[0]);
    for (let i = 0; i < localCart.length; i++) {
      cart.push(localCart[i]);
    }
 

    let cartHTML = `
    <tr>
      <td><img src="${cart[0].image}" width="80px" class="cartImg"></td>
      <td>${cart[0].name}</td>
      <td>${cart[0].currency} ${cart[0].unitCost}</td>
      <td><input type="number" id="cartCount" value="${cart[0].count}" class="cartCant"></td>
      <td id ="cartSub${cart[0].id}">${cart[0].currency} ${(cart[0].unitCost * cart[0].count)}</td>
    </tr>`;

    for (let i = 1; i < cart.length; i++) {
      cartHTML += `
    <tr>
      <td><img src="${cart[i].images[0]}" width="80px" class="cartImg"></td>
      <td>${cart[i].name}</td>
      <td>${cart[i].currency} ${cart[i].cost}</td>
      <td><input type="number" id="cartCount${cart[i].id}" value="${1}" class="cartCant" data-index="${i}"></td>
      <td id ="cartSub${cart[i].id}">${cart[i].currency} ${(cart[i].cost)}</td>
    </tr>`;
    }

    cartHTML += "</table>";
    document.getElementById("cartList").innerHTML += cartHTML;

    function updateSubtotal(event) {
      const input = event.target;
      const index = input.getAttribute('data-index');
      const cant = document.getElementById(cartCount${cart[index].id});
 const subTotal = document.getElementById(cartSub${cart[index].id});

      let count = parseInt(cant.value);
      if (count < 0) {
        count = 0;
      }
      const unitCost = cart[index].cost;

      subTotal.textContent = ${cart[index].currency} ${count * unitCost};
      cant.value = count;

      updateTotalCost()
    }

    for (let i = 1; i < cart.length; i++) {
      const cant = document.getElementById(cartCount${cart[i].id});
      cant.addEventListener('input', updateSubtotal);
    }

  } catch (error) {
    console.error("Error al obtener los detalles del producto:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  getCartItems();
});


function updateTotalCost() {
  let newTotalCost = 0;
for (let i = 0; i < cart.length; i++) {
    const subTotalElement = document.getElementById(cartSub${cart[i].id});
    const subTotalValue = parseFloat(subTotalElement.textContent.replace(`${cart[i].currency} `, ''));
    newTotalCost += subTotalValue;
  }
  totalCost = newTotalCost;

  const totalCostHtml = document.getElementById("totalCost");
  totalCostHtml.textContent = Total: $${newTotalCost.toFixed(2)};
}

updateTotalCost();



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
