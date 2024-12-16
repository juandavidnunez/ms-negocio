import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/direcciones', 'DireccionsController.findAll')
  Route.get('/direcciones/:id', 'DireccionsController.findById')
  Route.post('/direcciones', 'DireccionsController.create')
  Route.put('/direcciones/:id', 'DireccionsController.update')
  Route.delete('/direcciones/:id', 'DireccionsController.delete')
}).middleware(["security"])
