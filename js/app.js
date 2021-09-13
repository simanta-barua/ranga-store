const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
//Loading product
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    //Destructuring product object

    const {id, title, price, description, category, image, rate } = product;
    
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = ` <div class="card h-100">
    <img src="${image}" class="card-img-top w-50 img-fluid" alt="Product Image">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">Category: ${category}</p>
      <h4>Price: $ ${price}</h4>
      <h5>Total-Rating : ${count} </h5>
      <h6>Average-rating: ${rate}</h6>
    </div>
    <div class="card-footer mx-auto">
    <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
    <button id="details-btn" onclick='showDetails(${price},${rate})' class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
    </div>
  </div>
 `
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  else {
    setInnerText("delivery-charge", 20);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
