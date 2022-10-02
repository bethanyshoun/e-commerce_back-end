const express = require('express');
const routes = require('./routes');
// import sequelize connection
//import { Sequelize } from "sequelize"

const connection = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_URL,
        port: process.env.DATABASE_PORT,
        dialect: "mysql",
        logging: false,
        define: {
            // prevent sequelize from pluralizing table names
            freezeTableName: true,
        },
    }
)


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

export { connection as default }