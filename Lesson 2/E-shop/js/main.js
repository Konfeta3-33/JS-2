class ProductsList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProduct();
        this.render();
        this.sumOfAllProducts();
    }
    _fetchProduct() {
        this.goods = [
            { id: 1, title: "Notebook", price: 2000 },
            { id: 2, title: "Mouse", price: 20 },
            { id: 3, title: "Keyboard", price: 200 },
            { id: 4, title: "Gamepad", price: 50 },
        ];
    }

    sumOfAllProducts(guantity = 1) {
        let sum = 0;
        this.goods.forEach((item) => (sum += item.price * guantity));
        console.log(sum);
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
        this.id = product.id;
        this.img = img;
        this.title = product.title;
        this.price = product.price;
    }

    render() {
        return `<div class="product-item">
                <img alt="some img" src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}

class Cart {
    constructor() {}
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
