import app from './app'
import database from './database'

database.sync({ force: true })
console.log('Databse running at #3306')

app.listen(3000, () => {console.log('App running on #3000')})