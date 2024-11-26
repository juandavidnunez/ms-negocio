import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/vehiculosMunicipios', 'VehiculosMunicipiosController.findAll')
  Route.get('/vehiculosMunicipios/:id', 'VehiculosMunicipiosController.findById')
  Route.post('/vehiculosMunicipios', 'VehiculosMunicipiosController.create')
  Route.put('/vehiculosMunicipios/:id', 'VehiculosMunicipiosController.update')
  Route.delete('/vehiculosMunicipios/:id', 'VehiculosMunicipiosController.delete')
}).middleware(["security"])