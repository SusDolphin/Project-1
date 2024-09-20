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
        fetchProductCategories(keyword)
        // if (keyword) {
        
        //     const url = 'https://amazon-product-info2.p.rapidapi.com/Amazon/search.php?keywords=kitchen%20cabinets&searchIndex=All';
        //     const options = {
        //         method: 'GET',
        //         headers: {
        //             'x-rapidapi-key': 'a1175446bfmsh8b8db5e8d350b1fp1df102jsnaf62ed7cb548',
        //             'x-rapidapi-host': 'amazon-product-info2.p.rapidapi.com'
        //         }
        //     };
            
        //     try {
        //         const response = await fetch(url, options);
        //         const result = await response.json();
        //         console.log(result);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    }

    async function fetchProductCategories(searchQuery) {
        const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${searchQuery}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`;
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
            //     const productEl=` <div class="product">
            //     <h3 class="product-name">${product.product_title || 'No Name'}</h3>
            //     <img class="product-image" src=${product.product_photo} alt="product image">
            //     <p class="star-rating">${product.product_star_rating}</p>
            //     <p class="product-price">${product.product_price}</p>
            // </div>`
            
                const productEl = document.createElement('div');
                productEl.classList.add('product');
                // productEl.href=product.product_url;
                const nameEl = document.createElement('h3');
                nameEl.textContent = product.product_title || 'No Name';
                nameEl.classList.add('product-name');
                const linkEl=document.createElement('a');
                linkEl.href=product.product_url
                linkEl.target= "_blank"
                linkEl.rel='noreferrer noopener'
                const imageEl = document.createElement('img');
                imageEl.classList.add('product-image');
                imageEl.src=product.product_photo
                const ratingEl=document.createElement('h3')
                ratingEl.classList.add('star-rating')
                ratingEl.textContent=product.product_star_rating
                const priceEl=document.createElement('h3')
                priceEl.classList.add('product-price')
                priceEl.textContent=product.product_price
                productEl.appendChild(nameEl);
                productEl.appendChild(linkEl);
                linkEl.appendChild(imageEl);
                productEl.appendChild(ratingEl);
                productEl.appendChild(priceEl);
                productsListDiv.appendChild(productEl);
            });
        } else {
            productsListDiv.textContent = 'No categories found.';
        }
    }
});

