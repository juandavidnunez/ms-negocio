import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/empresas', 'EmpresasController.findAll')
  Route.get('/empresas/:id', 'EmpresasController.findById')
  Route.post('/empresas', 'EmpresasController.create')
  Route.put('/empresas/:id', 'EmpresasController.update')
  Route.delete('/empresas/:id', 'EmpresasController.delete')
}).middleware(["security"])