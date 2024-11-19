import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/vehiculoDuenos', 'VehiculoDuenosController.findAll')
  Route.get('/vehiculoDuenos/:id', 'VehiculoDuenosController.findById')
  Route.post('/vehiculoDuenos', 'VehiculoDuenosController.create')
  Route.put('/vehiculoDuenos/:id', 'VehiculoDuenosController.update')
  Route.delete('/vehiculoDuenos/:id', 'VehiculoDuenosController.delete')
}).middleware(["security"])
