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

        product_is_new = product.title == "New Item"

        product_card = `
        <div class="product-card" id="${product.id}">
            <div class="card-header">
                <div class="card-btns">
                    <button id="delete" class="remove-btn card-btn" onclick="deleteItemCall(${product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#E50000" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                        </svg>
                    </button>
                    <button id="edit" class="edit-btn card-btn" onclick="hideShowToggle(${product.id})">
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

            <div class="popup-form ${product_is_new ? '' : 'hidden'}" id="popup_form_${product.id}">
                <div class="form-group form-data">
                    <label for="name">Product Name</label>
                    <input id="name" type="text" class="input-field form-element" value="${product.title}" required></input>
                    
                    <label for="price">Price</label>
                    <input id="price" type="text" class="input-field form-element" value="${product.price}" required></input>
                    
                    <label for="description">Description</label>
                    <textarea rows=10 id="description" class="input-field form-element text-area" required>${product.description}</textarea>
                    
                    <label for="image link"></label>
                    <input id="image" type="text" class="input-field form-element" value="${product.image}" required></input>
                    
                    <label for="category" required>Category</label>
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

            const card_to_replace = document.createElement('div');
            card_to_replace.innerHTML = product_card;

            product_card_to_set.replaceWith(card_to_replace)

        } else {

            product_list.insertAdjacentHTML('afterbegin', product_card)

        }
    });

    sortBy();
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
    
    if (item_id > 20) {

        let product_card = document.getElementById(item_id);
        product_card.remove();

    } else {
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

    if (edit_form.querySelector('#name').value == "New Item") {
        if (confirm('Are you sure you want discard the new item?') == true) {
            document.getElementById(item_id).remove();
        }
    } else {
        edit_form.classList.toggle('hidden')
    }
    
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

    all_items_filled = true

    for (let field in edited_item_data) {
        if (edited_item_data[field] == '') {

            all_items_filled = false
            alert(`${field} not filled, please, fill all fields before confirm`);

        };
      }
    if (all_items_filled) {
        updateItem(item_id, edited_item_data, card);
    }
    
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

function normalized(string) {
    
    if (typeof string !== 'string') {
        return '';
      }
      return string.replace(/['\s]/g, '');

};

function categoriesFilter() {

    let catalog_filter_buttons = document.getElementById('buttons-wrap')

    fetchCategories().then(function(categories) {
        categories.forEach(category => {
            catalog_filter_buttons.innerHTML += `<button id="${normalized(category)}" value="${normalized(category)}" class="button-categories-filter" onclick="filterCategory(${normalized(category)})">${category}</button>`;
        })
    })
    
};

function filterCategory(category) {

    const buttons = document.querySelectorAll('.buttons-wrap .button-categories-filter');
    
    buttons.forEach(button => {
        
        let current_category = normalized(button.getAttribute('value'));
        let category_to_select = normalized(category.innerText);
        let cards = document.querySelectorAll('.product-list .product-card');

        if (current_category == category_to_select) {

            let already_selected = button.classList.contains('selected')
            
            if (already_selected) {

                button.classList.toggle('selected');

                cards.forEach(card => {
                    card.classList.remove('hidden');
                })

            } else {

                button.classList.toggle('selected');
                
                cards.forEach(card => {

                    let card_category = normalized(card.querySelector('.product-category').innerText)
                    if (card_category != category_to_select) {
                        card.classList.add('hidden');
                    } else {
                        card.classList.remove('hidden');
                    }
                });
            }
        } else {
            
            button.classList.remove('selected');

        }
        
    })

};

function newItemOpen() {
    items = document.querySelectorAll('.product-card')
    let new_id = 0

    items.forEach(item => {
        let current_id = parseInt(item.id);

        if (current_id > new_id) {
            new_id = current_id;
        }
    });
    new_id ++
    
    product_list = document.querySelector('.product-list');

    product_names = Array.from(document.querySelectorAll('.product-name')).map(element => element.innerText);
    if (product_names.some(name => name == ('New Item'))) {
        alert('A new item are beeing created, finish the creation of the new item before initiate another one')
    } else {
        const new_item_data = {
            'title': 'New Item',
            'price': '',
            'description': '',
            'image': '',
            'category': ''
        }
        
        createProduct(new_id, new_item_data)
    }

}

const createProduct = async (item_id, new_item_data) => {
    try {
        // Configurar Axios
        const api_create = axios.create({
            baseURL: 'https://fakestoreapi.com'
        });

        const response = await api_create.post('/products', new_item_data);

        if (response.data) {
            
            let validated_item_data = {
                'id': item_id,
                'title': response.data.title,
                'price': response.data.price,
                'description': response.data.description,
                'image': response.data.image,
                'category': response.data.category
            }
            
            fetchCategories().then(categories => {displayProducts(Array(validated_item_data), categories)});
        }
    } catch (error) {
        console.error('Error while creating a new product:', error);
    }
};

function sortBy() {
    let criteria = document.querySelector('.sortby-selector').value;
    let product_list = document.querySelectorAll('.product-card');

    let sortable_items = [];

    product_list.forEach(product => {
        let id = product.getAttribute('id');
        let price = parseFloat(product.querySelector('.price-value').innerText.replace(/[^0-9.-]+/g,""));
        let category = product.querySelector('.product-category').innerText;
        sortable_items.push({ id, price, category, element: product });
    });

    if (criteria === 'price-value') {
        sortable_items.sort((a, b) => a.price - b.price);
    } else if (criteria === 'product-category') {
        sortable_items.sort((a, b) => a.category.localeCompare(b.category));
    }

    let container = document.querySelector('.product-list');
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    sortable_items.forEach(item => {
        container.appendChild(item.element);
    });

}