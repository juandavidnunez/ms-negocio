import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Seguro from './Seguro'
import Ruta from './Ruta'
import Operacion from './Operacion'
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

  @manyToMany(() => Dueno, {
    pivotTable: 'vehiculo_duenos',
    localKey: 'id',
    pivotForeignKey: 'vehiculo_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'dueno_id'
  })
  public duenos: ManyToMany<typeof Dueno>


  @manyToMany(() => Conductor, {
    pivotTable: 'vehiculo_conductors',
    localKey: 'id',
    pivotForeignKey: 'vehiculo_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'conductor_id'
  })
  public conductores: ManyToMany<typeof Conductor>

  @hasMany(() => Ruta, {
    foreignKey: 'vehiculo_id'
  })
  public ruta: HasMany<typeof Ruta>

  @hasMany(() => Operacion, {
    foreignKey: 'vehiculo_id'
  })
  public operacion: HasMany<typeof Operacion>

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
