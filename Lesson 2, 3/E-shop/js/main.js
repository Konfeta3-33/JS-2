const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductsList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProduct().then((data) => {
            // console.log(data);
            this.goods = [...data];
            this.render();
        });
        this.sumOfAllProducts();
    }
    _getProduct() {
        return fetch(`${API}/catalogData.json`)
            .then((data) => data.json())
            .catch((error) => {
                console.log(error);
            });
    }

    sumOfAllProducts(guantity = 1) {
        let sum = 0;
        this.goods.forEach((item) => (sum += item.price * guantity));
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render());
            //block.innerHTML += productObj.render();
        }
    }
}

class ProductItem {
    constructor(product, img = "https://placehold.it/200x150") {
        this.id = product.id_product;
        this.img = img;
        this.title = product.product_name;
        this.price = product.price;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img alt="some img" src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}

class Cart {
    constructor(container = ".cart-open") {
        this.container = container;
        this.items = [];
        this.getCart().then((data) => {
            console.log(data);
            this.items = data.contents;
            // this.render();
        });
    }
    getCart() {
        return fetch(`${API}/getBasket.json`)
            .then((data) => data.json())
            .catch((error) => {
                console.log(error);
            });
    }
    addProductToCart() {}
    deleteProductFromCart() {}
    getTotalSum() {}
    render() {}
}

class CartItem {
    constructor() {}
    render() {}
}

let list = new ProductsList();
let cart = new Cart();
