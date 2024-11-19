import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/categoria', 'CategoriasController.findAll')
  Route.get('/categoria/:id', 'CategoriasController.findById')
  Route.post('/categoria', 'CategoriasController.create')
  Route.put('/categoria/:id', 'CategoriasController.update')
  Route.delete('/categoria/:id', 'CategoriasController.delete')
}).middleware(["security"])