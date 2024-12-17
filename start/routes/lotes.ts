import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/lotes', 'LotesController.findAll')
  Route.get('/lotes/:id', 'LotesController.findById')
  Route.post('/lotes', 'LotesController.create')
  Route.put('/lotes/:id', 'LotesController.update')
  Route.delete('/lotes/:id', 'LotesController.delete')
  Route.get('/lotes/test', 'LotesController.test')
  Route.get('/lotes/:id/rutas', 'LotesController.lotesRutas')
  Route.get('/lotes/:id/dirlistar', 'LotesController.lotesDirlistaOrden')
  Route.get('/lotes/:id/ptoductos', 'LotesController.lotesProductos')
}).middleware(["security"])