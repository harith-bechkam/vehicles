const APIResp = require("../utils/APIResp");
const mongoose = require("mongoose");
var fs = require('fs');
const reader = require('xlsx')
const products = require("../models/products");
const offers = require("../models/offers");
const helper = require('../utils/helper');

const Offerctrl = () => {

    const offer_upload = async (req, res) => {
        try {
            let data = []
            let ids = []
            const file = reader.readFile(req.files[0].destination + '/' + req.files[0].filename)

            const sheetNames = file.SheetNames

            for (let i = 0; i < sheetNames.length; i++) {
                const arr = reader.utils.sheet_to_json(file.Sheets[sheetNames[i]])

                arr.forEach(val => {
                    data.push(val)
                })
            }

            for (var val of data) {

                const product = await products.findOne({
                    $and: [
                        { product_name: val.product_name }
                    ]
                })
                // console.log(product._id)
                // const productExist = await offers.findOne({
                //     $and: [
                //         { product_id: product._id }
                //     ]
                // });
                // console.log(productExist)
                // if (!productExist) {
                // fs.rmSync(`/images/${req.files[0].filename}`)
                if (product) {

                    var offer = await offers.create({
                        product_id: product._id,
                        offer_name: val.offer_name,
                        offer_before_price: val.offer_before_price,
                        offer_percentage: val.offer_percentage,
                        offer_after_price: val.offer_after_price,
                        offer_img: val.offer_img,
                        offer_start_date: val.offer_start_date,
                        offer_end_date: val.offer_end_date
                    })
                    ids.push(offer._id)
                }
            }

            APIResp.getSuccessResult(ids, "offer added successfully", res)
        }
        catch (err) {
            console.log(err)
            APIResp.getINTERNALSERVERError(err, res);
        }
    }

    const special_offers = async (req, res) => {

        try {

            let data = await offers.aggregate([
                {
                    '$sort': {
                        'offer_percentage': -1
                    }
                }
            ])

            APIResp.getSuccessResult(data, "special offers listed out successfully", res)

        } catch (error) {
            APIResp.getINTERNALSERVERError(error, res);
        }

    }

    const offer_upload_text_format = async (req, res) => {
        try {
            let userInput = helper.getReqValues(req)


            let ids = []

            for (var val of userInput.offers) {

                const product = await products.findOne({
                    $and: [
                        { product_name: val.product_name }
                    ]
                })

                var offer = await offers.create({
                    product_id: product._id,
                    offer_name: val.offer_name,
                    offer_before_price: val.offer_before_price,
                    offer_percentage: val.offer_percentage,
                    offer_after_price: val.offer_after_price,
                    offer_img: val.offer_img,
                    offer_start_date: val.offer_start_date,
                    offer_end_date: val.offer_end_date
                })

                ids.push(offer._id)

            }
            APIResp.getSuccessResult(ids, "offers uploaded successfully stored", res)
        }
        catch (error) {
            console.log(error)
            APIResp.getINTERNALSERVERError(error, res);
        }
    }

    return {

        offer_upload,
        special_offers,
        offer_upload_text_format
    }
}
module.exports = Offerctrl();