class ProductManager {
    constructor(){
        this.products = []
    }

    static id = 0

    addProduct(titulo, descripcion, precio, image, codigo, stock){
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].codigo === codigo){
                console.log(`El código ${codigo} esta repetido`)
                break
            }
        }
        const newProduct = {
            titulo,
            descripcion, 
            precio, 
            image, 
            codigo, 
            stock
        }
        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.products.push({...newProduct, id:ProductManager.id})
        }else{
            console.log("Todos los campos deben ser llenados")
        }
        
    }

    getProduct(){
        return this.products
    }

    existe(id){
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id){
        !this.existe(id) ? console.log("No encontrado") : console.log(this.existe(id))
    }
}

//TESTING
/* 
const productos = new ProductManager

//Arreglo vacío
console.log("Arreglo vacío")
console.log(productos.getProduct())

//Se agrega primer producto correctamente
productos.addProduct('Big Blue', 'Disco de Bandalos Chinos', 8000, "imagen", '01', 5)
productos.addProduct('Navibach', 'Disco de Bandalos Chinos', 8000, "imagen", '02', 5)
//Se agrega un segundo producto con el codigo repetido y con un dato undefined
productos.addProduct('BACH', 'Disco de Bandalos Chinos', 8000, "imagen", '01')
//Llamado a los productos
console.log("P R O D U C T O S")
console.log(productos.getProduct())
//Encontrar un producto con un id existente
console.log("Producto con id 1: ")
productos.getProductById(1)
//Encontrar un producto con un id que no existe
console.log("Producto con id 2: ")
productos.getProductById(2)
console.log("Producto con id 3: ")
productos.getProductById(3) */


const fileSystem = require('node:fs')
const fs = fileSystem.promises

class ProductManagerFile {
    constructor(){
        this.path = 'C:\Users\HP OMEN\Desktop\Curso CoderHouse\Backend Node\desafio-2'
    }

    static id = 0

    addProduct = async ({titulo, descripcion, precio, image, codigo, stock}) => {
        if(!titulo || !descripcion || !precio || !image || !codigo || !stock) return 'ingrese los campos'
        const products = await this.readFileProducts()
        const productExist = products.findIndex(product => product.code === code)
        if (productExist !== -1) return 'ya existe un producto con ese codigo'
        products.push({titulo, descripcion, precio, image, codigo, stock, id: products.length + 1})
        await fs.writeFile(this.path, JSON.stringify(products, null,2), 'utf-8')
        return 'producto agregado'
    }   

    readFileProducts = async () => {
        try {
            const productsJson = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(productsJson)
        } catch (error) {
            return []
        }
        
    }

    get = async () => await this.readFileProducts()



    getProductById = async (id) => {
        const products = await this.readFileProducts()
        if(products.length === 0) return 'no hay productos'
        let product = products.find(product => product.id === id)
        if(!product) return 'No se encuentra el producto'

        return product
    }
}

const productsFile = new ProductManagerFile
productsFile.get()
    .then(res => console.log(res))
    .catch(err => console.log(err))

productsFile.getProductById(1)
    .then(res => console.log(res))
    .catch(err => console.log(err))

/* const producto = {
    titulo: 'prod1' ,
    descripcion: 'descripcion',
    precio: 1333, 
    image: 'img', 
    codigo: 1, 
    stock: 150
}

productsFile.addProduct(producto)
    .then(res => console.log(res))
    .catch(err => console.log(err)) */