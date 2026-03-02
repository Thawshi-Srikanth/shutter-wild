const fs = require("fs");
const path = require("path");

const publicCapturesPath = path.join(__dirname, "public/captures");

// We need to parse the ts file or just read the directories and match them up.
// Looking at the directories:
// 'Norway Winter', 'Autumn Norway', 'Sri Lanka', 'Poland Autumn', 'Poland Winter', 'India Tiger', 'Pantanal Jaguar'

const dirs = fs
  .readdirSync(publicCapturesPath)
  .filter((f) => fs.statSync(path.join(publicCapturesPath, f)).isDirectory());

const galleries = {};

for (const dir of dirs) {
  const files = fs
    .readdirSync(path.join(publicCapturesPath, dir))
    .filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f));
  galleries[dir] = files.map((f) => `/captures/${dir}/${f}`);
}

console.log(JSON.stringify(galleries, null, 2));
