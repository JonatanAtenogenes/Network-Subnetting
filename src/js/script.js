import {
  pow,
  calculateNecessaryBits,
  binaryToIPAddress,
  ipAddressToString,
} from "../modules/utils.js";

import {
  decimalToBinary,
  convertsToByte,
  convertsTo4Bytes,
} from "../modules/binary_operations.js";

import {
  binaryAddition,
  binarySubtraction,
  getSubnetMask,
  getPrefixLength,
  getWildcard,
  getIPNetworkInDecimal,
  isBitInRange,
  isIPNetworkLengthCorrect,
  areHostDefinitionValid,
} from "../modules/ip_address_operations.js";

// Definition for Constants
const ipNetworkInput = document.getElementById("ip-network");
const numberOfHost = document.getElementsByClassName("number-of-host");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");
const addingHostButton = document.getElementById("adding-host");
const calcSubnetting = document.getElementById("calculate-subnetting");
const ipNetworkSubnettingDiv = document.getElementById("ip-network-subnetting");
const tableCaption = document.getElementById("ip-subnetting-caption");
const table = document.getElementById("ip-subnetting");
const tableBody = document.getElementById("table-body");
const subnetMaskSelector = document.getElementById("subnet-mask-selector");
const hostContainer = document.getElementById("host-container");

let isValidIPAddress = false;
let hosts = [];
const errors = {
  invalidAddress: "Direccion IP invalida",
  maxHostReached: "Se ha superado el numero de host para la red solicitada",
};

// Create the values for the subnet mask selector
for (let index = 0; index < 32; index++) {
  const option = document.createElement("option");
  option.value = index + 1;
  option.text = `/${index + 1}`;
  subnetMaskSelector.appendChild(option);
}

/**
 * Adds a host input field to a specified HTML element.
 **/
function addingHostInput() {
  // Create a div container for the host input and delete button
  const innerHostContainer = document.createElement("div");
  innerHostContainer.classList.add("inner-host-container");
  const hostInput = document.createElement("input");

  // Host Input Configuration
  hostInput.type = "number";
  hostInput.name = "number-of-host";
  hostInput.classList.add("inputs", "number-of-host");
  hostInput.value = "100";
  hostInput.placeholder = "100";
  hostInput.min = "1";

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.classList.add("delete-host", "actions");
  deleteButton.addEventListener("click", () => innerHostContainer.remove());

  // Append the host input and delete button to the container
  innerHostContainer.appendChild(hostInput);
  innerHostContainer.appendChild(deleteButton);

  // Append the container to the host definition div
  hostContainer.appendChild(innerHostContainer);
}

/**
 * Calculates subnetting details based on the selected IP network and number of hosts.
 */
const calculateSubnetting = () => {
  sortDefinedHost();
  if (!areHostsInNetwork()) {
    setErrorMessage(errors.maxHostReached);
    hideTable();
    return;
  }

  if (!isPossibleToCalculateSubnetting()) {
    return;
  }

  clearErrorMessage();
  const subnetMaskValue = parseInt(subnetMaskSelector.value);
  let selectedIP = getIPNetworkInDecimal(ipNetworkInput.value);
  let networkIP = selectedIP.map((decimalValue) =>
    convertsToByte(decimalToBinary(decimalValue))
  );

  // Drops all tbody content of the table
  tableBody.innerHTML = "";

  // Showing IP Subnetting Div
  ipNetworkSubnettingDiv.style.display = "flex";

  // Modifying Table's Caption with selected IP
  tableCaption.textContent = `Direccion IP: ${ipAddressToString(
    binaryToIPAddress(networkIP)
  )} /${subnetMaskValue}`;

  // For every defined host
  hosts.forEach((host) => {
    let row = document.createElement("tr");
    let cellHost = document.createElement("td");
    cellHost.setAttribute("data-cell", "Host");
    let cellBits = document.createElement("td");
    cellBits.setAttribute("data-cell", "Bits");
    let cellTotalHost = document.createElement("td");
    cellTotalHost.setAttribute("data-cell", "Total Host");
    let cellNetworkIP = document.createElement("td");
    cellNetworkIP.setAttribute("data-cell", "IP de Red");
    let cellInitialIP = document.createElement("td");
    cellInitialIP.setAttribute("data-cell", "IP Inicial");
    let cellFinalIP = document.createElement("td");
    cellFinalIP.setAttribute("data-cell", "IP Final");
    let cellBroadcastIP = document.createElement("td");
    cellBroadcastIP.setAttribute("data-cell", "IP Broadcast");
    let cellPrefixLength = document.createElement("td");
    cellPrefixLength.setAttribute("data-cell", "Longitud Prefijo");
    let cellSubnetMask = document.createElement("td");
    cellSubnetMask.setAttribute("data-cell", "Mascara Subred");
    let cellWildcard = document.createElement("td");
    cellWildcard.setAttribute("data-cell", "Wildcard");

    // Calculate every necessary value
    let net = getTableValues(networkIP, host);

    // Setting values for every row
    cellHost.appendChild(document.createTextNode(host));
    cellBits.appendChild(document.createTextNode(net.bits));
    cellTotalHost.appendChild(document.createTextNode(net.hostInNetwork));
    cellNetworkIP.appendChild(document.createTextNode(net.ipAddress));
    cellInitialIP.appendChild(document.createTextNode(net.initialIPAddress));
    cellFinalIP.appendChild(document.createTextNode(net.lastIPAddress));
    cellBroadcastIP.appendChild(
      document.createTextNode(net.broadcastIPAddress)
    );
    cellPrefixLength.appendChild(
      document.createTextNode(`/${net.prefixLength}`)
    );
    cellSubnetMask.appendChild(document.createTextNode(net.subnetMask));
    cellWildcard.appendChild(document.createTextNode(net.wildcard));
    row.append(
      cellHost,
      cellBits,
      cellTotalHost,
      cellNetworkIP,
      cellInitialIP,
      cellFinalIP,
      cellBroadcastIP,
      cellSubnetMask,
      cellPrefixLength,
      cellWildcard
    );
    tableBody.appendChild(row);

    // Setting networkIP as nextIPAddress
    networkIP = net.nextIPAddress;
  });

  // Adding table body to table
  table.appendChild(tableBody);
};

