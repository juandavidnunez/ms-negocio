import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const loteValidation = {
  schema: schema.create({
    
      dir_lista_orden_id: schema.number([
        rules.required(),
        rules.exists({ table: 'dir_lista_ordens', column: 'id' })
      ]),
      ruta_id: schema.number([
        rules.required(),
        rules.exists({ table: 'rutas', column: 'id' })
      ]),
      fecha_creacion: schema.date.optional({
        format:'YYYY-MM-DD HH:mm:ss'
      },[
        rules.required()
      ]),
      fecha_entrega: schema.date.optional(),
      cantidad_productos: schema.number([
        rules.required()
      ]),
      peso_total: schema.number([
        rules.required()
      ])
    })
}