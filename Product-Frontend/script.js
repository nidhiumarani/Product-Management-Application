//displaying products
const productGrid = document.getElementById("productGrid");

// displaying all the products 
async function displayProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            console.log("Check")
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        // console.log('products -->', products);

        productGrid.innerHTML = '';

        // create seperate div for each products 
        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            //add product details
            card.innerHTML = ` 
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <button onclick="editProduct('${product._id}')">Edit</button>
        <button onclick="deleteProduct('${product._id}')">Delete</button>`

            // append this sinlge card to product grid
            productGrid.appendChild(card);

            // hiding button in the main page
            document.getElementById("backButton").style.display = "none";

            //clear the search bar after getting back to main page 
            document.getElementById("search").value = "";
        });
    } catch (error) {
        console.log("Error fetching products", error);
        alert("Error fetching products");
    }
}

// edit products
async function editProduct(id) {
    //console.log("Click detected")
    window.location.href = `form.html?id=${id}`;
}

//deleting a product
async function deleteProduct(id) {
    const confirmDeletion = confirm("Are you sure you want to delete a product");
    if (confirmDeletion) {
        try {
            let url = `http://localhost:3000/api/products/${id}`;
            let method = 'DELETE';

            let options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const response = await fetch(url, options);
            if (response.ok) {
                location.reload();
            } else {
                alert("Failed to delete a product")
            }
        } catch (error) {
            console.log("Error--->", error);
        }
    }
}


// searching product by ID 
async function searchProduct(name) {
    const searchName = document.getElementById("search").value;

    if (!searchName) {
        alert("Please check product name");
        return;
    }

    //if id is found fetch that product
    try {
        const response = await fetch(`http://localhost:3000/api/products/searchByName/${searchName}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

        if (!data.products) {
            alert("Product not found")
            return
        }

        const products = data.products;

        // clear grid nad show only one product
        const productGrid = document.getElementById("productGrid");
        productGrid.innerHTML = ' ';

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            // show matching cards
            card.innerHTML = ` 
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <button onclick="editProduct('${product._id}')">Edit</button>
        <button onclick="deleteProduct('${product._id}')">Delete</button>`
            // append card
            productGrid.appendChild(card);

            // display button to get back to all products
            document.getElementById("backButton").style.display = "inline-block";


        });

    } catch (error) {
        alert("Product not found!, or please check product name");
        console.log("Error fetching required product", error);
    }

}

// call the display product function
displayProducts();