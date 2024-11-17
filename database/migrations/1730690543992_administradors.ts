import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'administradors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
<<<<<<< HEAD
      table.integer('user_id').notNullable()
      
=======
      table.integer('user_id').unsigned().references('usuarios.id')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
>>>>>>> 4c0a3792c731db1b8c4bd274d2252aacff5a0913
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
