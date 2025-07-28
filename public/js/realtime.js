// 📡 Conexión WebSocket
const socket = io();

// Referencia al <tbody> de la tabla
const tbody = document.querySelector('#tablaProductos tbody');

// Función para renderizar la tabla de productos
function renderTable(productos) {
    tbody.innerHTML = '';

    productos.forEach((p) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
      <td>${p.id}</td>
      <td><img src="/img/${p.image}.jpg" alt="${p.title}" width="25"/></td>
      <td>${p.title}</td>
      <td>${p.price}</td>
      <td>${p.code}</td>
      <td><button data-id="${p.id}">Eliminar</button></td>
    `;
        tbody.appendChild(fila);
    });

    // Activar listeners en botones "Eliminar"
    tbody.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            socket.emit('eliminarProducto', id);
        });
    });
}

//Escuchar actualizaciones del servidor
socket.on('productosActualizados', renderTable);
