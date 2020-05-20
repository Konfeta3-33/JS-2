const products = [
    { id: 1, title: "Notebook", price: 2000 },
    { id: 2, title: "Mouse", price: 20 },
    { id: 3, title: "Keyboard", price: 200 },
    { id: 4, title: "Gamepad", price: 50 },
];

const renderProduct = ({ title, price }) => {
    return `<div class="product-item">
                <img src="https://placeimg.com/300/200/nature" class="product-image" alt="image" width="300" height="200">
                <h3 class="product-title">${title}</h3>
                <p class="product-price">${price}</p>
                <button class="buy-btn">Добавить</button>
            </div>`;
};
const renderPage = (list) => {
    const productsList = list.map((item) => renderProduct(item));
    // console.log(productsList);
    document.querySelector(".products").innerHTML = productsList.join("");
};

renderPage(products);
