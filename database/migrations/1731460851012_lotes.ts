import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lotes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
    
      table.integer('cantidad_productos').notNullable()
      table.integer('peso_total').notNullable()
      table.datetime('fecha_creacion')
      table.datetime('fecha_entrega')

      table.integer('ruta_id').unsigned().references('rutas.id')
      table.integer('dir_lista_orden_id').unsigned().references('dir_lista_ordens.id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
