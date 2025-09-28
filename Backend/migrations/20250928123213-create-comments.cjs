'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('comments', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				unique: true,
			},
			imageId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'images',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			text: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			created: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: Sequelize.literal('(extract(epoch from now()) * 1000)::bigint'),
			},
		});
		await queryInterface.addIndex('comments', ['created']);
	},

	async down(queryInterface) {
		await queryInterface.removeIndex('comments', ['created']);
		await queryInterface.dropTable('comments');
	},
};
