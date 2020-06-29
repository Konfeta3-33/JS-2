const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(express.static("../"));

app.use(bodyParser.json());

app.get("/catalogData", (req, res) => {
    fs.readFile("catalogData.json", "utf-8", (err, data) => {
        res.send(data);
    });
});

app.get("/cartData", (req, res) => {
    fs.readFile("cartData.json", "utf-8", (err, data) => {
        res.send(data);
    });
});

app.post("/addToCart", (req, res) => {
    fs.readFile("cartData.json", "utf-8", (err, data) => {
        if (err) {
            res.send(`Что-то пошло не так: ${err}`);
        } else {
            const parseCart = JSON.parse(data);
            const cart = parseCart.contents;
            const item = req.body;

            if (item) {
                let findItem = cart.find((el) => el.id_product === item.id_product);
                if (findItem) {
                    findItem.quantity++;
                } else {
                    cart.push({ ...item, quantity: 1 });
                }
            }

            fs.writeFile("cartData.json", JSON.stringify(parseCart), (err) => {
                if (err) {
                    res.send(`Не удалось записать файл: ${err}`);
                } else {
                    res.send(parseCart);
                }
            });
        }
    });
});

app.delete("/deleteFromCart", (req, res) => {
    fs.readFile("cartData.json", "utf-8", (err, data) => {
        if (err) {
            res.send(`Что-то пошло не так: ${err}`);
        } else {
            const parseCart = JSON.parse(data);
            const item = req.body;

            if (item) {
                let findItem = parseCart.contents.find((el) => el.id_product === item.id_product);
                if (findItem.quantity > 1) {
                    findItem.quantity--;
                } else {
                    parseCart.contents = parseCart.contents.filter(
                        (el) => el.id_product !== item.id_product
                    );
                }
            }

            fs.writeFile("cartData.json", JSON.stringify(parseCart), (err) => {
                if (err) {
                    res.send(`Не удалось записать файл: ${err}`);
                } else {
                    res.send(parseCart);
                }
            });
        }
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000!");
});
