import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1587318730124
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    const providerIdColumn = new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true,
    });

    await queryRunner.addColumn('appointments', providerIdColumn);

    const foreignKey = new TableForeignKey({
      name: 'AppointmentsProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryRunner.createForeignKey('appointments', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentsProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'uuid',
      }),
    );
  }
}
