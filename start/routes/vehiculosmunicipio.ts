import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/vehiculomunicipio', 'VehiculosMunicipiosController.findAll')
  Route.get('/vehiculomunicipio/:id', 'VehiculosMunicipiosController.findById')
  Route.post('/vehiculomunicipio', 'VehiculosMunicipiosController.create')
  Route.put('/vehiculomunicipio/:id', 'VehiculosMunicipiosController.update')
  Route.delete('/vehiculomunicipio/:id', 'VehiculosMunicipiosController.delete')
})