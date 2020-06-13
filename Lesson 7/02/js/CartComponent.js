Vue.component("cart", {
    props: ["cartItems", "img", "visibility", "loading"],
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
                    <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cartItem="item">
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
            <td><img :src="img" alt="some img"></td>
            <td>{{ cartItem.product_name }}</td>
            <td>$ {{ cartItem.price }} / each</td>
            <td>{{ cartItem.quantity }}</td>
            <td><button class="del-btn" @click="$parent.$emit('delete', cartItem)">&times;</button></td>
        </tr>`,
});

// {{ item.quantity * item.price }}

// {
//     /* <div class="cart-item">
//             <div class="product-bio">
//                 <img :src="img" alt="Some img">
//                 <div class="product-desc">
//                     <div class="product-title">{{ cartItem.product_name }}</div>
//                     <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
//                     <div class="product-single-price">$ {{ cartItem.price }} each</div>
//                 </div>
//             </div>
//             <div class="right-block">
//                 <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
//                 <button class="del-btn" @click="$parent.$emit('delete', cartItem)">&times;</button>
//             </div>
//  </div>

// <div class="dropdown-menu dropdown-menu-right basketPanel">
//     <table class="table table-hover">
//         <thead>
//             <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Имя</th>
//                 <th scope="col">Цена</th>
//                 <th scope="col">Кол-во</th>
//                 <th scope="col"></th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr data-id="${id}" data-price="${price}" data-quantity="${quantity}">
//                 <td>${id}</td>
//                 <td>${name}</td>
//                 <td>${price}</td>
//                 <td>${quantity}</td>
//                 <td>${productRemoveButton.outerHTML}</td>
//             </tr>
//         </tbody>
//         <tfoot>
//             <tr>
//                 <th colspan="2" scope="row">
//                     Итого:
//                 </th>
//                 <td colspan="3">
//                     <span class="total">0</span>
//                     <i class="fas fa-ruble-sign"></i>
//                 </td>
//             </tr>
//         </tfoot>
//     </table>
// </div>; */
// }
