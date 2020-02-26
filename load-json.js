require("dotenv").config();

const fs = require("fs");
const fetch = require("node-fetch");
const parse = require("csv-parse/lib/sync");
const endpoints = {
  president: process.env.PRESIDENT_ENDPOINT,
  senate: process.env.SENATE_ENDPOINT,
  house: process.env.HOUSE_ENDPOINT
};

loadJSON();

async function loadJSON() {
  for (let key of Object.keys(endpoints)) {
    const csv = await fetch(endpoints[key]).then(r => r.text());
    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true
    });

    fs.writeFileSync(`./src/${key}.json`, JSON.stringify(records));
  }
}
