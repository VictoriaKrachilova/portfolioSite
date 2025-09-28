'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('images', {
			id: {
				type: Sequelize.BIGINT,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				unique: true,
			},
			portfolioId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'portfolios',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			created: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: Sequelize.literal('(extract(epoch from now()) * 1000)::bigint'),
			},
		});
		await queryInterface.addIndex('images', ['created']);
		// await queryInterface.addIndex('images', ['portfolioId', 'created']);
	},

	async down(queryInterface) {
		// await queryInterface.removeIndex('Images', ['portfolioId', 'created']);
    	await queryInterface.removeIndex('images', ['created']);
		await queryInterface.dropTable('images');
	},
};
