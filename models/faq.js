'use strict';
module.exports = (sequelize, DataTypes) => {
	const Faq = sequelize.define(
		'Faq',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			question: DataTypes.STRING,
			answer: DataTypes.STRING
		},
		{ tableName: 'f_a_qs' }
	);
	Faq.associate = (models) => {
		Faq.belongsTo(models.Language, {
			as: 'language',
			foreignKey: 'languageId'
		});
	};
	return Faq;
};
