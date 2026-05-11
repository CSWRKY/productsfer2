let productos = [];

async function cargarProductos() {

  try {

    const response = await fetch("./productos.json");

    productos = await response.json();

    mostrarProductos(productos);

  } catch(error) {

    console.error("ERROR JSON:", error);

  }
}

function mostrarProductos(lista) {

  const contenedor = document.getElementById("contenedorProductos");

  contenedor.innerHTML = "";

  lista.forEach(producto => {

    contenedor.innerHTML += `
      <div class="card">

        <div class="codigo">
          COD: ${producto.codigo}
        </div>

        <h3>${producto.nombre}</h3>

        <div class="precio">
          $${Number(producto.precio).toLocaleString()}
        </div>

      </div>
    `;
  });
}

cargarProductos();