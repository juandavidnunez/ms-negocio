import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/producto', 'ProductosController.findAll')
  Route.get('/producto/:id', 'ProductosController.findById')
  Route.post('/producto', 'ProductosController.create')
  Route.put('/producto/:id', 'ProductosController.update')
  Route.delete('/producto/:id', 'ProductosController.delete')
}).middleware(["security"])
