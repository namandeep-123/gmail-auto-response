import { readFileSync, writeFileSync } from "fs";

const dbFilePath = new URL("db.json", import.meta.url);
let data = null;

try {
  data = JSON.parse(readFileSync(dbFilePath, { encoding: "utf-8" }).toString());
} catch (err) {
  console.log("Creating new db.json file");
}

const db = {
  user: data?.users ?? [],
};

db.save = () => {
  writeFileSync(dbFilePath, JSON.stringify(db, null, 2), () => {
    console.log("Data saved");
  });
};

export default db;
