document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();
});

const fetchProducts = async () => {
    try {
        // Configurar Axios
        const api = axios.create({
            baseURL: 'https://fakestoreapi.com'
        });

        const response = await api.get('/products');
        if (response.data) {
            displayProducts(response.data);
        }
    } catch (error) {
        console.error('Error while fetching products:', error);
    }
};

function displayProducts(products) {
    productList = document.querySelector('.product-list');

    products.forEach(product => {
        console.log(product);
        productCard = `
        <div class="product-card" id="product_${product.id}">
            <div class="card-header">
                <img class="product-image" src="${product.image}">
            </div>
            <div class="product-data">
                <h2 class="product-name">${product.title}</h2>
                <p class="product-description">${product.description}</p>
                <p class="product-category">${product.category}</p>
                <p class="product-price">${product.price}</p>
            </div>
        </div>
        `;
        // Usar innerHTML para adicionar o HTML ao productList
        productList.innerHTML += productCard;
    });
}