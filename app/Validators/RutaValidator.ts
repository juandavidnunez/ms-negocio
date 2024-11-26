import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RutaValidator {
  constructor(protected ctx: HttpContextContract) {}

  schema = schema.create({
    vehiculo_id: schema.number([
      rules.exists({table: 'vehiculos', column: 'id'}),
      rules.required()
    ]),

    contrato_id: schema.number([
      rules.exists({table: 'contratoes', column: 'id'}),
      rules.required()
    ]),

  })

}
