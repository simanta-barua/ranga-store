
// fetch url and load data 
const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));
  };
  loadProducts();
  
  // show all product in UI 
  const showProducts = (products) => {
    const allProducts = products.map((pd) => pd); 
    for (const product of allProducts) {
      // get image of every product
      const images = product.image;
      // create a div for every product 
      const div = document.createElement("div");
      // div.classList.add("product");
      div.innerHTML = `<div class="single-product">
        <div>
      <img class="product-image" src=${images}></img>
        </div>
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p> 
            <h5>Rating:<span id="${product.id}"></span><span class="text-danger fw-bold fs-4">(${product.rating.rate})</h5>
            <h5>Rating Count:<span class="text-success fw-bold fs-4">${product.rating.count}</span></h5>
            <h2>Price: $ ${product.price}</h2>
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
            <button onclick="showDetails('${product.description}')" id="details-btn" class="btn btn-danger">Details</button>
        </div> 
        `;
        
      document.getElementById("all-products").appendChild(div);
      dynamicRating(product.id,product.rating.rate)
    }
  };
  
  //  show star rating  with dynamic stars
  
  const dynamicRating =(ratingId,stars)=>{
      let star = parseFloat(stars);
      let i = parseInt(ratingId);
      if(star > 1 && star < 2){
        document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star-half-alt text-danger"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      }
      else if(star > 2 && star < 3){
        document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star-half-alt text-danger"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      }
      else if(star > 3 && star < 4){
        document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star-half-alt text-danger"></i><i class="far fa-star"></i>';
      }
      else if(star > 4 && star < 5){
        document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star-half-alt text-danger"></i>';
      }
      else if(star=== 1){
        document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      }
      else if(star=== 2){
      document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      }
      else if(star=== 3){
      document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      }
      else if(star=== 4){
      document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="far fa-star"></i>';
      }
      else if(star=== 5){
      document.getElementById(i).innerHTML='<i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i><i class="fas fa-star text-danger"></i>';
      }
  }
  
  // show details 
  
  const showDetails=(detail)=>{
    document.getElementById("details").textContent="";
    const div = document.createElement("div");
    div.innerHTML = `
      <div class=" bg-light p-5">
        <h3> Product details:  </h3>
        <p>${detail}</p>
    </div>
    `;
    document.getElementById("details").appendChild(div);
  };
  
  //  cart function update add cart value 
  
  let count = 0;
  const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);
  
    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
  };
  
  // function to  convert string value in float
  
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
    updateTotal();
  };
  
  //grandTotal update function
  const updateTotal = () => {
    const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
      getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
  };