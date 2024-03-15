import { pow, calculateNecessaryBits } from "../modules/utils.js";

// Definition for Constants
const IP_NETWORK_INPUT = document.getElementById("ip-network");
const NUMBER_OF_HOST_INPUT = document.getElementsByClassName(
  "host-definition-input"
);
const IP_NETWORK_MESSAGE = document.getElementById("ip-network-message");
// const NOMBER_OF_HOST_MESSAGE = document.getElementById("ip-network-message");
const ADDING_HOST_BUTTON = document.getElementById("adding-host-btn");
const CALCULATE_SUBNETTING_BUTTON = document.getElementById(
  "calculate-subnetting-btn"
);

/**
 * Adds a host input field to a specified HTML element.
 **/
function addingHostInput() {
  let hostDefinitionDiv = document.getElementById("host-definition");
  let hostInput = document.createElement("input");

  // Host Input Configuration
  hostInput.type = "number";
  hostInput.name = "no-host";
  hostInput.id = "no-host";
  hostInput.className = "host-definition-input";
  hostInput.value = "100";
  hostInput.placeholder = "100";
  hostInput.min = "0";

  let brInput = document.createElement("br");
  hostDefinitionDiv.append(hostInput, brInput);
}

function calculateSubnetting() {
  let selectedIP = document.getElementById("ip-network").value;
  let hostDefinition = document.getElementsByClassName("host-definition");
  let ipNetworkSubnettingDiv = document.getElementById("ip-network-subnetting");
  let ipSubnettingTableCaption = document.getElementById(
    "ip-subnetting-table-caption"
  );

  // Showing IP Subnetting Div
  ipNetworkSubnettingDiv.style.display = "flex";

  // Modifing Table's Caption with selected IP
  ipSubnettingTableCaption.innerHTML = "Network IP: " + selectedIP;

  console.log(`IP: ${selectedIP}`);
  Array.from(hostDefinition).forEach((inputValue, index) => {
    console.log(
      `
      Index: ${index} 
      Value: ${inputValue.value} 
      Needed Bits: ${calculateNecessaryBits(parseInt(inputValue.value))} 
      Jumps: ${pow(9)}
      `
    );
  });
}

/**
 * Retrieves the IP network in decimal format from the specified input field.
 *
 * @returns {number[]} An array representing the IP network in decimal format.
 **/
function getIPNetworkInDecimal() {
  let ipNetworkValue = IP_NETWORK_INPUT.value;
  let ipNetworkArray = ipNetworkValue.split(".");
  return ipNetworkArray.map((bit) => parseInt(bit));
}

/**
 * Checks if the length of the IP network is correct (should be 4 octets).
 *
 * @param {number[]} ipNetwork - An array representing the IP network in decimal format.
 * @returns {boolean} True if the length is correct, false otherwise.
 **/
function isIPNetworkLengthCorrect(ipNetwork) {
  return ipNetwork.length === 4;
}

/**
 * Checks if each bit of the IP network is within the valid range (0-255).
 *
 * @param {number[]} ipNetwork - An array representing the IP network in decimal format.
 * @returns {boolean} True if all bits are within the valid range, false otherwise.
 **/
function isBitInRange(ipNetwork) {
  return ipNetwork.every((bit) => bit < 256 && bit > -1);
}

/**
 * Checks if all host definition inputs are valid.
 *
 * @returns {boolean} True if all inputs are valid, false otherwise.
 **/
function areHostDefinitionValid() {
  return Array.from(NUMBER_OF_HOST_INPUT).every(
    (input) =>
      !isNaN(parseInt(input.value)) &&
      parseInt(input.value) >= 1 &&
      input.value !== ""
  );
}

// Adding Event Listeners to Buttons
ADDING_HOST_BUTTON.addEventListener("click", addingHostInput);
CALCULATE_SUBNETTING_BUTTON.addEventListener("click", calculateSubnetting);

// Adding Event Listeners to Inputs
IP_NETWORK_INPUT.addEventListener("keyup", () => {
  let ipNetwork = getIPNetworkInDecimal();
  console.log(isBitInRange(ipNetwork));
  console.log(isIPNetworkLengthCorrect(ipNetwork));
  let isValidIPNetwork =
    isBitInRange(ipNetwork) && isIPNetworkLengthCorrect(ipNetwork);
  console.log(ipNetwork);
  if (!isValidIPNetwork) {
    IP_NETWORK_MESSAGE.innerHTML = "Bad IP Network";
  } else {
    IP_NETWORK_MESSAGE.innerHTML = "";
  }
});

Array.from(NUMBER_OF_HOST_INPUT).forEach((input) => {
  input.addEventListener("input", () => {
    console.log(`Valor de host: ${input.value}`);
    let value = parseInt(input.value);
    if (value < 1) {
      input.value = 1;
    }
  });
});

document.body.addEventListener("input", () => {
  if (areHostDefinitionValid()) {
    CALCULATE_SUBNETTING_BUTTON.disabled = false;
  } else {
    CALCULATE_SUBNETTING_BUTTON.disabled = true;
  }
});
