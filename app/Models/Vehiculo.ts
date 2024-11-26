import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Seguro from './Seguro'
import VehiculoDueno from './VehiculoDueno'
import VehiculoConductor from './VehiculoConductor'
import Ruta from './Ruta'
import Operacion from './Operacion'
import Municipio from './Municipio'
import Dueno from './Dueno'
import Conductor from './Conductor'
import Contrato from './Contrato'

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

  @manyToMany(() => Municipio,{
    pivotTable: 'operaciones',
    pivotForeignKey: 'vehiculo_id',
    pivotRelatedForeignKey: 'municipio_id',
    pivotColumns: []
  })
  public municipios: ManyToMany<typeof Municipio>

  @manyToMany(() => Dueno,{
    pivotTable: 'vehiculo_duenos',
    pivotForeignKey: 'vehiculo_id',
    pivotRelatedForeignKey: 'dueno_id',
    pivotColumns: []
  })
  public duenos: ManyToMany<typeof Dueno>

  @manyToMany(() => Conductor, {
    pivotTable: 'vehiculo_conductors',
    pivotForeignKey: 'vehiculo_id',
    pivotRelatedForeignKey: 'conductor_id',
    pivotColumns: []
  })
  public conductores: ManyToMany<typeof Conductor>

  @manyToMany(() => Contrato, {
    pivotTable: 'rutas',
    localKey: 'id',
    pivotForeignKey: 'vehiculo_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'contrato_id'
  })
  public contratos: ManyToMany<typeof Contrato>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
