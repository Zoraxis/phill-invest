let basicOutput,
  cashOutput,
  bankOutput,
  lowOutput,
  midOutput,
  highOutput,
  basicComapreOutput,
  advancedComapreOutput,
  basicdurationOutput,
  durationOutput;

const initBasicSwitches = () => {
  const inputIncome = document.getElementById("income-input");
  const inputSavings = document.getElementById("savings-input");

  inputIncome.addEventListener("change", (e) =>
    InputChangeHandle("savings", e.target.value)
  );

  inputSavings.addEventListener("change", (e) =>
    InputChangeHandle("savings", e.target.value)
  );
  document
    .getElementById("calculate-button")
    .addEventListener("click", CalculateClickHandle);

  const basicButtons = document.getElementsByClassName("basic-button");
  const advancedButtons = document.getElementsByClassName("advanced-button");
  [...basicButtons].forEach((basicButton) => {
    basicButton.addEventListener("click", (e) => ButtonClickHandle(e, "basic"));
  });
  [...advancedButtons].forEach((advancedButton) => {
    advancedButton.addEventListener("click", (e) =>
      ButtonClickHandle(e, "advanced")
    );
  });

  basicOutput = document.getElementById("basic-output");
  cashOutput = document.getElementById("cash-output");
  bankOutput = document.getElementById("bank-output");
  lowOutput = document.getElementById("low-output");
  midOutput = document.getElementById("mid-output");
  highOutput = document.getElementById("high-output");
  basicComapreOutput = document.getElementById("basic-compare");
  advancedComapreOutput = document.getElementById("advanced-compare");
  basicdurationOutput = document.getElementById("basic-duration-output");
  durationOutput = document.getElementById("duration-output");

  InputChangeHandle("income", inputIncome.value);
  InputChangeHandle("savings", inputSavings.value);

  CalculateClickHandle();
};

// window.addEventListener("load", () => {
//   initBasicSwitches();
// });

const inputValues = {
  savings: 0,
  income: 0,
};

const formatNumber = (num) => {
  const numArray = [...num.toString()].reverse();
  let _result = "",
    _counter = 1;
  for (const numChar of numArray) {
    _result += numChar;
    if (_counter % 3 == 0 && _counter != 0 && _counter < numArray.length)
      _result += ".";
    _counter++;
  }
  return [..._result].reverse().join("");
};

let currentValue = 5;

const ButtonClickHandle = (e, tag) => {
  const checkedElement = document.querySelector(
    `.advanced-button[aria-checked="true"]`
  );
  const mirroredCheckedElement = document.querySelector(
    `.basic-button[aria-checked="true"]`
  );
  checkedElement.setAttribute("aria-checked", "false");
  mirroredCheckedElement.setAttribute("aria-checked", "false");

  const _element = e.target.closest(`.${tag}-button`);
  currentValue = parseInt(_element.dataset.value);
  const mirroredTag = tag == "advanced" ? "basic" : "advanced";
  const mirroredElement = document.querySelector(
    `.${mirroredTag}-button[data-value="${currentValue}"]`
  );
  mirroredElement.setAttribute("aria-checked", "true");
  _element.setAttribute("aria-checked", "true");

  basicdurationOutput.innerText = currentValue;
  durationOutput.innerText = currentValue;

  CalculateClickHandle();
};

const InputChangeHandle = (name, value) => {
  const parsedInput = parseFloat(value);
  inputValues[name] = isNaN(parsedInput) ? 500 : parsedInput;
};

const CalculateDeposit = (apr) => {
  // if(inputValues.income * currentValue > 100000 ) return CalculateBigDeposit(apr);

  let amount = inputValues.savings;
  for (let i = 1; i < currentValue * 12; i++) {
    amount *= apr / 12 / 100 + 1;
    amount += inputValues.savings;
  }
  return amount.toFixed(0);
};

// const CalculateBigDeposit = (apr) => {
//   let amount = BigInt(inputValues.savings);
//   for (let i = 1; i < currentValue * 12; i++) {
//     amount =
//       (amount * BigInt(Math.round(apr))) / BigInt(12) / BigInt(100) + BigInt(1);
//     amount = amount + BigInt(Math.round(inputValues.savings));
//   }
//   return amount;
// };

const CalculateClickHandle = () => {
  basicOutput.innerText = formatNumber(inputValues.savings * 12 * currentValue);
  cashOutput.innerText = basicOutput.innerText;

  bankOutput.innerText = formatNumber(CalculateDeposit(3));
  lowOutput.innerText = formatNumber(CalculateDeposit(5));
  midOutput.innerText = formatNumber(CalculateDeposit(7));
  highOutput.innerText = formatNumber(CalculateDeposit(10));

  advancedComapreOutput.innerText = midOutput.innerText;
  basicComapreOutput.innerText = basicOutput.innerText;
};
