import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string.optional(),
    fecha_nacimiento: schema.date.optional(),
    cedula: schema.string.optional(),
    security_id: schema.string([
      rules.required(),
    ])
  })


  public messages: CustomMessages = {}
}
