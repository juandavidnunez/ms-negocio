import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/lote', 'LotesController.findAll')
  Route.get('/lote/:id', 'LotesController.findById')
  Route.post('/lote', 'LotesController.create')
  Route.put('/lote/:id', 'LotesController.update')
  Route.delete('/lote/:id', 'LotesController.delete')
})