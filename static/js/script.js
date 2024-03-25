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
const IP_NETWORK_INPUT = document.getElementById("ip-network");
const NUMBER_OF_HOST_INPUT = document.getElementsByClassName(
  "host-definition-input"
);
const IP_NETWORK_MESSAGE = document.getElementById("ip-network-message");
const HOST_DEFINITION_DIV = document.getElementById("host-definition");
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
const IP_SUBNETTING_TABLE_BODY = document.querySelector(
  "#ip-subnetting-table tbody"
);

let isValidIPAddress = false;

/**
 * Adds a host input field to a specified HTML element.
 **/
function addingHostInput() {
  // Create a div container for the host input and delete button
  let hostContainer = document.createElement("div");
  hostContainer.classList.add("host-container");

  let hostInput = document.createElement("input");

  // Host Input Configuration
  hostInput.type = "number";
  hostInput.name = "no-host";
  //hostInput.id = "no-host";
  hostInput.className = "host-definition-input";
  hostInput.value = "100";
  hostInput.placeholder = "100";
  hostInput.min = "0";

  hostInput.addEventListener("change", () => {
    let value = parseInt(hostInput.value);
    if (value < 1 || isNaN(value)) {
      hostInput.value = 1;
    }
  });

  // Create a delete button
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.classList.add("delete-host-button");
  deleteButton.addEventListener("click", () => {
    hostContainer.remove(); // Remove the container when the button is clicked
  });

  // Append the host input and delete button to the container
  hostContainer.appendChild(hostInput);
  hostContainer.appendChild(deleteButton);

  // Append the container to the host definition div
  HOST_DEFINITION_DIV.appendChild(hostContainer);
}

/**
 * Calculates subnetting details based on the selected IP network and number of hosts.
 */
function calculateSubnetting() {
  let selectedIP = getIPNetworkInDecimal(IP_NETWORK_INPUT.value);
  let binaryIPNetwork = selectedIP.map((decimalValue) =>
    convertsToByte(decimalToBinary(decimalValue))
  );

  // Drops all tbody content of the table
  IP_SUBNETTING_TABLE_BODY.innerHTML = "";

  // Showing IP Subnetting Div
  IP_NETWORK_SUBNETTING_DIV.style.display = "flex";

  // Modifying Table's Caption with selected IP
  IP_SUBNETTING_TABLE_CAPTION.innerHTML =
    "Direccion IP: " + ipAddressToString(binaryToIPAddress(binaryIPNetwork));

  // For every defined host
  Array.from(NUMBER_OF_HOST_INPUT).forEach((input) => {
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
    let values = getTableValues(binaryIPNetwork, input);

    // Setting values for every row
    cellHost.appendChild(document.createTextNode(`${input.value}`));
    cellBits.appendChild(document.createTextNode(`${values.necessaryBits}`));
    cellTotalHost.appendChild(document.createTextNode(`${values.totalHost}`));
    cellNetworkIP.appendChild(document.createTextNode(`${values.networkIP}`));
    cellInitialIP.appendChild(document.createTextNode(`${values.initialIP}`));
    cellFinalIP.appendChild(document.createTextNode(`${values.finalIP}`));
    cellBroadcastIP.appendChild(
      document.createTextNode(`${values.broadcastIP}`)
    );
    cellPrefixLength.appendChild(
      document.createTextNode(`/${values.prefixLength}`)
    );
    cellSubnetMask.appendChild(document.createTextNode(`${values.subnetMask}`));
    cellWildcard.appendChild(document.createTextNode(`${values.wildcard}`));
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
    IP_SUBNETTING_TABLE_BODY.appendChild(row);

    // Setting binaryNetworkIP as nextNetworkIP
    binaryIPNetwork = values.nextNetworkIP;
  });

  // Adding table body to table
  IP_SUBNETTING_TABLE.appendChild(IP_SUBNETTING_TABLE_BODY);
}

/**
 * Retrieves values for subnetting table based on the provided binary IP network and input value.
 *
 * @param {number[][]} binaryIPNetwork - An array representing the binary IP network.
 * @param {HTMLInputElement} input - The input element containing the number of hosts.
 * @returns {object} An object containing subnetting table values.
 *
 **/
function getTableValues(binaryIPNetwork, input) {
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
  let subnetMaskArray = getSubnetMask(prefixLength);
  let subnetMask = ipAddressToString(binaryToIPAddress(subnetMaskArray));
  let wildcardArray = getWildcard(subnetMaskArray);
  let wildcard = ipAddressToString(binaryToIPAddress(wildcardArray));

  return {
    necessaryBits,
    totalHost,
    networkIP,
    initialIP,
    finalIP,
    broadcastIP,
    prefixLength,
    subnetMask,
    wildcard,
    nextNetworkIP,
  };
}

// Adding Event Listeners to Buttons
ADDING_HOST_BUTTON.addEventListener("click", addingHostInput);
CALCULATE_SUBNETTING_BUTTON.addEventListener("click", calculateSubnetting);

// Adding Event Listeners to Inputs
document.getElementById("number-of-host").addEventListener("change", () => {
  let value = parseInt(document.getElementById("number-of-host").value);
  if (value < 1 || isNaN(value)) {
    document.getElementById("number-of-host").value = 1;
  }
});

IP_NETWORK_INPUT.addEventListener("input", () => {
  let ipNetwork = getIPNetworkInDecimal(IP_NETWORK_INPUT.value);
  let isValidIPNetwork =
    isBitInRange(ipNetwork) && isIPNetworkLengthCorrect(ipNetwork);
  if (!isValidIPNetwork) {
    isValidIPAddress = false;
    IP_NETWORK_MESSAGE.innerHTML = "Direccion IP Invalida";
  } else {
    isValidIPAddress = true;
    IP_NETWORK_MESSAGE.innerHTML = "";
  }
});

document.body.addEventListener("input", () => {
  if (areHostDefinitionValid(NUMBER_OF_HOST_INPUT) && isValidIPAddress) {
    CALCULATE_SUBNETTING_BUTTON.disabled = false;
  } else {
    CALCULATE_SUBNETTING_BUTTON.disabled = true;
  }
});
