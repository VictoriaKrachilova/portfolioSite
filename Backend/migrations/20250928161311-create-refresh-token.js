'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('refresh_token', {
			token: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,
				unique: true,
			},
			userId: {
				type: Sequelize.BIGINT,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			expiresAt: {
				type: Sequelize.BIGINT,
				allowNull: true,
			},
			created: {
				type: Sequelize.BIGINT,
				allowNull: false,
				defaultValue: Sequelize.literal('(extract(epoch from now()) * 1000)::bigint'),
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('refresh_token');
	}
};
