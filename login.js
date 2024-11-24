// Usuario y contraseña predefinidos
const validUsername = "fimmaADMIN";
const validPassword = "contra1234";

// Seleccionar el formulario y los campos de entrada
const form = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Escuchar el evento de submit del formulario
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario automáticamente

    // Obtener los valores ingresados
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // Verificar si los campos están vacíos
    if (enteredUsername === "" || enteredPassword === "") {
        alert("Por favor, ingrese tanto el usuario como la contraseña.");
        return;
    }

    // Validar si los datos son correctos
    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        // Si las credenciales son correctas, redirigir a otra página
        window.location.href = "main.html"; // Cambia a la URL de destino
    } else {
        // Si las credenciales son incorrectas, mostrar un mensaje de error
        alert("Usuario o contraseña incorrectos.");
    }
});

// Detecta si el input tiene algún valor y ajusta la posición del label
const inputs = document.querySelectorAll('.username input');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (input.value.trim() !== "") {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    });
});
