import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/rutas', 'RutasController.findAll')
    Route.get('/rutas/:id', 'RutasController.findById')
    Route.post('/rutas', 'RutasController.create')
    Route.put('/rutas/:id', 'RutasController.update')
    Route.delete('/rutas/:id', 'RutasController.delete')
}).middleware(["security"])
