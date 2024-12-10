import type { HttpContextContract } fr

export default class Security {
  /**
   * Intercepta las solicitudes HTTP que pasan por este middleware.
   * @param param0 
   * @param next 
   * @returns 
   */
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    await next()
/*    let theRequest = request.toJSON()
    console.log(theRequest);
    let token = theRequest.headers.authorization.replace("Bearer ", "") // Obtener el token de autorización 
    // Crear un objeto con los datos de permiso: URL y el método de la solicitud
    let thePermission: object = {
      url: theRequest.url, // URL a la que se intenta acceder
      method: theRequest.method // Método de la solicitud (GET, POST, PUT, DELETE)
    }
    try {
      // Enviar la solicitud al microservicio de seguridad para validar los permisos
      const result = await axios.post(`${env.get('MS_SECURITY')}/api/public/security/permissions-validation`, thePermission,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("La respuesta de ms-security >" + result.data + "<")
      // Validación de la respuesta, Si el resultado es verdadero, permitir el acceso
      if (result.data == true) {
        console.log(result.data)
        await next()
      } else {
        console.log("no puede ingresar")
        return response.status(401)
      }
    } catch (error) {
      console.error(error)
      return response.status(401)
    }
  } */
}
