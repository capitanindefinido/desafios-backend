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
productos.getProductById(3)