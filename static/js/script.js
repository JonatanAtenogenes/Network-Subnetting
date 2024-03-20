import {
  pow,
  calculateNecessaryBits,
  binaryToIPAddress,
  ipAddressToString,
} from "../modules/utils.js";

import {
  binaryAddition,
  binarySubtraction,
  convertsTo4Bytes,
  convertsToByte,
  decimalToBinary,
  getPrefixLength,
  getSubnetMask,
  getWildcard,
} from "../modules/binary_operations.js";

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
const IP_NETWORK_SUBNETTING_DIV = document.getElementById(
  "ip-network-subnetting"
);
const IP_SUBNETTING_TABLE_CAPTION = document.getElementById(
  "ip-subnetting-table-caption"
);
const IP_SUBNETTING_TABLE = document.getElementById("ip-subnetting-table");

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
  let selectedIP = getIPNetworkInDecimal();
  let binaryIPNetwork = selectedIP.map((decimalValue) =>
    convertsToByte(decimalToBinary(decimalValue))
  );

  // Creation of the body for the table
  let tbody = document.createElement("tbody");

  // Showing IP Subnetting Div
  IP_NETWORK_SUBNETTING_DIV.style.display = "flex";

  // Modifing Table's Caption with selected IP
  IP_SUBNETTING_TABLE_CAPTION.innerHTML =
    "IP Address: " + IP_NETWORK_INPUT.value;

  // For every defined host
  Array.from(NUMBER_OF_HOST_INPUT).forEach((input) => {
    let row = document.createElement("tr");
    let cellHost = document.createElement("td");
    let cellBits = document.createElement("td");
    let cellTotalHost = document.createElement("td");
    let cellNetworkIP = document.createElement("td");
    let cellInitialIP = document.createElement("td");
    let cellFinalIP = document.createElement("td");
    let cellBroadcastIP = document.createElement("td");
    let cellPrefixLength = document.createElement("td");
    let cellSubnetMask = document.createElement("td");
    let cellWildcard = document.createElement("td");

    // Calculate every necessary values
    let value = parseInt(input.value);
    let necessaryBits = calculateNecessaryBits(value);
    let totalHost = pow(necessaryBits);
    let networkIP = ipAddressToString(binaryToIPAddress(binaryIPNetwork));

    // Define next Network IP
    let nextNetworkIP = convertsTo4Bytes(
      binaryAddition(
        binaryIPNetwork,
        convertsTo4Bytes(decimalToBinary(totalHost))
      )
    );

    // Continue with table values
    let initialIP = ipAddressToString(
      binaryToIPAddress(
        convertsTo4Bytes(
          binaryAddition(binaryIPNetwork, convertsTo4Bytes(decimalToBinary(1)))
        )
      )
    );
    let finalIP = ipAddressToString(
      binaryToIPAddress(
        convertsTo4Bytes(
          binarySubtraction(nextNetworkIP, convertsTo4Bytes(decimalToBinary(2)))
        )
      )
    );
    let broadcastIP = ipAddressToString(
      binaryToIPAddress(
        convertsTo4Bytes(
          binarySubtraction(nextNetworkIP, convertsTo4Bytes(decimalToBinary(1)))
        )
      )
    );
    let prefixLength = getPrefixLength(necessaryBits);
    let subnetMaskArray = getSubnetMask(necessaryBits);
    let subnetMask = ipAddressToString(binaryToIPAddress(subnetMaskArray));
    let wildcardArray = getWildcard(subnetMaskArray);
    let wildcard = ipAddressToString(wildcardArray);

    // Setting values for every row
    cellHost.appendChild(document.createTextNode(`${value}`));
    cellBits.appendChild(document.createTextNode(`${necessaryBits}`));
    cellTotalHost.appendChild(document.createTextNode(`${totalHost}`));
    cellNetworkIP.appendChild(document.createTextNode(`${networkIP}`));
    cellInitialIP.appendChild(document.createTextNode(`${initialIP}`));
    cellFinalIP.appendChild(document.createTextNode(`${finalIP}`));
    cellBroadcastIP.appendChild(document.createTextNode(`${broadcastIP}`));
    cellPrefixLength.appendChild(document.createTextNode(`/${prefixLength}`));
    cellSubnetMask.appendChild(document.createTextNode(`${subnetMask}`));
    cellWildcard.appendChild(document.createTextNode(`${wildcard}`));
    row.append(
      cellHost,
      cellBits,
      cellTotalHost,
      cellNetworkIP,
      cellInitialIP,
      cellFinalIP,
      cellBroadcastIP,
      cellPrefixLength,
      cellSubnetMask,
      cellWildcard
    );
    tbody.appendChild(row);

    // Setting binaryNetworkIP as nextNetworkIP
    binaryIPNetwork = nextNetworkIP;
  });

  // Adding table body to table
  IP_SUBNETTING_TABLE.appendChild(tbody);
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
  let isValidIPNetwork =
    isBitInRange(ipNetwork) && isIPNetworkLengthCorrect(ipNetwork);
  if (!isValidIPNetwork) {
    IP_NETWORK_MESSAGE.innerHTML = "Bad IP Network";
  } else {
    IP_NETWORK_MESSAGE.innerHTML = "";
  }
});

Array.from(NUMBER_OF_HOST_INPUT).forEach((input) => {
  input.addEventListener("input", () => {
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
