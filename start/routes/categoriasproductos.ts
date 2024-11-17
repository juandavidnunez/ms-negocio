import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/categoriaproductos', 'CategoriasProductosController.findAll')
  Route.get('/categoriaproductos/:id', 'CategoriasProductosController.findById')
  Route.post('/categoriaproductos', 'CategoriasProductosController.create')
  Route.put('/categoriaproductos/:id', 'CategoriasProductosController.update')
  Route.delete('/categoriaproductos/:id', 'CategoriasProductosController.delete')
})