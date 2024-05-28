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
        
        if (product.description.length >= 90) {

            let resumed_description = product.description.substring(0, 90) + '...'
            let more_description = product.description.substring(90, product.description.lenght)

            description_display = `
            <p id="product_description_${product.id}" class="product-description" value="less">${resumed_description}</p>
            <p id="more_${product.id}" class="description-more">${more_description}</p>
            <button id="more_btn_${product.id}" class="see-more-btn" onclick="seeMoreToogle('${product.id}')">see more ></button>
            `
        } else {
            description_display = `<p class="product-description">${product.description}</p>`
        }

        productCard = `
        <div class="product-card" id="${product.id}">
            <div class="card-header">
                <img class="product-image" src="${product.image}">
            </div>
            <div class="product-data">
                <h2 class="product-name">${product.title}</h2>
                ${description_display}
                <p class="product-category">${product.category}</p>
                <p class="product-price">${product.price}</p>
            </div>
        </div>
        `;
        // Usar innerHTML para adicionar o HTML ao productList
        productList.innerHTML += productCard;
    });
}

function seeMoreToogle(card_id) {
    let product_description = document.getElementById(`product_description_${card_id}`)
    let more = document.getElementById(`more_${card_id}`).innerText
    let value = product_description.getAttribute('value')
    let btn_display = document.getElementById(`more_btn_${card_id}`)

    if (value == 'less') {

        content_lenght = product_description.lenght;
        description = product_description.innerText.substring(0, 90)
        btn_display.innerHTML = "see less <"
        description += more

        product_description.innerText = description
        product_description.setAttribute('value', 'more')
        
    } else {

        let description = product_description.innerText.substring(0, 90) + '...'
        btn_display.innerHTML = "see more >"

        product_description.innerText = description
        product_description.setAttribute('value', 'less')

    }

}