import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Cuota from './Cuota'
import Vehiculo from './Vehiculo'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public fecha_creacion: DateTime | null

  @column()
  public cliente_id: number

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @manyToMany(() => Vehiculo, {
    pivotTable: 'rutas',
    localKey: 'id',
    pivotForeignKey: 'contrato_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'vehiculo_id'
  })
  public vehiculos: ManyToMany<typeof Vehiculo>

  @hasMany(()=> Cuota, {
    foreignKey: 'contrato_id'
  })  
  public cuotas: HasMany<typeof Cuota>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}