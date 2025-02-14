const fs = require("fs");
const mainInfo = require("../package.json");

const libPackage = "./package.dist.json";

fs.readFile(libPackage, function (error, data) {
    if (error) {
        throw error;
    }

    const text = data.toString();
    const libObj = JSON.parse(text);

    libObj.version = mainInfo.version;

    fs.writeFileSync(libPackage, JSON.stringify(libObj, undefined, 2), "utf8");

    console.log(`package.dist.json updated successfully to version ${mainInfo.version}`);

    fs.copyFileSync("./README.md", "./dist/README.md");
    fs.copyFileSync("./package.dist.json", "./dist/package.json");

    if (!fs.existsSync("./dist/scripts")) {
        fs.mkdirSync("./dist/scripts");
    }

    fs.copyFileSync("./scripts/install.js", "./dist/scripts/install.js");
});
