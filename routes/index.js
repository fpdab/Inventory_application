var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("index", { title: "Express ;)" })
})

module.exports = router

/* 
const itemModel = require("../models/item")
const item = new itemModel({
  name: "x",
  description: "x",
  category: "x",
  price: 1,
  number_in_stock: 1,
  url: "hhhehehe",
})
await item.save() */
