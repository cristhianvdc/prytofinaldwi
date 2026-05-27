document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-content');

    modal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const id = button.getAttribute('data-id');
        const nombre = button.getAttribute('data-nombre');
        const descripcion = button.getAttribute('data-descripcion');
        const precio = button.getAttribute('data-precio');
        const imagen = button.getAttribute('data-imagen');
        const categoriaId = parseInt(button.getAttribute('data-categoria'));

        const tallasRopa = ["XS", "S", "M", "L", "XL", "XXL"];
        const tallasZapatillas = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];
        const tallaAccesorio = ["Única"];
        const colores = ["Negro", "Blanco", "Rojo", "Azul", "Gris"];

        let tallas = [];

        switch (categoriaId) {
            case 1: // Zapatillas
                tallas = tallasZapatillas;
                break;
            case 2: // Deportes
            case 3: // Ropa Urbana
                tallas = tallasRopa;
                break;
            case 4: // Accesorios
                tallas = tallaAccesorio;
                break;
            default:
                tallas = tallaAccesorio;
        }

        const comboTallas = `
            <select id="selectTalla" class="form-select mb-2" required>
                <option value="">Seleccione talla</option>
                ${tallas.map(t => `<option value="${t}">${t}</option>`).join("")}
            </select>
        `;

        const comboColores = `
            <select id="selectColor" class="form-select mb-2" required>
                <option value="">Seleccione color</option>
                ${colores.map(c => `<option value="${c}">${c}</option>`).join("")}
            </select>
        `;

        modalContent.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title">${nombre}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${imagen}" class="modal-product-img img-fluid" alt="${nombre}"
                             onerror="this.onerror=null; this.src='/img/img_not_found.jpg';">
                    </div>
                    <div class="col-md-6">
                        <p >${descripcion}</p>
                        <div class="mt-3">
                            <label class="form-label"><strong>Talla:</strong></label>
                            ${comboTallas}
                            <label class="form-label"><strong>Color:</strong></label>
                            ${comboColores}
                            <label class="form-label mt-2"><strong>Cantidad:</strong></label>
                            <input type="number" id="inputCantidad" class="form-control mb-2" value="1" min="1" required>
                        </div>
                        <p class="h4 mt-3">Precio: <strong>S/ ${precio}</strong></p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-dark" id="btnAgregarCarrito">Añadir al carrito</button>
            </div>
        `;

        const btnAgregar = modalContent.querySelector('#btnAgregarCarrito');
        btnAgregar.addEventListener('click', function () {
            const talla = modalContent.querySelector('#selectTalla').value;
            const color = modalContent.querySelector('#selectColor').value;
            const cantidad = parseInt(modalContent.querySelector('#inputCantidad').value);

            if (!talla || !color || cantidad <= 0) {
                alert("Debe seleccionar una talla, color y cantidad válida.");
                return;
            }

            fetch('/carrito/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    productoId: id,
                    talla: talla,
                    color: color,
                    cantidad: cantidad
                })
            })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            const carritoLink = document.querySelector('#linkCarrito');
                            if (carritoLink && data.cantidadCarrito !== null) {
                                carritoLink.textContent = `Carrito(${data.cantidadCarrito})`;
                            }

                            alert(data.message);
                            const modalInstance = bootstrap.Modal.getInstance(modal);
                            modalInstance.hide();
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch(err => {
                        console.error('Error al agregar producto:', err);
                        alert("Ocurrió un error al agregar el producto al carrito.");
                    });
        });
    });
});