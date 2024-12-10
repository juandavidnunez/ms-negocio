import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    nombre: schema.string.optional(),
    fecha_nacimiento: schema.date.optional({
      format: 'yyyy-MM-dd'
    }),
    cedula: schema.string.optional(),
    security_id: schema.string.optional()
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
