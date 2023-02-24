import { MigrationInterface, QueryRunner } from 'typeorm'

export class addEditorTypeIntoAtricle1677104779924
  implements MigrationInterface
{
  name = 'addEditorTypeIntoAtricle1677104779924'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`editorType\` int NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`editorType\``,
    )
  }
}
