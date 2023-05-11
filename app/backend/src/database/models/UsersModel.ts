import { DataTypes, Model } from "sequelize";
import sequelize from ".";

class UsersModel extends Model {
  declare id: number;
	declare username: string;
	declare role: string;
	declare email: string;
	declare password: string;  
}

UsersModel.init({
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	username: {
		allowNull: false,
		type: DataTypes.STRING   
	},
	role: {
		allowNull: false,
		type: DataTypes.STRING   
	},
	email: {
		allowNull: false,
		type: DataTypes.STRING   
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING   
	}   
}, 
	{
		tableName: 'users',
		sequelize,
		timestamps: false,
		underscored: true
});

export default UsersModel;