import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const AnotacionValidation = {
    schema: schema.create({
        fecha: schema.date({}, [
        rules.required()
        ]),
        descripcion: schema.string({}, [
        rules.required(),
        rules.maxLength(150)
        ]),
        dir_lista_orden_id: schema.number([
        rules.required(),
        rules.exists({ table: 'dirlistaordenes', column: 'id' })
        ])
    })
}