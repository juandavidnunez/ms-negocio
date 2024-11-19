import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/gasto', 'GastosController.findAll')
  Route.get('/gasto/:id', 'GastosController.findById')
  Route.post('/gasto', 'GastosController.create')
  Route.put('/gasto/:id', 'GastosController.update')
  Route.delete('/gasto/:id', 'GastosController.delete')
}).middleware(["security"])