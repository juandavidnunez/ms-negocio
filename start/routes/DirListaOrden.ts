import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dirListaOrden', 'DirListaOrdensController.findAll')
  Route.get('/dirListaOrden/:id', 'DirListaOrdensController.findById')
  Route.post('/dirListaOrden', 'DirListaOrdensController.create')
  Route.put('/dirListaOrden/:id', 'DirListaOrdensController.update')
  Route.delete('/dirListaOrden/:id', 'DirListaOrdensController.delete')
}).middleware(["security"])