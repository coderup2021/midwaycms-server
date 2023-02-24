import { MigrationInterface, QueryRunner } from 'typeorm'

export class createCate1677105541737 implements MigrationInterface {
  name = 'createCate1677105541737'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cate\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`parentId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(`ALTER TABLE \`article\` ADD \`cateId\` int NULL`)
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_8dba8ee9f308f7100bf46ce53de\` FOREIGN KEY (\`cateId\`) REFERENCES \`cate\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_8dba8ee9f308f7100bf46ce53de\``,
    )
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`cateId\``)
    await queryRunner.query(`DROP TABLE \`cate\``)
  }
}
