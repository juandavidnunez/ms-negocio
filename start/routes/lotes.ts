import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/lotes', 'LotesController.findAll')
  Route.get('/lotes/:id', 'LotesController.findById')
  Route.post('/lotes', 'LotesController.create')
  Route.put('/lotes/:id', 'LotesController.update')
  Route.delete('/lotes/:id', 'LotesController.delete')
}).middleware(["security"])