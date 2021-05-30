	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 
// products lactose and nut indicate whether they should appear if those restrictions are applied
var products = [
	{
		name: "Sea salted nut mix",
		lactose:  true ,
        nut:  false ,
        organic:  true ,
        price: 4.00
	},
	{
		name: "Brocoli",
		lactose:  true,
        nut:  true,
        organic:  true,
        price: 1.75
	},
	{
		name: "Cheese",
		lactose:  false,
        nut:  true,
        organic:  true,
        price: 3.25
	},
    {
		name: "Artifical yogurt",
		lactose:  false,
        nut:  true,
        organic:  false,
        price: 2.00
	},
    {
		name: "Chocolate covered almonds",
		lactose:  false,
        nut:  false,
        organic:  false,
        price: 1.00
	},
    {
		name: "Lab grown beef",
		lactose: true,
        nut: true,
        organic: false,
        price: 3.75
	},
    {
		name: "Almond milk",
		lactose: false,
        nut: false,
        organic: true,
        price: 2.00
	},
    {
		name: "Pecan cake",
		lactose: true,
        nut: false,
        organic: true,
        price: 3.20
	},
    {
		name: "Ice cream",
		lactose: false,
        nut: true,
        organic: false,
        price: 2.25
	},
    {
		name: "Popcorn",
		lactose: false,
        nut: true,
        organic: false,
        price: 3.20
	},
];


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price
// restriction is of the format [restrictionName,isRestriction]
function restrictListProducts(prods, restriction) {
	let product_names = [];
	for (const item of prods) {
		var addItem = true;
		for (const rest of restriction) {
			if (rest[1]) {
				var restName = rest[0];
				if (!item[restName]) {
					addItem = false;
					break;
				}
			}
		}
		if (addItem)
			product_names.push(item);	
	}

	product_names.sort((a,b) => a.price - b.price);
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}