import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/vehiculoConductores', 'VehiculoConductorsController.findAll')
  Route.get('/vehiculoConductores/:id', 'VehiculoConductorsController.findById')
  Route.post('/vehiculoConductores', 'VehiculoConductorsController.create')
  Route.put('/vehiculoConductores/:id', 'VehiculoConductorsController.update')
  Route.delete('/vehiculoConductores/:id', 'VehiculoConductorsController.delete')
})
