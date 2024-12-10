import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const AdministradorValidator = {
  schema: schema.create({
    nombre: schema.string.optional(),
    fecha_nacimiento: schema.date.optional({
      format: 'yyyy-MM-dd'
    }),
    cedula: schema.string.optional(),
    security_id: schema.string.optional([
    ])
  })}



