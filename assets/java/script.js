document.addEventListener('DOMContentLoaded', async () => {
    const amazonSearchInput = document.getElementById('amazon-search');
    const searchAmazonBtn = document.getElementById('search-amazon-btn');
    const fetchCategoriesBtn = document.getElementById('fetch-categories-btn');
    const amazonProductsDiv = document.getElementById('amazon-products');
    const categoriesListDiv = document.getElementById('categories-list');
    const amazonForm=document.getElementById('amazon-form')

    amazonForm.addEventListener('submit', searchAmazonProducts);
    fetchCategoriesBtn.addEventListener('click', fetchProductCategories);

    async function searchAmazonProducts(event) {
        event.preventDefault()
        const keyword = amazonSearchInput.value.trim();
        alert(keyword)
        if (keyword) {
            // const url = `https://amazon-product-info2.p.rapidapi.com/Amazon/search.php?keywords=${encodeURIComponent(keyword)}&searchIndex=All`;
            // const options = {
            //     method: 'GET',
            //     headers: {
            //         'x-rapidapi-key': 'd2227509c4msh0e3b5a642d51cabp16ba4fjsn260f96984',
            //         'x-rapidapi-host': 'amazon-product-info2.p.rapidapi.com'
            //     }
            // };
            const url = 'https://amazon-product-info2.p.rapidapi.com/Amazon/search.php?keywords=laptop&searchIndex=All';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '9dbfa7e9a0msh49bc7e008310dcep114c45jsn043854135b72',
                    'x-rapidapi-host': 'amazon-product-info2.p.rapidapi.com'
                }
            };

            // try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log('Search Result:', result);
                displayAmazonProducts(result);
            // } catch (error) {
            //     console.error('Error fetching products:', error);
            //     amazonProductsDiv.innerHTML = 'Error fetching products.';
            // }
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
            displayProductCategories(result);
        } catch (error) {
            console.error('Error fetching categories:', error);
            categoriesListDiv.innerHTML = 'Error fetching categories.';
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

    function displayProductCategories(categories) {
        categoriesListDiv.innerHTML = '';

        if (categories && Array.isArray(categories)) {
            categories.forEach(category => {
                const categoryEl = document.createElement('div');
                categoryEl.classList.add('category');

                const nameEl = document.createElement('h3');
                nameEl.textContent = category.name || 'No Name';

                categoryEl.appendChild(nameEl);
                categoriesListDiv.appendChild(categoryEl);
            });
        } else {
            categoriesListDiv.textContent = 'No categories found.';
        }
    }
});

