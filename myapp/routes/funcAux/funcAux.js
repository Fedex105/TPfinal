let mysql = require("mysql");
let conn = mysql.createConnection({
  host:"mysql",
  user:"root",
  password:"root",
  database:"Productos"
})
conn.connect();

function buscarProductoId(id){
  return new Promise(function(resolve, reject){
    conn.query("SELECT * FROM productos JOIN imagenes ON productos.idProductos=imagenes.idProducto WHERE idProductos=?", id, (err, rows) => {
        if(err){
            reject(err);
        } else {
            resolve(rows);
        }
    });
})
}
function devolverProductos(){
  return new Promise(function(resolve, reject){
    conn.query("SELECT * FROM productos JOIN imagenes ON productos.idProductos=imagenes.idProducto", (err, rows) => {
        if(err){
            reject(err);
        } else {
            resolve(rows);
        }
    });
})
}
function devolverImagenes(){
  return new Promise(function(resolve, reject){
    conn.query("SELECT idProducto,rutaImagen FROM imagenes", (err, rows) => {
        if(err){
            reject(err);
        } else {
            resolve(rows);
        }
    });
})
}

function formateoProductos(productos){ 
productosFormateados = [];
idUsados = [];
for (producto of productos){
    idProducto = producto.idProductos;
    if (!(idUsados.includes(idProducto))){
        prodForm = {
            idProductos: idProducto,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            rating: producto.rating,
            stock: producto.stock,
            categoria: producto.categoria,
            seEnvia: producto.seEnvia,
            seRetira: producto.seRetira,
            imagenes: []
        }
        idUsados.push(idProducto);
        productosFormateados.push(prodForm);  
    }
  }
for (producto of productosFormateados){
    productosFiltrados = productos.filter(x => x.idProducto === producto.idProductos);
    imagenes = productosFiltrados.map(x => {
        return x.rutaImagen
    })
    producto.imagenes = imagenes;
  } 
  return productosFormateados
}

module.exports = {
    buscarProductoId : buscarProductoId,
    devolverProductos : devolverProductos,
    devolverImagenes : devolverImagenes,
    formateoProductos : formateoProductos
  }