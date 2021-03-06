'use strict';
export default (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			username: {
				type: DataTypes.STRING,
				unique: true
			},
			email: {
				type: DataTypes.STRING,
				unique: true
			},
			phone: {
				type: DataTypes.STRING
			},
			profilePic: DataTypes.STRING,
			gender: {
				type: DataTypes.ENUM,
				values: ['Male', 'Female', 'Other']
			},
			accessLevel: {
				type: DataTypes.ENUM,
				defaultValue: '4',
				values: ['1', '2', '3', '4']
			},
			password: DataTypes.STRING,
			isActive: DataTypes.BOOLEAN,
			isVerified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			resetToken: DataTypes.STRING
		},
		{
			tableName: 'users'
		}
	);
	User.associate = (models) => {};
	return User;
};
