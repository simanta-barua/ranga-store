const loadProducts = () => {
  toggleSpinner("block");
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

//spinner toggle
const toggleSpinner = (displayStyle) => {
  const spinner = (document.getElementById("spinner").style.display = displayStyle);
};
// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    //Destructuring product object
    const {
      id,
      title,
      price,
      description,
      category,
      image,
      rating: { rate, count },
    } = product;
    const div = document.createElement("div");
    div.classList.add("col");
    //showing single product
    div.innerHTML = ` <div class="card  h-100">
  <img src="${image}" class="card-img-top w-50" alt="Product Image">
  <div class="card-body">
    <h5 class="card-title text-primary">${title}</h5>
    <div class="card-items">
    <p class="card-text text-muted">Category: ${category}</p>
    <h4>Price: $ ${price}</h4>
    <h5 >Total Rating : ${count} </h5>
    <h6>Average Rating:<span class="text-warning"> ${rate}</span></h6>
    </div>
  </div>
  <div class="card-footer text-center">
  <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="m-2  btn btn-outline-success"><i class="bi bi-cart4"> </i>Add to cart</button>
  <button id="details-btn" onclick="showDetails('${title}','${image}','${description}', ${price})"  class="m-2 btn btn-outline-danger ">
  <i class="bi bi-info-circle"> </i>Details</button>
  </div>
</div>
`;
    document.getElementById("all-products").appendChild(div);
    toggleSpinner("none");
  }

};
//add to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};
// get id and converter function
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

// update delivery charge and total TAX function
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
  //Default delivery Charge
  setInnerText("delivery-charge", 20);
};

//GrandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//Loading product
loadProducts();

//show Details
const showDetails = (title, image, description, price) => {
  document.getElementById("showDetails").textContent = "";
  const div = document.createElement("div");
  div.classList.add("row", "details");
  div.innerHTML = `
    <div class="col-4 "><img src="${image}" alt="" class="w-50"></div>
    <div class="col-8">
      <h3 class="text-primary">${title}</h3>
      <h4 class="text-warning">Price: $ ${price}</h4>
      <p>${description}</p>
  </div>`;
  document.getElementById("showDetails").appendChild(div);

}