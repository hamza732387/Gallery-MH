const mysql = require('mysql');
const DB_NAME = 'sql12328364';

function createDatabaseConnection(callback) {
    const connection = mysql.createConnection({
        host: 'sql12.freemysqlhosting.net',
        user: 'sql12328364',
        password: '85cjTRCdCX',
        database: DB_NAME,
    });

    connection.connect(error => {
        if (callback) {
            callback(error, connection)
        }
    });
}

module.exports = {
    createDatabaseConnection,
    DB_NAME
};

