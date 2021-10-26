var express = require('express');
var router = express.Router();
var funcAux = require("./funcAux/funcAux")

router.get('/', (req, res) => {
    
  funcAux.devolverProductos()
    .then(productos => {
        res.json(funcAux.formateoProductos(productos))
    })
    .catch(err => {
      console.log(err)
      res.json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
    })
})


router.get('/:id', function (req, res) {
  
  let id = req.params.id

  funcAux.buscarProductoId(id)
    .then(producto => {
      let prodForm = funcAux.formateoProductos(producto)
      if(prodForm.length === 0){
      console.log("Error, producto inexistente")
      }else{
        res.json(prodForm[0])
      }
    })
    .catch(err => {
      console.log(err);
      res.json({error:"Hubo un error"});
    })
})

module.exports = router;
