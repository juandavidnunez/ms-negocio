import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Direccion from './Direccion'
import Municipio from './Municipio'

export default class CentrosDistribucion extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nombre: string
  
  @column()
  municipio_id:number

  @column()
  public direccion_id: number

  @belongsTo(() => Direccion, {
    foreignKey: 'direccion_id'
  })
  public direccion: BelongsTo<typeof Direccion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Municipio, {
    foreignKey: 'municipio_id',
  })
  public municipio: BelongsTo<typeof Municipio>
  
  @hasMany(() => Direccion, {
    foreignKey: 'centros_distribucions_id',
   })
   public Direcciones: HasMany<typeof Direccion>
}