// Array para almacenar los productos
let productos = [];

// Cargar productos guardados desde LocalStorage al iniciar
function cargarProductos() {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
        renderTable();
    }
}
// Función para mostrar el formulario de edición
function mostrarEditar() {
    document.getElementById("editForm").style.display = "flex";
    document.getElementById("editFields").style.display = "none";
    document.getElementById("editNotFound").style.display = "none";
}

// Función para cerrar el formulario de edición
function cerrarEditar() {
    document.getElementById("editForm").style.display = "none";
}

// Buscar el producto a editar
document.getElementById("editProductId").addEventListener("input", function () {
    const productId = parseInt(this.value);
    const producto = productos.find(p => p.id === productId);

    if (producto) {
        document.getElementById("editFields").style.display = "block";
        document.getElementById("editNotFound").style.display = "none";

        // Rellenar el formulario con los datos actuales
        document.getElementById("editProductPieces").value = producto.pieces;
        document.getElementById("editProductLocation").value = producto.location;
        document.getElementById("editProductState").value = producto.state;
        document.getElementById("editProductCreationDate").value = producto.creationDate;
        document.getElementById("editProductPrice").value = producto.price;
        document.getElementById("editProductChanges").value = producto.changes;
    } else {
        document.getElementById("editFields").style.display = "none";
        document.getElementById("editNotFound").style.display = "block";
    }
});

// Guardar los cambios en el producto
document.getElementById("editProductForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById("editProductId").value);
    const productoIndex = productos.findIndex(p => p.id === productId);

    if (productoIndex !== -1) {
        // Actualizar los datos del producto
        productos[productoIndex].pieces = parseInt(document.getElementById("editProductPieces").value);
        productos[productoIndex].location = document.getElementById("editProductLocation").value;
        productos[productoIndex].state = document.getElementById("editProductState").value;
        productos[productoIndex].creationDate = document.getElementById("editProductCreationDate").value;
        productos[productoIndex].price = parseFloat(document.getElementById("editProductPrice").value);
        productos[productoIndex].changes = document.getElementById("editProductChanges").value;

        // Recalcular la fecha de expiración
        const creationDate = new Date(productos[productoIndex].creationDate);
        creationDate.setFullYear(creationDate.getFullYear() + 3); // Agregar 3 años
        creationDate.setDate(creationDate.getDate() + 80); // Agregar 80 días
        productos[productoIndex].expirationDate = creationDate.toISOString().split("T")[0];

        // Guardar los productos actualizados y renderizar la tabla
        guardarProductos();
        renderTable();

        cerrarEditar();
    }
});

// Guardar productos en LocalStorage
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para mostrar el formulario de agregar producto
function mostrarFormulario() {
    document.getElementById("addForm").style.display = "flex";
}

// Función para cerrar el formulario
function cerrarFormulario() {
    document.getElementById("addForm").style.display = "none";
}

// Evento para agregar un producto desde el formulario
document.getElementById("addProductForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitar recargar la página

    // Obtener los datos del formulario
    const id = parseInt(document.getElementById("productId").value);
    const pieces = parseInt(document.getElementById("productPieces").value);
    const location = document.getElementById("productLocation").value;
    const state = document.getElementById("productState").value;
    const creationDate = document.getElementById("productCreationDate").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const changes = document.getElementById("productChanges").value;

    // Calcular la fecha de expiración (3 años y 80 días)
    const expirationDate = new Date(creationDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + 3); // Agregar 3 años
    expirationDate.setDate(expirationDate.getDate() + 80); // Agregar 80 días
    const formattedExpirationDate = expirationDate.toISOString().split("T")[0];

    // Agregar el producto al array
    productos.push({
        id,
        pieces,
        location,
        state,
        creationDate,
        expirationDate: formattedExpirationDate,
        price,
        changes,
    });

    // Guardar en LocalStorage
    guardarProductos();

    // Renderizar la tabla
    renderTable();

    // Limpiar el formulario y cerrarlo
    document.getElementById("addProductForm").reset();
    cerrarFormulario();
});

// Renderizar la tabla con eventos de clic
function renderTable() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    // Ordenar los productos por ID de mayor a menor
    productos.sort((a, b) => b.id - a.id);

    productos.forEach((producto, index) => {
        const row = document.createElement("tr");

        // Rellenar la fila con datos
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.pieces}</td>
            <td>${producto.location}</td>
            <td>${producto.state}</td>
            <td>${producto.creationDate}</td>
            <td>${producto.expirationDate}</td>
            <td>${producto.price.toFixed(2)}</td>
            <td>${producto.changes}</td>
        `;

        // Agregar evento onclick para mostrar detalles del producto
        row.addEventListener("click", () => mostrarDetallesProducto(index));

        tbody.appendChild(row);
    });
}
// Función para filtrar productos según la búsqueda
// Función para filtrar productos según la búsqueda y el criterio seleccionado
function filtrarProductos() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const criterio = document.getElementById("searchCriteria").value;

    // Filtrar los productos según el criterio seleccionado
    const productosFiltrados = productos.filter(producto => {
        const campo = producto[criterio];
        if (campo !== undefined && campo !== null) {
            return campo.toString().toLowerCase().includes(query);
        }
        return false;
    });

    // Renderizar la tabla con los productos filtrados
    renderTableFiltrada(productosFiltrados);
}

// Función para renderizar tabla filtrada (igual que antes)
function renderTableFiltrada(productosFiltrados) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    productosFiltrados.forEach((producto, index) => {
        const row = document.createElement("tr");

        // Rellenar la fila con datos
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.pieces}</td>
            <td>${producto.location}</td>
            <td>${producto.state}</td>
            <td>${producto.creationDate}</td>
            <td>${producto.expirationDate}</td>
            <td>${producto.price.toFixed(2)}</td>
            <td>${producto.changes}</td>
        `;

        // Agregar evento onclick para mostrar detalles del producto
        row.addEventListener("click", () => mostrarDetallesProducto(index));

        tbody.appendChild(row);
    });
}

