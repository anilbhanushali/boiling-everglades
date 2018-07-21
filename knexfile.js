const path = require('path');
const sqliteDBPath = './mydb.sqlite';
module.exports = {
    client: 'sqlite3',
    connection: {
        filename: sqliteDBPath
    }
}