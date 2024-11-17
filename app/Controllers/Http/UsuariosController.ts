import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class UsuariosController {
  public async login({ request, response }: HttpContextContract) {
    try {
      let body = request.body()
      // Hacer una solicitud POST a la API de Adonis
      const adonisResponse = await axios.post('http://localhost:8080/api/public/security/login', {
        email: body.email,
        password: body.password,
      })

      // Devolver la respuesta de Adonis
      response.status(adonisResponse.status).send(adonisResponse.data)
    } catch (error) {
      // Manejar errores
      console.error('Error al consumir la API de Adonis:', error)
      response.status(error.response?.status || 500).send('Error al consumir la API de Adonis')
    }
  }

  public async secondAuth({ request, response }: HttpContextContract) {
    try {
      let body = request.body()
      // Hacer una solicitud POST a la API de Adonis
      const adonisResponse = await axios.put(
        '',
        { token: body.token, id: body.id }
      )

      // Devolver la respuesta de Adonis
      response.status(adonisResponse.status).send(adonisResponse.data)
    } catch (error) {
      // Manejar errores
      console.error('Error al consumir la API de Adonis:', error)
      response.status(error.response?.status || 500).send('Error al consumir la API de Adonis')
    }
  }

}