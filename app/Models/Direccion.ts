import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import CentrosDistribucion from './CentrosDistribucion'

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public direccion : string

  @column()
  centros_distribucions_id :number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => CentrosDistribucion, {
    foreignKey: 'centros_distribucions_id',
  })
  public CentrosDistribucion: BelongsTo<typeof CentrosDistribucion>

  @manyToMany(() => Direccion, {
    pivotTable: 'rutas_direcciones',
    pivotForeignKey: 'direccion_id',
    pivotRelatedForeignKey: 'ruta_id',
  })
  public direcciones: ManyToMany<typeof Direccion>
}
