// const API =
//     "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        catalog: {
            items: [],
            catalogUrl: "/catalogData",
            loading: false,
        },

        cart: {
            items: [],
            cartUrl: "/cartData",
            addToCart: "/addToCart",
            deleteFromCart: "/deleteFromCart",
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

        sendRequest(method, url, data) {
            return fetch(url, {
                method: method,
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        },

        findItem(search) {
            return this.catalog.items.filter((item) => {
                let searchString = search.toLowerCase();
                let searchItem = item.product_name.toLowerCase();
                return searchItem.startsWith(searchString);
            });
        },

        addProduct(item) {
            this.sendRequest("POST", `${this.cart.addToCart}`, item)
                .then((data) => data.json())
                .then((data) => (this.cart.items = data.contents));
        },

        deleteProduct(item) {
            this.sendRequest("DELETE", `${this.cart.deleteFromCart}`, item)
                .then((data) => data.json())
                .then((data) => {
                    // console.log(data)
                    this.cart.items = data.contents;
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
            this.catalog.items = await this.getData(`${this.catalog.catalogUrl}`);
        } catch {
            this.catalog.loading = true;
        }
        try {
            this.cart.items = await this.getData(`${this.cart.cartUrl}`).then(
                (cartItems) => cartItems.contents
            );
        } catch {
            this.cart.loading = true;
        }
    },
});
