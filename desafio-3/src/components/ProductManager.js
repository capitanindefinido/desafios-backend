import {promises as fs} from "fs"

export default class ProductManagerFile {
    constructor(){
        this.path = 'C:\Users\HP OMEN\Desktop\Curso CoderHouse\Curso Backend Node\desafio-2'
    }

    static id = 0

    addProduct = async ({titulo, descripcion, precio, image, codigo, stock}) => {
        if(!titulo || !descripcion || !precio || !image || !codigo || !stock) return 'ingrese los campos'
        const products = await this.readFileProducts()
        const productExist = products.findIndex(product => product.codigo === codigo)
        if (productExist !== -1) return 'ya existe un producto con ese codigo'
        products.push({titulo, descripcion, precio, image, codigo, stock, id: products.length + 1})
        await fs.writeFile(this.path, JSON.stringify(products, null,2), 'utf-8')
        return 'producto agregado'
    }   

    readFileProducts = async () => {
        const productsJson = await fs.readFile(this.path, 'utf-8')
        return await JSON.parse(productsJson)
    }

    get = async () => await this.readFileProducts()

    getProductById = async (id) => {
        const products = await this.readFileProducts()
        if(products.length === 0) return 'no hay productos'
        let product = products.find(product => product.id === id)
        if(!product) return 'No se encuentra el producto'

        return product
    }

    deleteProductById = async (id) => {
        let respuesta = await this.readFileProducts()
        let productFilter = respuesta.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter))
        console.log("producto eliminado")
    }

    updateProduct = async ({id, ...producto}) => {
        await this.deleteProductById(id)
        let productOld = await await this.readFileProducts()
        let productoModificado = [
            {id, ...producto},
            ...productOld
        ]
        await fs.writeFile(this.path, JSON.stringify(productoModificado))
        console.log("producto modificado")
    }
}

/* const productsFile = new ProductManagerFile
 productsFile.get()
    .then(res => console.log(res))
    .catch(err => console.log(err))
 */
/*productsFile.getProductById(1)
    .then(res => console.log(res))
    .catch(err => console.log(err))
*/
/* const producto = {
    titulo: 'prod1' ,
    descripcion: 'descripcion',
    precio: 1333, 
    image: 'img', 
    codigo: 1, 
    stock: 150
}*/
/* const producto1 = {titulo: 'prod1' ,descripcion: 'descripcion',precio: 1333, image: 'img', codigo: 1, stock: 150}
const producto2= {titulo: 'prod2' ,descripcion: 'descripcion2',precio: 1333, image: 'img', codigo: 2, stock: 150}
const producto3 = {titulo: 'prod3' ,descripcion: 'descripcion3',precio: 1333, image: 'img', codigo: 3, stock: 150}
const producto4 = {titulo: 'prod4' ,descripcion: 'descripcion4',precio: 1333, image: 'img', codigo: 4, stock: 150}
const producto5 = {titulo: 'prod5' ,descripcion: 'descripcion5',precio: 1333, image: 'img', codigo: 5, stock: 150}
const producto6 = {titulo: 'prod6' ,descripcion: 'descripcion6',precio: 1333, image: 'img', codigo: 6, stock: 150}
const producto7 = {titulo: 'prod7' ,descripcion: 'descripcion7',precio: 1333, image: 'img', codigo: 7, stock: 150}
const producto8 = {titulo: 'prod8' ,descripcion: 'descripcion8',precio: 1333, image: 'img', codigo: 8, stock: 150}
const producto9 = {titulo: 'prod9' ,descripcion: 'descripcion9',precio: 1333, image: 'img', codigo: 9, stock: 150}
const producto10 = {titulo: 'prod10' ,descripcion: 'descripcion10',precio: 1333, image: 'img', codigo: 10, stock: 150} 

productsFile.addProduct(producto10)
    .then(res => console.log(res))
    .catch(err => console.log(err))  */

/* productsFile.deleteProductById(1) */

/* productsFile.updateProduct({
    titulo: 'prod1',
    descripcion: 'descripcion',
    precio: 23433,
    image: 'img',
    codigo: 1,
    stock: 150,
    id: 1
}) */