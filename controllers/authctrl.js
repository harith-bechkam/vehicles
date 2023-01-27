const APIResp = require("../utils/APIResp");
const mongoose = require("mongoose");
// const offers = require("../models/offers");
const helper = require("../utils/helper");
const token = require("../utils/authtoken");
const authctrl = () => {
  const login = async (req, res) => {
    try {
      let userInput = helper.getReqValues(req);
      console.log(userInput);
      if (userInput.username == "harith" && userInput.password == "12345") {
        const tk = await token.createJwtToken(userInput);
        APIResp.getSuccessResult({ token: tk }, "logged in!", res);
      } else {
        APIResp.getErrorResult("please use same username and password", res);
      }
    } catch (err) {
      console.log(err);
      APIResp.getINTERNALSERVERError(err, res);
    }
  };

  return {
    login,
  };
};
module.exports = authctrl();
