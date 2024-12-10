import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import VehiculoConductor from './VehiculoConductor'
import Turno from './Turno'
import Vehiculo from './Vehiculo'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public fecha_nacimiento: DateTime

  @column()
  public cedula: string

  @column()
  public security_id: string // Id for the user in users


  @hasMany(() => Turno, {
    foreignKey: 'conductor_id'
  })
  public turno: HasMany<typeof Turno>

  @manyToMany(() => Vehiculo, {
    pivotTable: 'vehiculo_conductors',
    localKey: 'id',
    pivotForeignKey: 'conductor_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'vehiculo_id'
  })
  public vehiculos: ManyToMany<typeof Vehiculo>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
