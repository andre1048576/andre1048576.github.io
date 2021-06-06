var chosenProducts = [];
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}
   
function changeTab(tabName) {
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	document.getElementById(tabName).style.display = "block";
	document.getElementById(tabName+"Tab").style.display = "block";
	
}
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos
function arrToString(arr) {
	
	var output = "(";
	for (const v of arr) {
		output += v;
		output += ", "
	}
	return output + ")";
}

var restrictions = [["lactose",false],["nut",false],["organic",false]];

function addSelection17(num) {
	if (!restrictions[num][1]) {
		createCancel(restrictions[num][0],num);
		restrictions[num][1] = true;
	}
	onSearchBar();
}

function removeSelection(elem,num) {
	restrictions[num][1] = false;
	elem.remove();
}

function populateListProductChoices(slct2) {
    var s2 = document.getElementById(slct2);
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, restrictions);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	for (i = 0; i < optionArray.length; i++) {
		var productName = optionArray[i].name;
		var productPrice = optionArray[i].price;
		// create the checkbox and add in HTML DOM
		var container = document.createElement("div");
		container.classList.add("rightContainer");
		var img = document.createElement("img");
		img.classList.add("right");
		img.src="assets/"+optionArray[i].name+".jpg";
		img.width=100;
		img.height=100;
		container.appendChild(img);
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName + " - " + productPrice.toFixed(2) + "$";
		checkbox.checked = chosenProducts.indexOf(productName) > -1;
		checkbox.classList.add("right");
		container.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName + " - " + productPrice.toFixed(2) + "$"));
		label.classList.add("right");
		container.appendChild(label);
		s2.appendChild(container);
		// create a breakline node and add in HTML DOM
	}
	changeTab('Products')  
}

function createCancel(name,slot) {
	var cancel = document.createElement("div");
	var txt = document.createElement("p");
	var cncBtn = document.createElement("button");
	var c = document.getElementById("right");
	txt.innerHTML=name;
	cncBtn.innerHTML="X"
	cancel.append(txt);
	cancel.append(cncBtn);

	cncBtn.onclick=function(){removeSelection(cancel,slot);}
	c.append(cancel);
	txt.classList.toggle("removalText");
	cncBtn.classList.toggle("removalBtn");
	cancel.classList.toggle("cancel");
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	chosenProducts = [];
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			var elemName = ele[i].value.split(" - ",1)[0];
			chosenProducts.push(elemName);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts) + "$"));
	changeTab('Cart')
}

// gotten from
// https://www.w3schools.com/howto/howto_js_search_menu.asp
function searchBar() {
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("button");
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function onSearchBar() {
	document.getElementById("myMenu").classList.toggle("show");
}