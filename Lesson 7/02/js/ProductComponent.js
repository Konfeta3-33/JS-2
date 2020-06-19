Vue.component("products", {
    props: ["products", "img"],
    template: `
        <div class="row">
            <product v-for="item of products"
                :key="item.id_product"
                :img="img"
                :product="item">
            </product>
        </div>`,
});

Vue.component("product", {
    props: ["product", "img"],
    template: `
        <div class="col-4">
            <div>{{product.product_name}}</div>
            <img
                :src="img"
                alt="some img"
                class="img-thumbnail" />
            <div>
                <span class="productPrice">{{product.price}}</span>
                <i class="fas fa-ruble-sign"></i>
            </div>
            <button
                type="button"
                class="btn btn-success mt-3 toBasketBtn"
                @click="$parent.$emit('add-product', product)">
                В корзину
            </button>
        </div>`,
});
