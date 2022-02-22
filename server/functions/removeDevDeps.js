const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8").toString());
delete pkg.devDependencies;
fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
