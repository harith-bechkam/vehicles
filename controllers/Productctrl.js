const APIResp = require("../utils/APIResp");
const mongoose = require("mongoose");
var fs = require("fs");
const reader = require("xlsx");
const products = require("../models/products");
const offers = require("../models/offers");
const helper = require("../utils/helper");

const Productctrl = () => {
  const add = async (req, res) => {
    try {
      let userInput = helper.getReqValues(req);

      // for (var val of Object.entries(userInput)) {
      //     console.log(val)
      //     if (val[1] == '')
      //         return APIResp.getErrorResult(`${val[0]} shouldn't be empty`, res)
      // }
      if ([userInput].length != 5) {
        return APIResp.getErrorResult(`please fill all required fields`, res);
      }

      var product = await products.create({
        product_name: userInput.product_name,
        product_price: userInput.product_price,
        product_rating: userInput.product_rating,
        product_img: req.files[0].path.replace("//", "/").replace("public", ""),
        product_type: userInput.product_type,
      });

      APIResp.getSuccessResult(
        { productId: product._id },
        "products img successfully stored",
        res
      );
    } catch (error) {
      console.log(error);
      APIResp.getINTERNALSERVERError(error, res);
    }
  };

  const list = async (req, res) => {
    try {
      let result = {};
      let datas = await products.find({});

      result.productcount = await products.countDocuments({});
      result.products = datas;

      APIResp.getSuccessResult(result, "listed successfully", res);
    } catch (error) {
      APIResp.getINTERNALSERVERError(error, res);
    }
  };

  const update = async (req, res) => {
    try {
      let userInput = helper.getReqValues(req);

      if ([userInput].length != 5) {
        return APIResp.getErrorResult(`please fill all required fields`, res);
      }

      const product = await products.findOne({
        product_name: userInput.product_name,
      });

      let up = await products.updateOne(
        { _id: product._id },
        {
          $set: {
            product_name: userInput.product_name,
            product_price: userInput.product_price,
            product_rating: userInput.product_rating,
            product_type: userInput.product_type,
            isDeleted: userInput.isDeleted,
          },
        }
      );

      APIResp.getSuccessResult(up, "products img updated successfully", res);
    } catch (error) {
      APIResp.getINTERNALSERVERError(error, res);
    }
  };

  const Imgupdate = async (req, res) => {
    try {
      let userInput = helper.getReqValues(req);

      if ([userInput].length != 2) {
        return APIResp.getErrorResult(`please fill all required fields`, res);
      }

      let whereCodn = {};
      if (userInput.productId) {
        whereCodn._id = userInput.productId;
      }
      let up = await products.updateOne(whereCodn, {
        $set: {
          product_img: req.files[0].path
            .replace("//", "/")
            .replace("public", ""),
        },
      });

      APIResp.getSuccessResult(up, "products img updated successfully", res);
    } catch (error) {
      APIResp.getINTERNALSERVERError(error, res);
    }
  };

  const top_rated_products = async (req, res) => {
    try {
      let data = await products.aggregate([
        {
          $sort: {
            product_rating: -1,
          },
        },
      ]);
      data.forEach((val) => {
        val.product_img = `http://localhost:5000/${val.product_img}`;
      });
      APIResp.getSuccessResult(
        data,
        "top rated products listed out successfully",
        res
      );
    } catch (error) {
      APIResp.getINTERNALSERVERError(error, res);
    }
  };

  const best_products = async (req, res) => {
    try {
      let data = await products.aggregate([
        {
          $sort: {
            product_price: 1,
          },
        },
      ]);
      data.forEach((val) => {
        val.product_img = `http://localhost:5000/${val.product_img}`;
      });
      APIResp.getSuccessResult(
        data,
        "best products listed out successfully",
        res
      );
    } catch (error) {
      APIResp.getINTERNALSERVERError(error, res);
    }
  };

  const product_types = async (req, res) => {
    try {
      let userInput = helper.getReqValues(req);

      if ([userInput].length != 1) {
        return APIResp.getErrorResult(`please fill required field`, res);
      }

      let data = await products.aggregate([
        {
          $match: {
            product_type: userInput.product_type,
          },
        },
      ]);
      data.forEach((val) => {
        val.product_img = `http://localhost:5000/${val.product_img}`;
      });
      APIResp.getSuccessResult(
        data,
        "products listed based on it's type successfully",
        res
      );
    } catch (err) {
      APIResp.getINTERNALSERVERError(err, res);
    }
  };

  return {
    list,
    add,
    Imgupdate,
    update,
    top_rated_products,
    best_products,
    product_types,
  };
};
module.exports = Productctrl();
