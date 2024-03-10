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
