import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/duenos', 'DuenosController.findAll')
  Route.get('/duenos/:id', 'DuenosController.findById')
  Route.post('/duenos', 'DuenosController.create')
  Route.put('/duenos/:id', 'DuenosController.update')
  Route.delete('/duenos/:id', 'DuenosController.delete')
}).middleware(["security"])
