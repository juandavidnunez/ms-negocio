import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/servicios', 'ServiciosController.findAll')
  Route.get('/servicios/:id', 'ServiciosController.findById')
  Route.post('/servicios', 'ServiciosController.create')
  Route.put('/servicios/:id', 'ServiciosController.update')
  Route.delete('/servicios/:id', 'ServiciosController.delete')
  Route.get('/servicios/test', 'serviciosController.test')
  Route.get('/servicios/:id/hoteles', 'serviciosController.serviciosHoteles')
  Route.get('/servicios/:id/restaurantes', 'serviciosController.serviciosRestaurantes')
}).middleware(["security"])
