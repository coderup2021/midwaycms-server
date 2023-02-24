import { MigrationInterface, QueryRunner } from 'typeorm'

export class addPathIntoCateTable1677159569673 implements MigrationInterface {
  name = 'addPathIntoCateTable1677159569673'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cate\` ADD \`path\` varchar(100) NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`cate\` DROP COLUMN \`path\``)
  }
}
