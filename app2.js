let productos = [];

async function cargarProductos() {

  const response = await fetch("productos.json");

  productos = await response.json();

  mostrarProductos(productos);
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

        <h3>
          ${producto.nombre}
        </h3>

        <div class="precio">
          $${Number(producto.precio).toLocaleString()}
        </div>

        <a
          class="btn"
          target="_blank"
          href="https://wa.me/573001112233?text=Hola,%20quiero%20cotizar:%20${producto.nombre}%20COD:${producto.codigo}"
        >
          Cotizar
        </a>

      </div>
    `;
  });
}

document
.getElementById("buscador")
.addEventListener("input", function(e){

  const texto = e.target.value.toLowerCase();

  const filtrados = productos.filter(producto =>

    producto.nombre.toLowerCase().includes(texto) ||

    producto.codigo.toLowerCase().includes(texto)

  );

  mostrarProductos(filtrados);

});

cargarProductos();
