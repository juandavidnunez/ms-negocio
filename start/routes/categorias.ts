import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/categorias', 'CategoriasController.findAll')
  Route.get('/categorias/:id', 'CategoriasController.findById')
  Route.post('/categorias', 'CategoriasController.create')
  Route.put('/categorias/:id', 'CategoriasController.update')
  Route.delete('/categorias/:id', 'CategoriasController.delete')
}).middleware(["security"])