const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`;
  const url = "products.json"
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
  //   div.innerHTML =`<div class="card" style="width: 18rem;">
  //   <img src="${product.image}" class="card-img-top" alt="...">
  //   <div class="card-body">
  //     <h5 class="card-title">${product.title}</h5>
  //     <p class="card-text">${product.category}</p>
  //     <a href="#" class="btn btn-primary">Go somewhere</a>
  //     <a href="#" class="btn btn-primary">Go somewhere</a>
  //   </div>
  // </div>`
    div.innerHTML = `<div class="single-product">
      <div>
      <img class="product-image" src="${product.image}"></img>
      </div>
      <div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <h3>Price: $ ${product.price}</h3>
      <h5>Rating:  ${product.rating}</h5>
      </div>
      <div class="buttons"><button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
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
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
