import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/productos', 'ProductosController.findAll')
  Route.get('/productos/:id', 'ProductosController.findById')
  Route.post('/productos', 'ProductosController.create')
  Route.put('/productos/:id', 'ProductosController.update')
  Route.delete('/productos/:id', 'ProductosController.delete')
}).middleware(["security"])
