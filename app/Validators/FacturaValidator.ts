import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha_pago: schema.date({
      format: 'dd-mm-yyyy'
    }),
    epayco_info: schema.string.optional({}, [
    ]),
    valor: schema.number([
      rules.required()
    ]),
    bill: schema.string({},[
      rules.required()
    ]),
    success: schema.boolean([
      rules.required()
    ]),
    cuota_id: schema.number.optional([
      rules.exists({table:'cuotas', column:'id'})
    ])
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
