import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/empresa', 'EmpresasController.findAll')
  Route.get('/empresa/:id', 'EmpresasController.findById')
  Route.post('/empresa', 'EmpresasController.create')
  Route.put('/empresa/:id', 'EmpresasController.update')
  Route.delete('/empresa/:id', 'EmpresasController.delete')
}).middleware(["security"])