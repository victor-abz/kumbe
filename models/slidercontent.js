'use strict';
export default (sequelize, DataTypes) => {
	const SliderContent = sequelize.define(
		'SliderContent',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			title: DataTypes.STRING,
			caption: DataTypes.STRING,
			position: {
				type: DataTypes.ENUM,
				values: ['left', 'right']
			},
			bgColor: DataTypes.STRING,
			titleColor: DataTypes.STRING,
			captionColor: DataTypes.STRING,
			imageLink: DataTypes.STRING,
			clickText: DataTypes.STRING
		},
		{ tableName: 'slider_contents' }
	);
	SliderContent.associate = (models) => {
		SliderContent.belongsTo(models.Category, {
			as: 'category',
			foreignKey: 'categoryId'
		});
		SliderContent.belongsTo(models.Language, {
			as: 'languages',
			foreignKey: 'languageId'
		});
	};
	return SliderContent;
};
