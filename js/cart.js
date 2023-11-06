const cartList = document.getElementById("cartList");
const shippingType = document.querySelectorAll('input[name="envio"]');
let cart = [];
let main_body = document.body;
let checkbox = document.getElementById("checkitem");
let totalCost = 0;

let newTotalCost = 0;

async function getCartItems() {
  try {
    let response = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");
    let info = await response.json();
    let preloadedItem = info.articles;
    let cartHTML = "" 
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.unshift(preloadedItem[0]);
    

    for (let i = 0; i < cart.length; i++) {

      cartHTML += `
      <tr id="cartRow${cart[i].id}">
        <td><img src="${cart[i].image}" width="80px" class="cartImg"></td>
        <td>${cart[i].name}</td>
        <td>${cart[i].currency} ${cart[i].unitCost}</td>
        <td><input type="number" id="cartCount${cart[i].id}" value="${cart[i].count}" class="cartCant" data-index="${i}" min="1" required></td>
        <td id ="cartSub${cart[i].id}">${cart[i].currency} ${(cart[i].unitCost * cart[i].count)}</td>
        <td><button class="btn btn-danger remove-item" data-index="${i}">Eliminar</button></td>
      </tr>`;
    }

    document.getElementById("cartList").innerHTML += cartHTML;


    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");

        // Elimina la fila de la tabla con el índice correspondiente
        removeItemFromCart(index);
      });
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
      const unitCost = cart[index].unitCost;
    
      subTotal.textContent = `${cart[index].currency} ${count * unitCost}`;
      cant.value = count;
      cart[index].count = count;

      updateLocalStorage()
      updateTotalCost();
    }

    for (let i = 0; i < cart.length; i++) {
      const cant = document.getElementById(`cartCount${cart[i].id}`);
      cant.addEventListener('input', updateSubtotal);
    }

    updateTotalCost();

  } catch (error) {
    console.error("Error al obtener los detalles del producto:", error);
  }
}


function updateTotalCost() {
  newTotalCost = 0;

  for (let i = 0; i < cart.length; i++) {
    newTotalCost += (cart[i].unitCost * cart[i].count);
  }
  totalCost = newTotalCost;

  const totalCostHtml = document.getElementById("subtotalGeneral");
  totalCostHtml.textContent = `Total: $${newTotalCost.toFixed(2)}`;
}

function removeItemFromCart(index) {
  // Verifica que el índice sea válido
  if (index >= 0 && index < cart.length) {
    // Elimina la fila de la tabla
    const row = document.getElementById(`cartRow${cart[index].id}`);
    if (row) {
      row.remove();

      cart.splice(index, 1);

      updateTotalCost();
      updateLocalStorage();
    }
  }
}

function updateLocalStorage() {
  let localCart = [];
  for (let i = 1; i < cart.length; i++) {
    localCart.push(cart[i]);
    
  }
  localStorage.setItem("cart", JSON.stringify(localCart));
}

function updateCartDisplay() {
  for (let i = 1; i < cart.length; i++) {

    cartHTML += `
    <tr id="cartRow${cart[i].id}">
      <td><img src="${cart[i].images[0]}" width="80px" class="cartImg"></td>
      <td>${cart[i].name}</td>
      <td>${cart[i].currency} ${cart[i].cost}</td>
      <td><input type="number" id="cartCount${cart[i].id}" value="${1}" class="cartCant" data-index="${i}" min="1" required></td>
      <td id ="cartSub${cart[i].id}">${cart[i].currency} ${(cart[i].cost)}</td>
       <td><button class="btn btn-danger remove-item" data-index="${i}">Eliminar</button></td>
    </tr>`;
  }
}


document.addEventListener("DOMContentLoaded", async function () {
  await getCartItems();
});




updateTotalCost();

//área de validaciones de los checkbox de envío


shippingType.forEach(function (radio) {
  radio.addEventListener('change', function () {
    if (radio.checked) {
      if (radio.value === "Premium 2 a 5 días") {
        shippingPercentage = 15;
      } else if (radio.value === "Express 5 a 8 días") {
        shippingPercentage = 7;
      } else if (radio.value === "Standard 12 a 15 días") {
        shippingPercentage = 5;
      }

      shippingCost = (newTotalCost * shippingPercentage) / 100;
      totalToPay = newTotalCost + shippingCost;

      const shippingCostHtml = document.getElementById("shippingCost");
      const totalToPayHtml = document.getElementById("totalToPay");

      shippingCostHtml.textContent = `$${shippingCost.toFixed(2)}`;
      totalToPayHtml.textContent = `$${totalToPay.toFixed(2)}`;
    }
  });
});
updateTotalCost();
//Función para aplicar el "dark-mode"


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

//Función y validaciones para finalizar compra
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');
  var successAlert = document.getElementById('success-alert');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          successAlert.style.display = 'block';

        }

        form.classList.add('was-validated')
      }, false)

      form.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
          event.preventDefault();
        }
      });
    })
})();



