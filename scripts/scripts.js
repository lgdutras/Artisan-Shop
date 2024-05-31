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
    let product_list = document.querySelector('.product-list');

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
                <div class="card-btns">
                        <button id="delete_1" class="remove-btn card-btn" onclick="deleteItemCall('${product.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E50000" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </button>
                        <button id="edit_1" class="edit-btn card-btn" onclick="console.log('Edit item 1')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#004AAD" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                              </svg>
                        </button>
                    </div>
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
        product_list.innerHTML += productCard;
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

const deleteItem = async(item_id) => {
    try {
        const api_delete = axios.create({
            baseURL: 'https://fakestoreapi.com'
        });

        const response_delete = await api_delete.delete(`/products/${item_id}`);
        if (response_delete.data) {

            let deleted_item = response_delete.data.id;
            let product_card = document.getElementById(`${deleted_item}`);
            
            product_card.remove();
        }
    } catch (error) {
        console.error('Error while deleting products:', error);
    }
}

function deleteItemCall(item_id) {
    
    let product = document.getElementById(`${item_id}`)
    let item = product.querySelector('.product-name').textContent

    if (confirm(`Are you sure you want to delete the item ${item}?`) == true) {

        deleteItem(item_id);

    } else {

        console.log(product)
        text = "deletion canceled"

    }
    
    
}