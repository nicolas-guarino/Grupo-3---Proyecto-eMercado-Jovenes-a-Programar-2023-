<<<<<<< Updated upstream
=======

let main_body = document.body;
let checkbox = document.getElementById("checkitem");

async function getCartItems(){
  try {
    let response = await fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json");
    let info = await response.json();
    let cart_items = info.articles;
    
    let cartHTML = `
    <tr>
      <td><img src="${cart_items[0].image}" width="80px" class="cartImg"></td>
      <td>${cart_items[0].name}</td>
      <td>${cart_items[0].currency} ${cart_items[0].unitCost}</td>
      <td><input type="number" value="${cart_items[0].count}" class="cartCant"></td>
      <td id ="cartSub${cart_items[0].id}">${(cart_items[0].unitCost * cart_items[0].count)}</td>
    </tr>
    </table>`;
    document.getElementById("cartList").innerHTML += cartHTML;
  } catch (error) {
    console.error("Error al obtener los detalles del producto:", error);
}
}

document.addEventListener("DOMContentLoaded", function () {
  getCartItems();
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

>>>>>>> Stashed changes
