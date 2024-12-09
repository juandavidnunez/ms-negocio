import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/vehiculos', 'VehiculosController.findAll')
  Route.get('/vehiculos/:id', 'VehiculosController.findById')
  Route.post('/vehiculos', 'VehiculosController.create')
  Route.put('/vehiculos/:id', 'VehiculosController.update')
  Route.delete('/vehiculos/:id', 'VehiculosController.delete')
  Route.get('/vehiculos/test', 'VehiculosController.test')
}).middleware(["security"])
