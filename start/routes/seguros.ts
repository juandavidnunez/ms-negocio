import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/seguros', 'SegurosController.findAll')
  Route.get('/seguros/:id', 'SegurosController.findById')
  Route.post('/seguros', 'SegurosController.create')
  Route.put('/seguros/:id', 'SegurosController.update')
  Route.delete('/seguros/:id', 'SegurosController.delete')
})
