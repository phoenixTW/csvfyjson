const csvToJson = require("csvtojson");
const fs = require("fs");

const csvFilePath = process.argv[process.argv.length - 2];
const outputJsonFile = process.argv[process.argv.length - 1];

const convertToJson = async (input, output) => {
  const jsonData = await csvToJson().fromFile(input);
  const filteredJson = jsonData
    .map(data => {
      const filteredData = {};
      Object.keys(data).forEach(key => {
        if (data[key] !== "") {
          filteredData[key] = data[key];
        }
      });
      return filteredData;
    })
    .filter(data => Object.keys(data).length !== 0);

  const stringyfyJson = JSON.stringify(filteredJson, null, 4);

  fs.writeFileSync(output, stringyfyJson, "utf-8");
  console.log("CSV file got exported successfully");
};
console.log(csvFilePath, outputJsonFile);
convertToJson(csvFilePath, outputJsonFile);
