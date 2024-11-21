import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'direccions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.string('direccion').notNullable()
      table.integer('municipio_id').unsigned().references('municipios.id')
      table.integer('centros_distribucion_id').unsigned().references('centros_distribucions.id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
