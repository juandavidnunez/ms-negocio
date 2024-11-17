import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  //Relación de autorreferencia con la tabla Categoria
  @column({ columnName: 'categoria_padre_id' })
  public categoriaPadreId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relación de auto-referencia para las subcategorías
  @hasMany(() => Categoria, {
    foreignKey: 'categoriaPadreId',  // Campo que indica la relación con la categoría padre
  })
  public subcategorias: HasMany<typeof Categoria>

  // Relación de auto-referencia para la categoría padre
  @belongsTo(() => Categoria, {
    foreignKey: 'categoriaPadreId',  // Campo que indica la relación con la categoría padre
  })
  public categoriaPadre: BelongsTo<typeof Categoria>

  // Many to many relationship with Producto
  @manyToMany(() => Producto, {
    pivotTable: 'categorias_productos', // The name of the pivot table
    //Categoria en la tabla CategoriasProductos tiene una llave foránea llamada categoria_id que referencia a la tabla Categorias
    pivotForeignKey: 'categoria_id',  // The foreign key in the pivot table that references the current model
    pivotRelatedForeignKey: 'producto_id',  // The foreign key in the pivot table that references the related model
    pivotColumns: ['cantidad'],  // Additional columns on the pivot table
  })
  public productos: ManyToMany<typeof Producto>
}
