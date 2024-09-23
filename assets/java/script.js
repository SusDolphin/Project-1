document.addEventListener('DOMContentLoaded', async () => {
    const amazonSearchInput = document.getElementById('amazon-search');
    const fetchCategoriesBtn = document.getElementById('fetch-categories-btn');
    const productsListDiv = document.getElementById('categories-list');
    const amazonForm=document.getElementById('amazon-form')

    amazonForm.addEventListener('submit', searchAmazonProducts);
    fetchCategoriesBtn.addEventListener('click', fetchProductCategories);

    async function searchAmazonProducts(event) {
        event.preventDefault()
        const keyword = amazonSearchInput.value.trim();
        fetchProductCategories(keyword)
        // if (keyword) {
        
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


    function displayProducts(products) {
        productsListDiv.innerHTML = ``;

        if (products && Array.isArray(products)) {
            products.forEach(product => {
            
                const productEl = document.createElement('div');
                productEl.classList.add('product');
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

    document.addEventListener('DOMContentLoaded', () => {
        const inventoryTableBody = document.querySelector('#inventory-table tbody');
        const stockInForm = document.getElementById('stock-in-form');
        const stockOutForm = document.getElementById('stock-out-form');
        const activityLog = document.getElementById('activity-log');

        
        let inventory = JSON.parse(localStorage.getItem('inventory'))|| {};
        function saveInventory() {
            localStorage.setItem('inventory', JSON.stringify(inventory));
        }

      

        


        // Stock In Form Submit Handler
        stockInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const itemName = document.getElementById('stock-in-item').value.trim();
            const quantity = parseInt(document.getElementById('stock-in-quantity').value.trim(), 10);

            if (itemName && quantity > 0) {
                stockItemIn(itemName, quantity);
                updateInventoryTable();
                logActivity(`Stocked in ${quantity} units of ${itemName}`);
                saveInventory();
            }

            // Reset the form
            stockInForm.reset();
        });

        // Stock Out Form Submit Handler
        stockOutForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const itemName = document.getElementById('stock-out-item').value.trim();
            const quantity = parseInt(document.getElementById('stock-out-quantity').value.trim(), 10);

            if (itemName && quantity > 0 && inventory[itemName] && inventory[itemName] >= quantity) {
                stockItemOut(itemName, quantity);
                updateInventoryTable();
                logActivity(`Stocked out ${quantity} units of ${itemName}`);
                saveInventory();
            } else {
                logActivity(`Cannot stock out ${quantity} units of ${itemName}. Not enough stock.`);
            }

           
            stockOutForm.reset();
        });

        // Function to handle stock in
        function stockItemIn(itemName, quantity) {
            if (inventory[itemName]) {
                inventory[itemName] += quantity;
            } else {
                inventory[itemName] = quantity;
            }
        }

        // Function to handle stock out
        function stockItemOut(itemName, quantity) {
            if (inventory[itemName]) {
                inventory[itemName] -= quantity;
                if (inventory[itemName] < 0) {
                    inventory[itemName] = 0; 
                }
            }
        }

        // Function to delete an item from inventory
        function deleteItem(itemName) {
            if (inventory[itemName]) {
                delete inventory[itemName];  
                updateInventoryTable();      
                logActivity(`Deleted ${itemName} from inventory.`);
                saveInventory();
            }
        }

        // Function to update the inventory table
        function updateInventoryTable() {
            inventoryTableBody.innerHTML = ''; 

            for (const itemName in inventory) {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = itemName;

                const quantityCell = document.createElement('td');
                quantityCell.textContent = inventory[itemName];

                const actionCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('button', 'is-danger');
                deleteButton.addEventListener('click', () => {
                    deleteItem(itemName); 
                });

                actionCell.appendChild(deleteButton);

                row.appendChild(nameCell);
                row.appendChild(quantityCell);
                row.appendChild(actionCell);

                inventoryTableBody.appendChild(row);
            }
        }

        // Function to log activity
        function logActivity(message) {
            const logEntry = document.createElement('li');
            logEntry.textContent = `${new Date().toLocaleString()}: ${message}`;
            activityLog.appendChild(logEntry);
           
        }
        
        updateInventoryTable();
    });
    document.addEventListener('DOMContentLoaded', () => {
        const shipmentForm = document.getElementById('shipment-form');
        const trackingResultDiv = document.getElementById('tracking-result');
    
        shipmentForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const trackingNumber = document.getElementById('tracking-number').value.trim();
    
            if (trackingNumber) {
                trackShipment(trackingNumber);
            }
        });
    
        async function trackShipment(trackingNumber) {
            const url = `https://backtrack.p.rapidapi.com/v1/track/${trackingNumber}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'a1175446bfmsh8b8db5e8d350b1fp1df102jsnaf62ed7cb548',
                    'x-rapidapi-host': 'backtrack.p.rapidapi.com'
                }
            };
        
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                displayTrackingResult(result.return_value);
                console.log(result);
            } catch (error) {
                console.error('Error tracking shipment:', error);
                trackingResultDiv.innerHTML = 'Error tracking shipment.';
            }
        }
        
        function displayTrackingResult(result) {
            trackingResultDiv.innerHTML = ''; 
        
            if (result && result.success) {
                const {
                    carrier,
                    destination,
                    estimated_delivery,
                    summary,
                    tracking_number,
                    tracking_url
                } = result;
        
                // Create tracking details dynamically 
                const trackingDiv = document.createElement('div');
                trackingDiv.classList.add('tracking-details');
                
               
                const trackingNumberEl = document.createElement('h3');
                trackingNumberEl.textContent = 'Tracking Number: ';
                const trackingLinkEl = document.createElement('a');
                trackingLinkEl.href = tracking_url;
                trackingLinkEl.target = "_blank";
                trackingLinkEl.rel = "noreferrer noopener";
                trackingLinkEl.textContent = tracking_number;
                trackingNumberEl.appendChild(trackingLinkEl);
                trackingDiv.appendChild(trackingNumberEl);
         
                const carrierEl = document.createElement('h3');
                carrierEl.textContent = `Carrier: ${carrier}`;
                trackingDiv.appendChild(carrierEl);
        
                const statusEl = document.createElement('h3');
                statusEl.textContent = `Status: ${summary}`;
                trackingDiv.appendChild(statusEl);
        
                const destinationEl = document.createElement('h3');
                destinationEl.textContent = `Destination: ${destination}`;
                trackingDiv.appendChild(destinationEl);

                const estimatedDeliveryEl = document.createElement('h3');
                estimatedDeliveryEl.textContent = `Estimated Delivery: ${estimated_delivery || 'N/A'}`;
                trackingDiv.appendChild(estimatedDeliveryEl);

                // Append the trackingDiv to the main trackingResultDiv
                trackingResultDiv.appendChild(trackingDiv);
            } else {
                trackingResultDiv.textContent = 'No tracking information found.';
            }
        }
    });        