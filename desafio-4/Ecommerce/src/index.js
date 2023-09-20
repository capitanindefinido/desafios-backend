import express from "express"
import ProductRouter from "./router/product.routes.js"
import CartRouter from "./router/carts.routes.js"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import ProductManager from "./controllers/ProductManager.js"
import { Server } from "socket.io"

const app = express()
const PORT = 4000
const product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor express Puerto ${PORT}`)
})

//Socket

const socketServer = new Server(httpServer)

socketServer.on("connection", socket => {
    console.log("Nuevo Cliente Conectado")
//------Recibir información del cliente----------//
    socket.on("message", data => {
        console.log(data)
    })
//-----------------------------------------------//

    socket.on("newProd", (newProduct) => {
        product.addProducts(newProduct)
        socketServer.emit("success", "Producto Agregado Correctamente");
    });
//-----------------------------Enviar información al cliente----------------------------------//
socket.emit("test","mensaje desde servidor a cliente, se valida en consola de navegador")
})


//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))


//Static
app.use("/", express.static(__dirname + "/public"))

app.get("/", async(req, res) => {
    let allProducts = await product.getProducts()
    res.render("home",{
        title: "Express Avanzado - Handlebars",
        products: allProducts
    })
})

app.get("/searchProduct/:id", async(req, res) => {
    let prod = await product.getProductsById(req.params.id)
    res.render("prod",{
        title: "Express Avanzado - Handlebars",
        products: prod
    })
})

app.get("/realtimeproducts", async(req, res) => {
    let allProducts = await product.getProducts()
    res.render("realtimeproducts",{
        title: "Express Avanzado - Handlebars",
        products: allProducts
    })
})

app.use("/realtimeproducts", ProductRouter)
app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)

