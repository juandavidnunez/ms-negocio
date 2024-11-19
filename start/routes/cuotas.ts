import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/cuota', 'CuotasController.findAll')
  Route.get('/cuota/:id', 'CuotasController.findById')
  Route.post('/cuota', 'CuotasController.create')
  Route.put('/cuota/:id', 'CuotasController.update')
  Route.delete('/cuota/:id', 'CuotasController.delete')
}).middleware(["security"])