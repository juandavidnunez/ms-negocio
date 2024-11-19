import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/hoteles', 'HotelsController.findAll')
  Route.get('/hoteles/:id', 'HotelsController.findById')
  Route.post('/hoteles', 'HotelsController.create')
  Route.put('/hoteles/:id', 'HotelsController.update')
  Route.delete('/hoteles/:id', 'HotelsController.delete')
}).middleware(["security"])
