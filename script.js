let productCount = 0;
const maxProducts = 20;

// Función para agregar un nuevo producto
function addProduct() {
    if (productCount < maxProducts) {
        productCount++;
        const container = document.createElement("div");
        container.classList.add("product-container");
        container.id = `product-${productCount}`;

        container.innerHTML = `
            <h4>Nombre del producto ${productCount}</h4>
            <label>Nombre del producto:</label>
            <input type="text" id="name-${productCount}" oninput="updateProductTitle(${productCount})"><br>
            <label>Precio del producto (en $):</label>
            <input type="number" id="price-${productCount}" step="0.01" min="0"><br>
            <label>Peso del producto (en gramos):</label>
            <input type="number" id="weight-${productCount}" step="0.01" min="0"><br>
            <label>Cantidad de gramos utilizados:</label>
            <input type="number" id="grams-${productCount}" step="0.01" min="0"><br>
            <button onclick="removeProduct(${productCount})">Eliminar Producto</button>
        `;

        document.getElementById("products-container").appendChild(container);
    } else {
        alert("Has alcanzado el límite de 20 productos.");
    }
}

// Función para actualizar el título del producto con el nombre ingresado
function updateProductTitle(productId) {
    const productName = document.getElementById(`name-${productId}`).value;
    const productTitle = document.querySelector(`#product-${productId} h4`);

    if (productName.trim() !== "") {
        productTitle.innerText = `Producto: ${productName}`;
    } else {
        productTitle.innerText = `Nombre del producto ${productId}`;
    }
}

// Función para calcular el precio total de todos los productos
function calculateTotal() {
    let totalPrice = 0;

    for (let i = 1; i <= productCount; i++) {
        const productContainer = document.getElementById(`product-${i}`);
        if (productContainer) { // Solo calcular si el producto existe
            const name = document.getElementById(`name-${i}`).value;
            const price = parseFloat(document.getElementById(`price-${i}`).value);
            const weight = parseFloat(document.getElementById(`weight-${i}`).value);
            const grams = parseFloat(document.getElementById(`grams-${i}`).value);

            if (!isNaN(price) && !isNaN(weight) && !isNaN(grams) && price > 0 && weight > 0 && grams > 0) {
                // Calcular el precio por gramo
                const pricePerGram = price / weight;

                // Calcular el precio total para la cantidad de gramos ingresada
                const productTotalPrice = pricePerGram * grams;

                // Sumar al total general
                totalPrice += productTotalPrice;
            }
        }
    }

    // Mostrar el total calculado con formato de decimales separados por puntos (ej: 10.000,54)
    document.getElementById("total-price").innerText = `Total: $${totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Función para eliminar un producto
function removeProduct(productId) {
    const productContainer = document.getElementById(`product-${productId}`);
    if (productContainer) {
        productContainer.remove();
        productCount--; // Disminuir el contador de productos
        recalculateProductIDs(); // Reajustar los ID de los productos restantes
        calculateTotal(); // Recalcular el total al eliminar un producto
    }
}

// Función para reajustar los ID de los productos restantes
function recalculateProductIDs() {
    const containers = document.querySelectorAll(".product-container");
    productCount = containers.length; // Actualizar el número total de productos

    containers.forEach((container, index) => {
        const newProductId = index + 1; // Nuevo ID basado en el índice
        container.id = `product-${newProductId}`; // Actualizar el ID del contenedor

        // Actualizar los IDs de los inputs
        const inputs = container.querySelectorAll("input");
        inputs.forEach(input => {
            const oldId = input.id.split("-")[1]; // Obtener el ID antiguo
            input.id = `${input.id.split("-")[0]}-${newProductId}`; // Actualizar el ID
        });

        // Actualizar el título del producto
        const productTitle = container.querySelector("h4");
        productTitle.innerText = `Nombre del producto ${newProductId}`;
    });
}

