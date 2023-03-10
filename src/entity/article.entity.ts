import { ICate } from 'src/interface'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm'
import { Cate } from './cate.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  title: string

  @Column('text')
  content: string

  @Column('text')
  description: string

  @Column()
  editorType: number //编辑器类型，1:markdown, 2:WangEditor

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

  @ManyToOne(() => Cate, (cate) => cate.articles)
  cate: Cate
}
