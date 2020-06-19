const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        cart: {
            items: [],
            cartUrl: "/getBasket.json",
            cartImg: "https://placeimg.com/50/50/nature",
            addToCart: "/addToBasket.json",
            deleteFromCart: "/deleteFromBasket.json",
            show: false,
            loading: false,
        },
    },

    methods: {
        showCart() {
            this.cart.show = !this.cart.show;
        },

        getData(url) {
            return fetch(url).then((data) => data.json());
        },

        addProduct(item) {
            this.getData(`${API}${this.cart.addToCart}`).then((data) => {
                if (data.result === 1) {
                    let findItem = this.cart.items.find((el) => el.id_product === item.id_product);
                    if (findItem) {
                        findItem.quantity++;
                    } else {
                        this.cart.items.push({ ...item, quantity: 1 });
                    }
                }
            });
        },

        deleteProduct(item) {
            this.getData(`${API}${this.cart.deleteFromCart}`).then((data) => {
                if (data.result === 1) {
                    let findItem = this.cart.items.find((el) => el.id_product === item.id_product);
                    if (findItem > 1) {
                        findItem.quantity--;
                    } else {
                        this.cart.items = this.cart.items.filter(
                            (item) => item.id_product != findItem.id_product
                        );
                    }
                }
            });
        },
    },

    async mounted() {
        try {
            this.cart.items = await this.getData(`${API}${this.cart.cartUrl}`).then(
                (cartItems) => cartItems.contents
            );
        } catch {
            this.cart.loading = true;
        }
    },
});
