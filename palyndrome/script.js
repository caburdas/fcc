const button = document.getElementById("check-btn");
const input = document.getElementById("text-input");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  result.innerText = "";
  let text = input.value;
  if (!text) {
    alert("Please input a value");
    return;
  }
  let original = text.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  const reversed = original.split("").reverse().join("");
  result.innerText =
    reversed == original
      ? `${text} is a palindrome`
      : `${text} is not a palindrome`;
  input.value = "";
});
