const crypto = require("crypto");

// Encrypt
const encryptField = (str) => {
  const mykey = crypto.createCipher("aes-128-cbc", process.env.SECRET);
  let mystr = mykey.update(JSON.stringify(str), "utf8", "hex");
  mystr += mykey.final("hex");
  return mystr;
};

// Decrypt
const decryptField = (str) => {
  const mykey = crypto.createDecipher("aes-128-cbc", process.env.SECRET);
  var mystr = mykey.update(str, "hex", "utf8");
  mystr += mykey.final("utf8");
  return mystr;
};

const interceptor = (req, res, next) => {
  console.log("interceptor");
  let oldSend = res.send;
  res.send = function (data) {
    // convert to raw data
    data = JSON.parse(JSON.stringify(data));

    const isArray = Array.isArray(data);

    if (isArray) {
      // for update
      if (data.length === 1 && (data[0] === 0 || data[0] === 1)) {
        console.log("updated");
      } else {
        data = data.map((el) => {
          el.id = encryptField(el.id);
          return el;
        });
      }
    } else {
      console.log(data);
      data.id = encryptField(data.id);
    }
    res.send = oldSend; // set function back to avoid the 'double-send'
    return res.send(data); // just call as normal with data
  };
  next();
};

module.exports = {
  encryptField,
  decryptField,
  interceptor,
};
