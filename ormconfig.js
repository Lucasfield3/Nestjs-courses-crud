module.exports = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password:  String(process.env.DB_PASSWORD),
  database: 'cursonestjs',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
