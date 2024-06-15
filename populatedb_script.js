#! /usr/bin/env node

console.log("This script populates some test data to your database.")

const Item = require("./models/item")
const Category = require("./models/category")

const items = []
const categories = []

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const mongoDB = `mongodb+srv://fpdab:${process.env.PASS}@inventory-application.zeifs8m.mongodb.net/?retryWrites=true&w=majority&appName=Inventory-Application`

main().catch((err) => console.log(err))

async function main() {
  console.log("Debug: About to connect")
  await mongoose.connect(mongoDB, { dbName: "db" })
  console.log("Debug: Should be connected?")
  await createCategories()
  await createItems()
  console.log("Debug: Closing mongoose")
  mongoose.connection.close()
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function categoryCreate(index, name, description, url) {
  const category = new Category({
    name: name,
    description: description,
    url: url,
  })

  await category.save()
  categories[index] = category
  console.log(`Added category: ${name}`)
}

async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  number_in_stock,
  url
) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
    url: url,
  })
  await item.save()
  items[index] = item
  console.log(`Added item: ${name}`)
}

async function createCategories() {
  console.log("Adding categories")
  await Promise.all([
    categoryCreate(0, "Groceries", "...", "https://"),
    categoryCreate(1, "Home", "...", "https://"),
    categoryCreate(2, "Wireless devices", "...", "https://"),
    categoryCreate(3, "Books", "...", "https://"),
  ])
}

async function createItems() {
  console.log("Adding items")
  await Promise.all([
    itemCreate(
      0,
      "Lavazza",
      "Cafe Barista Espresso Perfetto",
      "Groceries",
      29.99,
      999,
      "https://"
    ),
    itemCreate(
      1,
      "Gimber No.2 Brut",
      "Ginger Juice 700ml Bio",
      "Groceries",
      29.95,
      499,
      "https://"
    ),
    itemCreate(
      2,
      "Sustania",
      "Kitchen Bin 50l Anti-Odour",
      "Home",
      26.99,
      999,
      "https://"
    ),
    itemCreate(
      3,
      "Aoslen Headphones",
      "Reduction Noise Mic Screen LED HiFI Stereo Sound 42H Duration Play",
      "Wireless devices",
      19.99,
      999,
      "https://"
    ),
    itemCreate(
      4,
      "Votre Atention est votre superpouvoir, Fabien Olicard",
      "Dans ce livre, il vous propose de tester votre niveau.",
      "Books",
      18.95,
      99,
      "https://"
    ),
  ])
}
