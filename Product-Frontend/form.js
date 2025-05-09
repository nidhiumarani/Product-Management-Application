const URLParams = new URLSearchParams(window.location.search);
const product_id = URLParams.get('id');

if(product_id) {
    populateForm(product_id);
}

async function populateForm(id) {
    let url = `http://localhost:3000/api/products/${id}`
     const response = await fetch(url);
     if(!response.ok) {
        alert("fetched to load the product data");
        return;
     }
     const product = await response.json();
     console.log("response ---> ", product)

     // fetching corroesponding name and description for perticular ID 
     document.getElementById("productName").value = product.name;
     document.getElementById("productDescription").value = product.description
}
// creating card 
async function createCard() {
    // fetch name and description from UI
    let name = document.getElementById("productName").value;
    let description = document.getElementById("productDescription").value;

    let data = {
        "name": name,
        "description": description
    }
    
    // check if any parameters are there
    const URLParams = new  URLSearchParams(window.location.search);
    const product_id = URLParams.get('id');

    let url = 'http://localhost:3000/api/products';
    let method = 'POST'

    // call API with product ID
    if(product_id) {
        url = `http://localhost:3000/api/products/${product_id}`;
        method = 'PUT';
    }

    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, options);
    // console.log('response -->', response);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('responseData -->', responseData);
    // back to main window
    window.location.href='dashBoard.html';
    return responseData;   
}
