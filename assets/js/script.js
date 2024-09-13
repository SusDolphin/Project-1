const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Laptop&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '698712bb0bmsh02ee17ae12527f0p17442ajsnb1eee07c4329',
		'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}





const url = 'https://amazon-product-info2.p.rapidapi.com/amazon_review.php?asin=B0B2D77YB8';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '698712bb0bmsh02ee17ae12527f0p17442ajsnb1eee07c4329',
		'x-rapidapi-host': 'amazon-product-info2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}