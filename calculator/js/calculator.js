let basicOutput,
  cashOutput,
  bankOutput,
  lowOutput,
  midOutput,
  highOutput,
  basicComapreOutput,
  advancedComapreOutput,
  basicdurationOutput,
  durationOutput,
  loader,
  calculateText;

const inputs = {
  starting: null,
  savings: null,
};

const initBasicSwitches = () => {
  setTimeout(() => {
    scrollTo(0, 0);
  }, 100);
  inputs["starting"] = document.getElementById("starting-input");
  inputs["savings"] = document.getElementById("savings-input");

  inputs["starting"].addEventListener("input", (e) =>
    InputChangeHandle("starting", e.target.value)
  );

  inputs["savings"].addEventListener("input", (e) =>
    InputChangeHandle("savings", e.target.value)
  );
  const calculateButton = document.getElementById("calculate-button");

  calculateButton.addEventListener("click", CalculateClickHandle);
  calculateButton.addEventListener("touchend", CalculateClickHandle);

  const basicButtons = document.getElementsByClassName("basic-button");
  const advancedButtons = document.getElementsByClassName("advanced-button");
  [...basicButtons].forEach((basicButton) => {
    basicButton.addEventListener("click", (e) => ButtonClickHandle(e, "basic"));
    basicButton.addEventListener("touchend", (e) =>
      ButtonClickHandle(e, "basic")
    );
  });
  [...advancedButtons].forEach((advancedButton) => {
    advancedButton.addEventListener("click", (e) =>
      ButtonClickHandle(e, "advanced")
    );
    advancedButton.addEventListener("touchend", (e) =>
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
  loader = document.getElementsByClassName("loader")[0];
  calculateText = document.getElementById("calculate-text");

  InputChangeHandle("starting", inputs["starting"].value);
  InputChangeHandle("savings", inputs["savings"].value);

  CalculateClickHandle(null, true);
};

const inputValues = {
  savings: 0,
  starting: 0,
};

const formatNumber = (num) => {
  const numArray = [...num.toString()].reverse();
  let _result = "",
    _counter = 1;
  for (const numChar of numArray) {
    _result += numChar;
    if (_counter % 3 == 0 && _counter != 0 && _counter < numArray.length)
      _result += ",";
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

  CalculateClickHandle(null);
};

const InputChangeHandle = (name, value) => {
  const formattedInput = value.replace(/[^0-9.]/g, "");
  const parsedInput = parseFloat(formattedInput);
  const parsedValue = isNaN(parsedInput) ? 500 : parsedInput;
  inputs[name].value =
    inputs[name].value != "" ? formatNumber(parsedValue) : "";
  inputValues[name] = parsedValue;
};

const CalculateDeposit = (apr) => {
  // if(inputValues.starting * currentValue > 100000 ) return CalculateBigDeposit(apr);

  let amount = inputValues.starting;
  for (let i = 1; i <= currentValue * 12; i++) {
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

const CalculateClickHandle = (e, first = false) => {
  if (first) {
    CalculateHandle();
    return;
  }

  if (inputs["savings"].value == "") {
    inputs["savings"].value = 0;
    InputChangeHandle("savings", inputs["savings"].value);
  }
  if (inputs["starting"].value == "") {
    inputs["starting"].value = 0;
    InputChangeHandle("starting", inputs["starting"].value);
  }

  loader.classList.remove("hidden");
  calculateText.classList.add("hidden");
  setTimeout(() => {
    loader.classList.add("hidden");
    calculateText.classList.remove("hidden");

    CalculateHandle();
  }, 1500);
};

const CalculateHandle = () => {
  basicOutput.innerText = formatNumber(
    inputValues.savings * 12 * currentValue + inputValues.starting
  );
  cashOutput.innerText = basicOutput.innerText;

  bankOutput.innerText = formatNumber(CalculateDeposit(3));
  lowOutput.innerText = formatNumber(CalculateDeposit(5));
  midOutput.innerText = formatNumber(CalculateDeposit(7));
  highOutput.innerText = formatNumber(CalculateDeposit(10));

  advancedComapreOutput.innerText = midOutput.innerText;
  basicComapreOutput.innerText = basicOutput.innerText;
};
