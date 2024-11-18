import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/turnos', 'TurnosController.findAll')
  Route.get('/turnos/:id', 'TurnosController.findById')
  Route.post('/turnos', 'TurnosController.create')
  Route.put('/turnos/:id', 'TurnosController.update')
  Route.delete('/turnos/:id', 'TurnosController.delete')
})
