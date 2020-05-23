let selectedAll = Array.from(document.querySelectorAll("input"));
// console.log(selectedItem);

class Hamburger {
    constructor(size, additionals) {
        this.getSize();
        this.changeForm();
        this.totalPrice = 0;
        this.totalCalories = 0;
        // this.calculateCalories();
    }
    getAdditionals() {
        return selectedAll.filter((item) => item.checked);
    }
    calculatePrice() {
        let selectedItem = this.getAdditionals();
        this.totalPrice = selectedItem.reduce((acc, item) => {
            return (acc += Number(item.dataset.price));
        }, 0);
    }
    calculateCalories() {
        let selectedItem = this.getAdditionals();
        this.totalCalories = selectedItem.reduce((acc, item) => {
            return (acc += Number(item.dataset.ccal));
        }, 0);
    }

    changeForm() {
        document
            .querySelector("form")
            .addEventListener("change", this.calculateCalories.bind(this));
        console.log("hi");
    }
}

let start = new Hamburger();
