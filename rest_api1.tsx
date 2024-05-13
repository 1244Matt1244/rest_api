import {createConnection} from "typeorm";

createConnection({
   type: "mariadb",
   host: "localhost",
   port: 3306,
   username: "test",
   password: "test",
   database: "test",
   entities: [
      __dirname + "/entity/*.js"
   ],
   synchronize: true,
}).then(connection => {
   // here you can start to work with your entities
}).catch(error => console.log(error));
