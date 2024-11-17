import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Seguro from './Seguro'
import VehiculoDueno from './VehiculoDueno'
import VehiculoConductor from './VehiculoConductor'
import Ruta from './Ruta'

export default class Vehiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({isPrimary: true})
  public placa: string

  // referencia a municipio
  @column()
  public municipio_id: number

  @column()
  public tipo_vehiculo: string

  @hasMany(() => Seguro, {
    foreignKey: 'vehiculo_id'
  })
  public seguro: HasMany<typeof Seguro>

  @hasMany(() => VehiculoDueno, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculoDueno: HasMany<typeof VehiculoDueno>

  @hasMany(() => VehiculoConductor, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculoConductor: HasMany<typeof VehiculoConductor>

  @hasMany(() => Ruta, {
    foreignKey: 'vehiculo_id'
  })
  public ruta: HasMany<typeof Ruta>

  @hasMany(() => Operacion, {
    foreignKey: 'vehiculo_id'
  })
  public operacion: HasMany<typeof Operacion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
