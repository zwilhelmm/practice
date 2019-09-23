"use strict";

// Practicing assorted Node-unique syntax.

const restOperator = () => {
  // Rest operator means "gather all parameters into an array."
  function sumAll(...args) {
    let sum = 0;

    for (let arg of args) sum += arg;

    return sum;
  }

  console.log("Printing a sum: ", sumAll(1, 2));
  console.log("Printing another: ", sumAll(1, 2, 3, 4, 5));
};

const spreadOperator = () => {
  const emp = {
    fullName: "Alice",
    occupation: "Dev",
    age: 30,
    salary: 100
  };

  const bill = {
    ...emp,
    fullName: "Bob",
    salary: 150
  };

  console.log("Printing emp: ", JSON.stringify(emp, null, 2));
  console.log("Printing Bill: ", JSON.stringify(bill, null, 2));
};

const main = () => {
  spreadOperator();
};

main();
