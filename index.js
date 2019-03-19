var Cookies = require("js-cookie");

function create(flash = {}) {
  if (Object.values(flash).filter(obj => obj).length > 0) {
    var name = uniqueName();
    storeName(name);
    Cookies.set(name, flash);
  }
}

function uniqueName(name = getName()) {
  return Cookies.get(name) === undefined ? name : uniqueName(getName());
}

function getName() {
  return `jsFlash-${Date.now()}`;
}

function storeName(name) {
  var storedNames = Cookies.getJSON("jsFlashNames");
  var names = storedNames === undefined ? [] : storedNames;
  names.push(name);
  Cookies.set("jsFlashNames", names);
}

function get() {
  var storedFlash = Cookies.getJSON("jsFlashNames");
  if (storedFlash === undefined) {
    return {};
  } else {
    var flashes = storedFlash.map(function(flashName) {
      var flash = Cookies.getJSON(flashName);
      Cookies.remove(flashName);
      return flash;
    });
    Cookies.remove("jsFlashNames");
    return flashes;
  }
}

module.exports = { create, get };
