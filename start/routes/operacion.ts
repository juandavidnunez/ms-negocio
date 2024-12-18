import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/operaciones', 'OperacionesController.findAll')
  Route.get('/operaciones/:id', 'OperacionesController.findById')
  Route.post('/operaciones', 'OperacionesController.create')
  Route.put('/operaciones/:id', 'OperacionesController.update')
  Route.delete('/operaciones/:id', 'OperacionesController.delete')
  Route.delete('/operaciones/vehiculo/:id', 'OperacionesController.deleteAllVehiculo')
}).middleware(["security"])
