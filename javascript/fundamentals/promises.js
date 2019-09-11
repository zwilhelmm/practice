"use strict";

const main = () => {
  const generateRandom = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rand = Math.random() * 10;
        rand % 2 === 0
          ? resolve()
          : reject(
              new Error({
                message: "Generated an odd number."
              })
            );
      }, 3000);
    });
  };

  const getRand = generateRandom()
    .then(num => {
      console.log("Result: generated an even number: ", num);
    })
    .catch(err => {
      console.log("Result: generated an odd number: ", err);
    })
    .finally(res => {
      console.log("Res: ", res);
      console.log("Now closing the promise.");
    });

  console.log("getRand: ", getRand);
};

main();
