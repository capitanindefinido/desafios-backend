import express from "express"
import ProductManagerFile from "./components/ProductManager.js"
import { parse } from "path"

const app = express()
app.use(express.urlencoded({extended : true}))
const productos = new ProductManagerFile
const readProducts = await productos.readFileProducts() 

app.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)
})

app.get("/products/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productsById = allProducts.find(product => product.id === id)
    res.send(productsById)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Express por localhost ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error del servidor ${error}`))