import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContratoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cliente_id: schema.number([
      rules.exists({table: 'clientes', column: 'id'})
    ]),
    fecha_creacion: schema.date.optional({
      format: 'yyyy-mm-dd'
    })
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
