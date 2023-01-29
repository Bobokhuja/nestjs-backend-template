import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false})
  jpg: string

  @Column({nullable: true})
  webp?: string

  @Column({nullable: true})
  width: number

  @Column({nullable: true})
  height: number
}