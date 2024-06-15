#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
)

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
  await mongoose.connect(mongoDB)
  console.log("Debug: Should be connected?")
  await createItems()
  await createCategories()
  console.log("Debug: Closing mongoose")
  mongoose.connection.close()
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
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

async function createItems() {
  console.log("Adding genres")
  await Promise.all([
    genreCreate(0, "Fantasy"),
    genreCreate(1, "Science Fiction"),
    genreCreate(2, "French Poetry"),
  ])
}

async function createCategories() {
  console.log("Adding authors")
  await Promise.all([
    authorCreate(0, "Patrick", "Rothfuss", "1973-06-06", false),
    authorCreate(1, "Ben", "Bova", "1932-11-8", false),
    authorCreate(2, "Isaac", "Asimov", "1920-01-02", "1992-04-06"),
    authorCreate(3, "Bob", "Billings", false, false),
    authorCreate(4, "Jim", "Jones", "1971-12-16", false),
  ])
}