// Evento para activar la búsqueda dinámica
document.getElementById("searchBar").addEventListener("input", filtrarProductos);


// Función para renderizar tabla filtrada
function renderTableFiltrada(productosFiltrados) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    productosFiltrados.forEach((producto, index) => {
        const row = document.createElement("tr");

        // Rellenar la fila con datos
        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.pieces}</td>
            <td>${producto.location}</td>
            <td>${producto.state}</td>
            <td>${producto.creationDate}</td>
            <td>${producto.expirationDate}</td>
            <td>${producto.price.toFixed(2)}</td>
            <td>${producto.changes}</td>
        `;

        // Agregar evento onclick para mostrar detalles del producto
        row.addEventListener("click", () => mostrarDetallesProducto(index));

        tbody.appendChild(row);
    });
}

// Evento para activar la búsqueda dinámica
document.getElementById("searchBar").addEventListener("input", filtrarProductos);


// Función para mostrar los detalles de un producto
function mostrarDetallesProducto(index) {
    const producto = productos[index];

    const detalles = `
        <p><strong>ID:</strong> ${producto.id}</p>
        <p><strong>Piezas:</strong> ${producto.pieces}</p>
        <p><strong>Ubicación:</strong> ${producto.location}</p>
        <p><strong>Estado:</strong> ${producto.state}</p>
        <p><strong>Fecha de creación:</strong> ${producto.creationDate}</p>
        <p><strong>Fecha de expiración:</strong> ${producto.expirationDate}</p>
        <p><strong>Precio:</strong> $${producto.price.toFixed(2)}</p>
        <p><strong>Cambios:</strong> ${producto.changes}</p>
    `;

    document.getElementById("productDetails").innerHTML = detalles;

    // Mostrar el modal
    document.getElementById("productDetailsModal").style.display = "flex";
}

// Función para cerrar el modal de detalles
function cerrarDetalles() {
    document.getElementById("productDetailsModal").style.display = "none";
}

// Función para mostrar el formulario de eliminación
function mostrarEliminar() {
    document.getElementById("deleteForm").style.display = "flex";
}

// Función para cerrar el formulario de eliminación
function cerrarEliminar() {
    document.getElementById("deleteForm").style.display = "none";
    document.getElementById("productNotFound").style.display = "none";
    document.getElementById("deleteConfirmation").style.display = "none";
}

// Buscar el producto a eliminar
document.getElementById("deleteProductForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const productId = parseInt(document.getElementById("deleteProductId").value);
    const producto = productos.find(p => p.id === productId);

    if (producto) {
        document.getElementById("deleteConfirmation").style.display = "block";
        document.getElementById("productNotFound").style.display = "none";
        document.getElementById("productToDeleteDetails").innerHTML = `
            <p><strong>ID:</strong> ${producto.id}</p>
            <p><strong>Piezas:</strong> ${producto.pieces}</p>
            <p><strong>Ubicación:</strong> ${producto.location}</p>
            <p><strong>Estado:</strong> ${producto.state}</p>
            <p><strong>Fecha de creación:</strong> ${producto.creationDate}</p>
            <p><strong>Fecha de expiración:</strong> ${producto.expirationDate}</p>
            <p><strong>Precio:</strong> $${producto.price.toFixed(2)}</p>
            <p><strong>Cambios:</strong> ${producto.changes}</p>
        `;
    } else {
        document.getElementById("productNotFound").style.display = "block";
        document.getElementById("deleteConfirmation").style.display = "none";
    }
});

// Eliminar el producto
function eliminarProducto() {
    const confirmText = document.getElementById("confirmText").value;

    if (confirmText.toLowerCase() === "confirmar") {
        const productId = parseInt(document.getElementById("deleteProductId").value);
        productos = productos.filter(producto => producto.id !== productId);
        guardarProductos();
        renderTable();
        cerrarEliminar();
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Guardar los productos antes de cerrar sesión
    guardarProductos();
    // Redirigir a la página de login o home
    window.location.href = "/index.html"; // Cambia esta URL según corresponda
}

// Cargar los productos cuando la página esté lista
document.addEventListener("DOMContentLoaded", cargarProductos);
