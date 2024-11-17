import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public descripcion: string

  @column()
  public precio: number

  @column()
  public lote_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Categoria, {
    pivotTable: 'categorias_productos',
    pivotForeignKey: 'producto_id',
    pivotRelatedForeignKey: 'categoria_id',
    pivotColumns: ['cantidad']
  })
  public categorias: ManyToMany<typeof Categoria>
}
