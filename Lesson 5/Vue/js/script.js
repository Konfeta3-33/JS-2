const API =
    "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: "#app",
    data: {
        catalog: {
            items: [],
            catalogUrl: "/catalogData.json",
            loading: false,
        },

        cart: {
            items: [],
            cartUrl: "/getBasket.json",
            show: false,
        },

        searchLine: "",
    },

    methods: {
        showCart() {
            this.cart.show = !this.cart.show;
        },

        getData(url) {
            return fetch(url)
                .then((data) => data.json())
                .catch((error) => this.catalog.loading = true);
        },

        findItem(search) {
            return this.catalog.items.filter((item) => {
                let searchString = search.toLowerCase();
                let searchItem = item.product_name.toLowerCase();
                return searchItem.startsWith(searchString);
            });
        },
    },

    computed: {
        displayItems() {
            return this.searchLine ? this.findItem(this.searchLine) : this.catalog.items;
        }
    },

    async mounted() {
        this.catalog.items = await this.getData(`${API}${this.catalog.catalogUrl}`);
        this.cart.items = await this.getData(`${API}${this.cart.cartUrl}`);
    },
});
