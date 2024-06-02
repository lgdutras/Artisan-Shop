document.addEventListener("DOMContentLoaded", function() {
    
    fetchCategories().then(categories => {fetchProducts(categories)});
    categoriesFilter()
});

const fetchProducts = async (categories) => {
    try {
        // Configurar Axios
        const api = axios.create({
            baseURL: 'https://fakestoreapi.com'
        });

        const response = await api.get('/products');
        if (response.data) {
            fetchCategories().then(categories => {displayProducts(response.data, categories)});
        }
    } catch (error) {
        console.error('Error while fetching products:', error);
    }
};

const fetchCategories = async () => {
    try {
        // Configurar Axios
        const api = await axios.create({
            baseURL: 'https://fakestoreapi.com'
        });

        const response_categories = await api.get('/products/categories');
        if (response_categories.data) {
            
            let categories = response_categories.data;
            return categories
        }
    } catch (error) {
        console.error('Error while fetching products:', error);
    }
};

function displayProducts(products, categories) {
    let product_list = document.querySelector('.product-list');
    let categories_list = categories

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

        categories_options_list_str = ``

        categories_list.forEach(category => {

            category_option_str = `<option value="${category}" ${category == product.category ? 'selected': ''} > ${category.toUpperCase()}</option>`
            categories_options_list_str += category_option_str

        })

        product_card = `
        <div class="product-card" id="${product.id}">
            <div class="card-header">
                <div class="card-btns">
                    <button id="delete_1" class="remove-btn card-btn" onclick="deleteItemCall(${product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E50000" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                        </svg>
                    </button>
                    <button id="edit_1" class="edit-btn card-btn" onclick="hideShowToggle(${product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#004AAD" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"></path>
                        </svg>
                    </button>
                </div>
                <img class="product-image" src=${product.image}>
            </div>
            <div class="product-data">
                <h2 class="product-name">${product.title}</h2>
                ${description_display}
                <p class="product-category">${product.category}</p>
                <p class="product-price">
                    <span class="currency">R$</span>
                    <span class="price-value">${product.price}</span>
                </p>
            </div>

            <div class="popup-form hidden" id="popup_form_${product.id}">
                <div class="form-group form-data">
                    <label for="name">Product Name</label>
                    <input id="name" type="text" class="input-field form-element" value="${product.title}"></input>
                    
                    <label for="price">Price</label>
                    <input id="price" type="text" class="input-field form-element" value="${product.price}"></input>
                    
                    <label for="description">Description</label>
                    <textarea rows=10 id="description" class="input-field form-element text-area">${product.description}</textarea>
                    
                    <label for="image link"></label>
                    <input id="image" type="text" class="input-field form-element" value="${product.image}"></input>
                    
                    <label for="category">Category</label>
                    <select name="category" id="category">
                        ${categories_options_list_str}
                    </select>
                </div>

                <div class="form-group form-buttons">
                    <button type="button" class="input-field form-element form-btn" onclick="editItem(${product.id})">Confirm</submit>
                    <button type="button" class="input-field form-element form-btn" onclick="hideShowToggle(${product.id})">Cancel</submit>
                </div>
            </div>
        </div>
        `;
        
        // Usar innerHTML para adicionar o HTML ao productList
        let product_card_exists = document.getElementById(`${product.id}`) != undefined

        if (product_card_exists) {

            product_card_to_set = document.getElementById(`${product.id}`);
            product_card_to_set.innerHTML = product_card

        } else {

            product_list.innerHTML += product_card;

        }
        
        
    });
};

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

};

const deleteItem = async(item_id) => {
    try {
        const api_delete = axios.create({
            baseURL: 'https://fakestoreapi.com'
        });

        let response_delete = await api_delete.delete(`/products/${item_id}`);
        if (response_delete.data) {

            let deleted_item = response_delete.data.id;
            let product_card = document.getElementById(`${deleted_item}`);
            
            product_card.remove();
        }
    } catch (error) {
        console.error('Error while deleting products:', error);
    }
};

function deleteItemCall(item_id) {
    
    let product = document.getElementById(`${item_id}`)
    let item = product.querySelector('.product-name').textContent

    if (confirm(`Are you sure you want to delete the item ${item}?`) == true) {

        deleteItem(item_id);

    } else {

        console.log(product)
        text = "deletion canceled"

    }
};

function hideShowToggle(item_id) {

    let edit_form = document.querySelector(`#popup_form_${item_id}`);
    edit_form.classList.toggle('hidden')
};

function editItem(item_id) {

    let card = document.getElementById(`popup_form_${item_id}`).getElementsByClassName('form-group form-data')[0];
    let title = card.querySelector('#name');
    let price = card.querySelector('#price');
    let description = card.querySelector('#description');
    let image = card.querySelector('#image');
    let category = card.querySelector('#category');
    
    edited_item_data = {
        'title': title.value,
        'price': price.value,
        'description': description.value,
        'image': image.value,
        'category': category.value
    }

    updateItem(item_id, edited_item_data, card);
};

const updateItem = async(item_id, update_data) => {
    
    try {
        api_update = axios.create({
            baseURL:'https://fakestoreapi.com'
        });

        let response_update = await api_update.patch(`/products/${item_id}`, update_data);

        if (response_update.data) {

            fetchCategories().then(categories => {displayProducts(Array(response_update.data), categories)});

        }
    } catch (error) {
        console.error('Error while updating product', error)
}};

