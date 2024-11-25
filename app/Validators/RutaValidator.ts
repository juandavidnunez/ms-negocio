import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RutaValidator {
  constructor(protected ctx: HttpContextContract) {}

  schema = schema.create({
    Vehiculo_id: schema.number([
      rules.exists({table: 'vehiculos', column: 'id'})
    ]),

    contrato_id: schema.number([
      rules.exists({table: 'contratos', column: 'id'})
    ]),

  })

}
