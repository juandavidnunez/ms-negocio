import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/vehiculos', 'VehiculosController.findAll')
  Route.get('/vehiculos/:id', 'VehiculosController.findById')
  Route.post('/vehiculos', 'VehiculosController.create')
  Route.put('/vehiculos/:id', 'VehiculosController.update')
  Route.delete('/vehiculos/:id', 'VehiculosController.delete')
  Route.get('/vehiculos/test', 'VehiculosController.test')
  Route.get('/vehiculos/:id/conductores', 'VehiculosController.vehiculosConductor')
  Route.get('/vehiculos/:id/duenos', 'VehiculosController.vehiculosDueno')
  Route.get('/vehiculos/:id/contratos', 'VehiculosController.vehiculosContrato')
}).middleware(["security"])
