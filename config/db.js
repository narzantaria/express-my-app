const config = require('config');

module.exports.db = {
  host: config.get('HOST'),
  user: config.get('SQL_USER'),
  password: config.get('SQL_PASSWORD'),
  database: config.get('DATABASE')
};