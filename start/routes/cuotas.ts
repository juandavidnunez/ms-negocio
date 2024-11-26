import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/cuotas', 'CuotasController.findAll')
  Route.get('/cuotas/:id', 'CuotasController.findById')
  Route.post('/cuotas', 'CuotasController.create')
  Route.put('/cuotas/:id', 'CuotasController.update')
  Route.delete('/cuotas/:id', 'CuotasController.delete')
}).middleware(["security"])