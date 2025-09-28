'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('portfolios', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
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
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: Sequelize.literal('(extract(epoch from now()) * 1000)::bigint'),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('portfolios');
    },
};
