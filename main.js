let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ADS');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let quantity = document.getElementById('quantity');
let category = document.getElementById('category');
let create = document.getElementById('create');
let mood = 'create'; // this show when "UpDate && Create"
let temp;

// console.log(title,price,taxes,ads,discount,total,quantity,category,create);
// ! get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}


// todo : create product 
let items;
if (localStorage.Product != null) { // contain product
    items = JSON.parse(localStorage.Product);
} else {
    items = [];
}
create.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        quantity: quantity.value,
        category: category.value,
    }
    if (title.value != ''
        && price.value != ''
        && category.value != ''
        && newProduct.quantity < 100) {
        if (mood === 'create') {
            //todo : count 
            if (newProduct.quantity > 1) {
                for (let i = 0; i < newProduct.quantity; i++) {
                    items.push(newProduct);
                }
            } else {
                items.push(newProduct);
            }
        } else { // mood == 'update
            items[temp] = newProduct;
            mood = 'create'
            create.innerHTML = 'Create'
            quantity.style.display = 'inline'
        }
        //! to clear inputs
        clearData();
    }





    //* to save data at localStorage
    localStorage.setItem('Product', JSON.stringify(items));

    

    //* Read Data
    showData();
}


//? clear inputs 
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML = '';
    discount.value = '';
    quantity.value = '';
    category.value = '';
}

//! Read 
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < items.length; i++) {
        table += `
        <tr>
            <td class="id">${i+1}</td>
            <td class="title">${items[i].title}</td>
            <td class="price">${items[i].price}</td>
            <td class="taxes">${items[i].taxes}</td>
            <td class="ads">${items[i].ads}</td>
            <td class="total">${items[i].total}</td>
            <td class="category">${items[i].category}</td>
            <td class="update"><button onclick="updateData(${i})" id="update">Update</button></td>
            <td class="delete"><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();


// todo: Delete
function deleteData(idItem) {
    items.splice(idItem, 1);
    localStorage.setItem('Product', JSON.stringify(items));
    showData();
}

// todo: Delete All
let btnDeleteAll = document.getElementById('deleteAll');
btnDeleteAll.onclick = function () {
    localStorage.clear();
    items.splice(0, items.length);
    showData();
}


//* UpDate
function updateData(idItem) {
    title.value = items[idItem].title;
    price.value = items[idItem].price;
    taxes.value = items[idItem].taxes;
    ads.value = items[idItem].ads;
    discount.value = items[idItem].discount;
    getTotal();
    quantity.style.display = 'none';
    category.value = items[idItem].category;
    create.innerHTML = 'UpDate'
    mood = 'update'
    temp = idItem;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

//! Search 
let mood2 = 'title'; // this show when "title && category"
function searchMood(id) {
    let search = document.getElementById('search');
    if (id == 'STitle') {
        mood2 = 'title';
        search.placeholder = 'Search By Title';
    } else {
        mood2 = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (mood2 == 'title') {
        for (let i = 0; i < items.length; i++) {
            if (items[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td class="id">${i}</td>
                        <td class="title">${items[i].title}</td>
                        <td class="price">${items[i].price}</td>
                        <td class="taxes">${items[i].taxes}</td>
                        <td class="ads">${items[i].ads}</td>
                        <td class="total">${items[i].total}</td>
                        <td class="category">${items[i].category}</td>
                        <td class="update"><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td class="delete"><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
            }
        }
    }

    else {
        for (let i = 0; i < items.length; i++) {
            if (items[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td class="id">${i}</td>
                        <td class="title">${items[i].title}</td>
                        <td class="price">${items[i].price}</td>
                        <td class="taxes">${items[i].taxes}</td>
                        <td class="ads">${items[i].ads}</td>
                        <td class="total">${items[i].total}</td>
                        <td class="category">${items[i].category}</td>
                        <td class="update"><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td class="delete"><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//! Clean Data













