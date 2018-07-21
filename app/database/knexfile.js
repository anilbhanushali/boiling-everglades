const path = require('path');
const sqliteDBPath = path.join(__dirname, 'mydb.sqlite');
module.exports = {
    client: 'sqlite3',
    connection: {
        filename: sqliteDBPath
    }
}