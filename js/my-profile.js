let main_body = document.body;

function enableDarkMode() {
   main_body.classList.toggle("dark");

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

//Obtener el modo actual
if (localStorage.getItem("dark-mode") === "true") {
  main_body.classList.add("dark");
} else {
  main_body.classList.remove("dark");
}

enableDarkMode;