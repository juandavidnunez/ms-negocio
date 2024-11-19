import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/contratos', 'ContratosController.findAll')
  Route.get('/contratos/:id', 'ContratosController.findById')
  Route.post('/contratos', 'ContratosController.create')
  Route.put('/contratos/:id', 'ContratosController.update')
  Route.delete('/contratos/:id', 'ContratosController.delete')
}).middleware(["security"])
