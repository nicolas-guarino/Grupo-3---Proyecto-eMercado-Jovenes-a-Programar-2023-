const cartList = document.getElementById("cartList");
let cart = [];
let localCart = JSON.parse(localStorage.getItem("cart")) || [];
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
      const existingArticle = cart.find((item) => item.id === localCart[i].id);
      if (existingArticle) {
        existingArticle.cartCount += 1;
      } else {
        localCart[i].cartCount = 1;
        cart.push(localCart[i]);
      }
    }

    let cartHTML = `
    <tr>
      <td><img src="${cart[0].image}" width="80px" class="cartImg"></td>
      <td>${cart[0].name}</td>
      <td>${cart[0].currency} ${cart[0].unitCost}</td>
      <td><input type="number" id="cartCount" min="1" value="${cart[0].count}" class="cartCant" required></td>
      <td id ="cartSub${cart[0].id}">${cart[0].currency} ${(cart[0].unitCost * cart[0].count)}</td>
    </tr>`;

    for (let i = 1; i < cart.length; i++) {
      cartHTML += `
    <tr>
      <td><img src="${cart[i].images[0]}" width="80px" class="cartImg"></td>
      <td>${cart[i].name}</td>
      <td>${cart[i].currency} ${cart[i].cost}</td>
      <td><input type="number" id="cartCount${cart[i].id}" value="${1}" class="cartCant" data-index="${i}" min="1" required></td>
      <td id ="cartSub${cart[i].id}">${cart[i].currency} ${(cart[i].cost)}</td>
    </tr>`;
    }

    cartHTML += "</table>";
    document.getElementById("cartList").innerHTML += cartHTML;


    const cartCount = document.getElementById('cartCount');

    cartCount.addEventListener('input', function () {
      const cartSubtotal = document.getElementById(`cartSub${cart[0].id}`);
      let newCount = parseInt(cartCount.value);
      if(newCount < 0){
        newCount = 0;
      }
      const newUnitCost= cart[0].unitCost;
      
      cartSubtotal.textContent = `${cart[0].currency} ${newCount * newUnitCost}`;
      updateTotalCost();
    });


    function updateSubtotal(event) {
      const input = event.target;
      const index = input.getAttribute('data-index');
      const cant = document.getElementById(`cartCount${cart[index].id}`);
      const subTotal = document.getElementById(`cartSub${cart[index].id}`);

      let count = parseInt(cant.value);
      if (count < 0) {
        count = 0;
      }
      const unitCost = cart[index].cost;

      subTotal.textContent = `${cart[index].currency} ${count * unitCost}`;
      cant.value = count;

      updateTotalCost()
    }

    for (let i = 1; i < cart.length; i++) {
      const cant = document.getElementById(`cartCount${cart[i].id}`);
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
    const subTotalElement = document.getElementById(`cartSub${cart[i].id}`);
    const subTotalValue = parseFloat(subTotalElement.textContent.replace(`${cart[i].currency} `, ''));
    newTotalCost += subTotalValue;
  }
  totalCost = newTotalCost;

  const totalCostHtml = document.getElementById("totalCost");
  totalCostHtml.textContent = `Total: $${newTotalCost.toFixed(2)}`;
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

//Función y validaciones para finalizar compra
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

const creditCardRadio = document.getElementById("creditCard");
const transferRadio = document.getElementById("bankTransfer");
const card = document.getElementById("card");
const code = document.getElementById("code");
const date = document.getElementById("date");
const transferField = document.getElementById("cardNumber");

// Add change event listeners to the radio buttons
creditCardRadio.addEventListener("change", () => {
  if (creditCardRadio.checked) {
    transferField.disabled = true;
    card.disabled = false;
    code.disabled = false;
    date.disabled = false;
  }
});

transferRadio.addEventListener("change", () => {
  if (transferRadio.checked) {
    card.disabled = true;
    code.disabled = true;
    date.disabled = true;
    transferField.disabled = false;
  }
});