/**
 * Retrieves values for subnetting table based on the provided binary IP network and input value.
 *
 * @param {number[][]} binaryIPNetwork - An array representing the binary IP network.
 * @param {number} host - The input element containing the number of hosts.
 * @returns {object} An object containing subnetting table values.
 *
 **/
const getTableValues = (networkIP, host) => {
  let bits = calculateNecessaryBits(host);
  let hostInNetwork = pow(bits);
  let ipAddress = ipAddressToString(binaryToIPAddress(networkIP));
  let nextIPAddress = getNextIPAddress(networkIP, hostInNetwork);
  let initialIPAddress = getInitialIPAddress(networkIP);
  let lastIPAddress = getLastIPAddress(nextIPAddress);
  let broadcastIPAddress = getBroadcastIPAddress(nextIPAddress);
  let prefixLength = getPrefixLength(bits);
  let subnetMaskArray = getSubnetMask(prefixLength);
  let subnetMask = ipAddressToString(binaryToIPAddress(subnetMaskArray));
  let wildcardArray = getWildcard(subnetMaskArray);
  let wildcard = ipAddressToString(binaryToIPAddress(wildcardArray));

  return {
    bits,
    nextIPAddress,
    hostInNetwork,
    ipAddress,
    initialIPAddress,
    lastIPAddress,
    broadcastIPAddress,
    prefixLength,
    subnetMask,
    wildcard,
  };
};

const getNextIPAddress = (ipAddress, hostInNetwork) => {
  return convertsTo4Bytes(
    binaryAddition(ipAddress, convertsTo4Bytes(decimalToBinary(hostInNetwork)))
  );
};

const getInitialIPAddress = (ipAddress) => {
  console.log(ipAddress);
  return ipAddressToString(
    binaryToIPAddress(
      convertsTo4Bytes(
        binaryAddition(ipAddress, convertsTo4Bytes(decimalToBinary(1)))
      )
    )
  );
};

const getLastIPAddress = (nextIPAddress) => {
  return ipAddressToString(
    binaryToIPAddress(
      convertsTo4Bytes(
        binarySubtraction(nextIPAddress, convertsTo4Bytes(decimalToBinary(2)))
      )
    )
  );
};

const getBroadcastIPAddress = (nextIPAddress) => {
  return ipAddressToString(
    binaryToIPAddress(
      convertsTo4Bytes(
        binarySubtraction(nextIPAddress, convertsTo4Bytes(decimalToBinary(1)))
      )
    )
  );
};

const sortDefinedHost = () => {
  hosts = [];
  Array.from(numberOfHost).forEach((input) =>
    hosts.push(parseInt(input.value))
  );
  hosts.sort((a, b) => b - a);
};

const areHostsInNetwork = () => {
  const selected = subnetMaskSelector.value;
  const intialValue = 0;
  const maxNumberOfHost = hosts.reduce(
    (accumulator, value) => pow(calculateNecessaryBits(value)) + accumulator,
    intialValue
  );
  return pow(32 - selected) >= maxNumberOfHost;
};

// Adding Event Listeners to Buttons
addingHostButton.addEventListener("click", addingHostInput);
calcSubnetting.addEventListener("click", calculateSubnetting);

// Adding Event Listeners to Inputs
ipNetworkInput.addEventListener("input", () => {
  let ipNetwork = getIPNetworkInDecimal(ipNetworkInput.value);
  let isValidIPNetwork =
    isBitInRange(ipNetwork) && isIPNetworkLengthCorrect(ipNetwork);
  if (!isValidIPNetwork) {
    isValidIPAddress = false;
    setErrorMessage(errors.invalidAddress);
  } else {
    isValidIPAddress = true;
    clearErrorMessage();
  }
});

const isPossibleToCalculateSubnetting = () => {
  return areHostDefinitionValid(numberOfHost) && isValidIPAddress;
};

const setErrorMessage = (message) => {
  errorContainer.style.display = "flex";
  errorMessage.textContent = message;
};

const clearErrorMessage = () => {
  errorContainer.style.display = "none";
};

const hideTable = () => {
  ipNetworkSubnettingDiv.style.display = "none";
};
