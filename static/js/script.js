import { pow, calculateNecessaryBits } from "../modules/utils.js";

function addingHostInput() {
  let hostSection = document.getElementById("host-definition-section");
  let hostInput = document.createElement("input");

  // Host Input Configuration
  hostInput.type = "number";
  hostInput.name = "no-host";
  hostInput.id = "no-host";
  hostInput.className = "host-definition";

  let brInput = document.createElement("br");
  hostSection.append(hostInput, brInput);
}

function calculateSubnetting() {
  let selectedIP = document.getElementById("red-ip").value;
  let hostDefinition = document.getElementsByClassName("host-definition");
  let ipNetworkSubnettingDiv = document.getElementById("ip-network-subnetting");

  // Showing IP Subnetting Div
  ipNetworkSubnettingDiv.style.display = "flex";

  console.log(`IP: ${selectedIP}`);
  Array.from(hostDefinition).forEach((inputValue, index) => {
    console.log(
      `
      Index: ${index} - 
      Value: ${inputValue.value} - 
      Needed Bits: ${calculateNecessaryBits(parseInt(inputValue.value) + 2)} - 
      Jumps: ${pow(9)}
      `
    );
  });
}

// Adding Event Listeners to Buttons
document
  .getElementById("adding-host-btn")
  .addEventListener("click", addingHostInput);

document
  .getElementById("calculate-subnetting")
  .addEventListener("click", calculateSubnetting);
