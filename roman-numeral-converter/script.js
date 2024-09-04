const btn = document.getElementById("convert-btn");
const input = document.getElementById("number");
const outup = document.getElementById("output");

btn.addEventListener("click", () => {
  if (input.value === "") {
    outup.innerText = "Please enter a valid number";
    return;
  }
  let number = parseInt(input.value, 10);
  if (number < 0) {
    outup.innerText = "Please enter a number greater than or equal to 1";
    return;
  } else if (number >= 4000) {
    outup.innerText = "Please enter a number less than or equal to 3999";
    return;
  }
  output.innerText = integerToRoman(number);
});

function integerToRoman(num) {
  const romanValues = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let roman = "";
  for (let key in romanValues) {
    while (num >= romanValues[key]) {
      roman += key;
      num -= romanValues[key];
    }
  }
  console.log(roman);
  return roman;
}
