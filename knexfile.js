// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/characterversions',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
    
};

