import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dirListaOrden', 'DirListaOrdenesController.findAll')
  Route.get('/dirListaOrden/:id', 'DirListaOrdenesController.findById')
  Route.post('/dirListaOrden', 'DirListaOrdenesController.create')
  Route.put('/dirListaOrden/:id', 'DirListaOrdenesController.update')
  Route.delete('/dirListaOrden/:id', 'DirListaOrdenesController.delete')
}).middleware(["security"])