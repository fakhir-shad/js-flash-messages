const Cookies = require("js-cookie");

const create = (flash = {}) => {
  if (Object.values(flash).filter(obj => obj).length > 0) {
    const name = uniqueName();
    storeName(name);
    Cookies.set(name, flash);
  }
};

const uniqueName = (name = getName()) => {
  return Cookies.get(name) === undefined ? name : uniqueName(getName());
};

const getName = () => {
  return `jsFlash-${Date.now()}`;
};

const storeName = name => {
  const storedNames = Cookies.getJSON("jsFlashNames");
  const names = storedNames === undefined ? [] : storedNames;
  names.push(name);
  Cookies.set("jsFlashNames", names);
};

const get = () => {
  const storedFlash = Cookies.getJSON("jsFlashNames");
  if (storedFlash === undefined) {
    return [];
  } else {
    const flashes = storedFlash.map(flashName => {
      const flash = Cookies.getJSON(flashName);
      Cookies.remove(flashName);
      return flash;
    });
    Cookies.remove("jsFlashNames");
    return flashes;
  }
};

exports.create = create;
exports.get = get;
