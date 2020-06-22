Vue.component("cart", {
    props: ["cartItems", "visibility", "loading"],
    template: `
        <div class="cart-block basketPanel" v-show="visibility">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img" :cartItem="item">
                    </cart-item>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="2" scope="row">
                            Итого:
                        </th>
                        <td colspan="3">
                            <span class="total">{{ totalSum }}</span>
                            <i class="fas fa-ruble-sign"></i>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <loading class="cart-loading" :loading="loading">Нет данных</loading>
        </div>
    `,

    computed: {
        totalSum() {
            return this.cartItems.reduce((acc, item) => {return acc += item.quantity * item.price}, 0)
        },
    },
});

Vue.component("cart-item", {
    props: ["img", "cartItem"],
    template: `
        <tr>
            <td>{{ cartItem.id_product }}</td>
            <td><img :src="img" alt="some img" width="50" height="50"></td>
            <td>{{ cartItem.product_name }}</td>
            <td>$ {{ cartItem.price }} / each</td>
            <td>{{ cartItem.quantity }}</td>
            <td><button class="del-btn" @click="$parent.$emit('delete', cartItem)">&times;</button></td>
        </tr>`,
});
