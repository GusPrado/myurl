import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('mysql://root:mysqlrootpw@localhost:3306/myurl')

export default sequelize