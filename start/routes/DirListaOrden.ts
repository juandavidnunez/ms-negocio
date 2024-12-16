import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dirListaOrdenes', 'DirListaOrdenesController.findAll')
  Route.get('/dirListaOrdenes/:id', 'DirListaOrdenesController.findById')
  Route.post('/dirListaOrdenes', 'DirListaOrdenesController.create')
  Route.put('/dirListaOrdenes/:id', 'DirListaOrdenesController.update')
  Route.delete('/dirListaOrdenes/:id', 'DirListaOrdenesController.delete')
}).middleware(["security"])