let data = [];
const itemsPerPage = 6;
let currentPage = 1;

function renderItem(product) {
    const listItem = document.createElement("div");
    listItem.textContent = product.title;
    productList.appendChild(listItem);

    const imageItem = document.createElement("img");
    imageItem.src = product.image;
    listItem.appendChild(imageItem);

    const deleteItem = document.createElement("button");
    deleteItem.innerHTML = "&#x2715;";
    deleteItem.className = "btn";
    listItem.appendChild(deleteItem);
    const deleteBtns = document.querySelectorAll(".btn");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", deleteFunction);
    });

    const descItem = document.createElement("p");
    descItem.innerHTML = product.description;
    listItem.appendChild(descItem);

    const priceItem = document.createElement("h3");
    priceItem.innerHTML = `Price ${product.price} $`;
    listItem.appendChild(priceItem);
}

async function getAllFunc() {
    const res = await fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .catch(
            (error) => console.error("Произошла ошибка при получении товаров:", error)
        );
    data = res;
    renderPage(currentPage);
}

function renderPage(page) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const productsToDisplay = data.slice(startIndex, endIndex);
    productsToDisplay.forEach((product) => {
        renderItem(product);
    });
    renderPagination();
}

function renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(data.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.classList.add('buttonPage'); 
        pageButton.textContent = i; 
        pageButton.onclick = () => {
            currentPage = i; 
            renderPage(currentPage); 
        };
        paginationContainer.appendChild(pageButton); 
    }
}

function deleteFunction() {
    fetch("https://fakestoreapi.com/products/6", {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .then((json) => alert("Товар удален"))
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addBtnFunc);

function addBtnFunc() {
    fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
            title: document.querySelector("#title").value,
            price: parseFloat(document.querySelector("#price").value),
            description: document.querySelector("#description").value,
            category: document.querySelector("#category").value,
        }),
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .then((json) => alert("Товар добавлен"))
}

//---------------------
document.addEventListener("DOMContentLoaded", change);
function change() {
    select = document.getElementById("myCategory");
    value = select.options[select.selectedIndex].value;

    if (value === "Electronics") {
        fetch("https://fakestoreapi.com/products/category/electronics")
            .then((response) => response.json())
            .then((products) => {
                const productList = document.querySelector("#productList");
                productList.innerHTML = "";
                products.forEach((product) => {
                    renderItem(product);
                });
            })
            .catch((error) =>
                console.error("Произошла ошибка при получении товаров:", error)
            );
    }
    if (value === "Jewelery") {
        fetch("https://fakestoreapi.com/products/category/jewelery")
            .then((response) => response.json())
            .then((products) => {
                const productList = document.querySelector("#productList");
                productList.innerHTML = "";
                products.forEach((product) => {
                    renderItem(product);
                });
            })
            .catch((error) =>
                console.error("Произошла ошибка при получении товаров:", error)
            );
    }
    if (value === "Men") {
        alert("Нет такого каталога");
    }
    if (value === "Women") {
        alert("Нет такого каталога");
    }
    if (value === "myCategory") {
        getAllFunc();
    }
}

