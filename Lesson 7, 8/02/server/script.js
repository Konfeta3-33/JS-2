const fs = require("fs");

fs.readFile("./catalogData.json", "utf-8", (err, data) => {
    const obj = JSON.parse(data);
    obj.push("New item from Node");

    fs.writeFile("./catalogData.json", JSON.stringify(obj), (err) => {
        console.log(err);
    });
});
