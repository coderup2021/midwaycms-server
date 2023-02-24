import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Article } from './article.entity'

@Entity()
export class Cate {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string

  @Column()
  parentId: number

  @Column({ length: 100 })
  path: string

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date

  @OneToMany(() => Article, (article) => article.cate)
  articles: Article[]
}
