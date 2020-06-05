const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        catalog: {
            items: [],
            catalogUrl: "/catalogData.json",
            catalogImg: "https://placeimg.com/200/150/nature",
            loading: false,
        },

        cart: {
            items: [],
            cartUrl: "/getBasket.json",
            cartImg: "https://placeimg.com/50/50/nature",
            addToCart: "/addToBasket.json",
            deleteFromCart: "/deleteFromBasket.json",
            show: false,
            loading: false,
        },

        searchLine: "",
    },

    methods: {
        showCart() {
            this.cart.show = !this.cart.show;
        },

        getData(url) {
            return fetch(url).then((data) => data.json());
        },

        findItem(search) {
            return this.catalog.items.filter((item) => {
                let searchString = search.toLowerCase();
                let searchItem = item.product_name.toLowerCase();
                return searchItem.startsWith(searchString);
            });
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

    computed: {
        displayItems() {
            return this.searchLine ? this.findItem(this.searchLine) : this.catalog.items;
        },
    },

    async mounted() {
        try {
            this.catalog.items = await this.getData(`${API}${this.catalog.catalogUrl}`);
        } catch {
            this.catalog.loading = true;
        }
        try {
            this.cart.items = await this.getData(`${API}${this.cart.cartUrl}`).then(
                (cartItems) => cartItems.contents
            );
        } catch {
            this.cart.loading = true;
        }
    },
});
