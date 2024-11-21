import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'anotaciones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('fecha').notNullable()
      table.string('descripcion', 255).notNullable()
      table.integer('dir_lista_orden_id').unsigned().references('dirlistaordenes.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
