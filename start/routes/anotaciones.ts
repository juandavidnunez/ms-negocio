import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/anotacion', 'AnotacionessController.findAll')
  Route.get('/anotacion/:id', 'AnotacionesController.findById')
  Route.post('/anotacion', 'AnotacionesController.create')
  Route.put('/anotacion/:id', 'AnotacionesController.update')
  Route.delete('/anotacion/:id', 'AnotacionesController.delete')
}).middleware(["security"])