require("dotenv").config();

const fs = require("fs");
const fetch = require("node-fetch");
const parse = require("csv-parse/lib/sync");
const endpoint = process.env.SPREADSHEET_ENDPOINT;

loadJSON();

async function loadJSON() {
  const csv = await fetch(endpoint).then(r => r.text());
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true
  });

  fs.writeFileSync(`./src/candidates.json`, JSON.stringify(records));
}
