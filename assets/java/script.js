document.addEventListener('DOMContentLoaded', async () => {
    const amazonSearchInput = document.getElementById('amazon-search');
    const searchAmazonBtn = document.getElementById('search-amazon-btn');
    const fetchCategoriesBtn = document.getElementById('fetch-categories-btn');
    const amazonProductsDiv = document.getElementById('amazon-products');
    const productsListDiv = document.getElementById('categories-list');
    const amazonForm=document.getElementById('amazon-form')

    amazonForm.addEventListener('submit', searchAmazonProducts);
    fetchCategoriesBtn.addEventListener('click', fetchProductCategories);

    async function searchAmazonProducts(event) {
        event.preventDefault()
        const keyword = amazonSearchInput.value.trim();
        alert(keyword)
        if (keyword) {
        
            const url = 'https://amazon-product-info2.p.rapidapi.com/Amazon/search.php?keywords=kitchen%20cabinets&searchIndex=All';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'a1175446bfmsh8b8db5e8d350b1fp1df102jsnaf62ed7cb548',
                    'x-rapidapi-host': 'amazon-product-info2.p.rapidapi.com'
                }
            };
            
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function fetchProductCategories() {
        const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '9dbfa7e9a0msh49bc7e008310dcep114c45jsn043854135b72',
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log('Categories Result:', result);
            displayProducts(result.data.products);
        } catch (error) {
            console.error('Error fetching categories:', error);
            productsListDiv.innerHTML = 'Error fetching categories.';
        }
    }

    function displayAmazonProducts(products) {
        amazonProductsDiv.innerHTML = '';

        if (products && Array.isArray(products)) {
            products.forEach(product => {
                const productEl = document.createElement('div');
                productEl.classList.add('product');

                const nameEl = document.createElement('h3');
                nameEl.textContent = product.title || 'No Name';

                const priceEl = document.createElement('p');
                priceEl.textContent = `Price: $${product.price || 'N/A'}`;

                const stockInBtn = document.createElement('button');
                stockInBtn.textContent = 'Stock In';
                stockInBtn.addEventListener('click', () => addToInventory(product.title, 1));

                productEl.appendChild(nameEl);
                productEl.appendChild(priceEl);
                productEl.appendChild(stockInBtn);

                amazonProductsDiv.appendChild(productEl);
            });
        } else {
            amazonProductsDiv.textContent = 'No products found.';
        }
    }

    function displayProducts(products) {
        productsListDiv.innerHTML = ``;

        if (products && Array.isArray(products)) {
            products.forEach(product => {
                const productEl = document.createElement('div');
                productEl.classList.add('product');

                const nameEl = document.createElement('h3');
                nameEl.textContent = product.product_title || 'No Name';
                nameEl.classList.add('product-name');
                const imageEl = document.createElement('img');
                imageEl.classList.add('product-image');
                imageEl.src=product.product_photo
                productEl.appendChild(nameEl);
                productEl.appendChild(imageEl);
                productsListDiv.appendChild(productEl);
            });
        } else {
            productsListDiv.textContent = 'No categories found.';
        }
    }
});

