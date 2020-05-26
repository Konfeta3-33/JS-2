let selectedAll = Array.from(document.querySelectorAll("input"));
const buyButton = document.querySelector(".buy-btn");

class Hamburger {
    constructor() {
        this.changeForm();
        this.renderTable();
        this.clickByBuyButton();
    }

    getAdditionals() {
        return selectedAll.filter((item) => item.checked);
    }

    calculatePrice() {
        let selectedItem = this.getAdditionals();
        return selectedItem.reduce((acc, item) => {
            return (acc += Number(item.dataset.price));
        }, 0);
    }

    calculateCalories() {
        let selectedItem = this.getAdditionals();
        return selectedItem.reduce((acc, item) => {
            return (acc += Number(item.dataset.ccal));
        }, 0);
    }

    changeForm() {
        document.querySelector("form").addEventListener("change", this.renderTable.bind(this));
    }

    clickByBuyButton() {
        buyButton.addEventListener("click", this.handleBuyButtonClick.bind(this));
    }

    handleBuyButtonClick(event) {
        event.preventDefault();

        const selectedItems = this.getAdditionals();
        let name = selectedItems.map((item) => {
            return item.value;
        });

        alert("Ваш бургер в консоли!");
        console.log(
            `Вы выбрали: ${name.join(", ")}, на общую сумму: ${this.calculatePrice()} рублей.`
        );
    }

    renderTable() {
        const selectedItems = this.getAdditionals();

        const rows = selectedItems.map((item) => {
            const name = item.value;
            const price = Number(item.dataset.price);
            const ccal = Number(item.dataset.ccal);

            let row = new RenderRow(name, price, ccal);

            return row.render();
        });

        let totalRow = new RenderTotal(this.calculatePrice(), this.calculateCalories());

        let table = document.querySelector("table");
        table.innerHTML = rows.join("");
        table.insertAdjacentHTML("beforeend", totalRow.render());
    }
}

class RenderRow {
    constructor(name, price, ccal) {
        this.name = name;
        this.price = price;
        this.ccal = ccal;
    }

    render() {
        return `
        <tr>
        <td>${this.name}</td>
        <td>${this.price} руб.</td>
        <td>${this.ccal} ccal.</td>
        </tr>`;
    }
}

class RenderTotal {
    constructor(totalPrice, totalCalories) {
        this.totalPrice = totalPrice;
        this.totalCalories = totalCalories;
    }

    render() {
        return `
        <tr class="bold">
        <td>Total: </td>
        <td>${this.totalPrice} руб.</td>
        <td>${this.totalCalories} ccal.</td>
        </tr>`;
    }
}

let start = new Hamburger();
