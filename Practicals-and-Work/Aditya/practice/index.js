// write a program to convert an array of objects to a json and then parse it back to an array of objects

const arr = [{ name: "John", age: 30 }, { name: "Jane", age: 25 }, { name: "Bob", age: 35 }];

const json = JSON.stringify(arr);
console.log("json: ", json);

const prettyJson = JSON.stringify(arr, null, 5);
console.log("prettyJson: ", prettyJson);

const parsedArr = JSON.parse(json);
console.log("parsedArr: ", parsedArr);
