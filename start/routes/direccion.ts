import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/direccion', 'DireccionsController.findAll')
  Route.get('/direccion/:id', 'DireccionsController.findById')
  Route.post('/direccion', 'DireccionsController.create')
  Route.put('/direccion/:id', 'DireccionsController.update')
  Route.delete('/direccion/:id', 'DireccionsController.delete')
}).middleware(["security"])
