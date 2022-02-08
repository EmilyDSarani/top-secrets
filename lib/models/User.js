//we establish the User here and pass it to UserServices.js
const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  #passwHash;

  //need to create the constructor
  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.#passwHash = row.password_hash;
  }

  static async insert({ email, passHash }){
    const { rows } = await pool.query(
      `
          INSERT INTO users (email, password_hash)
          VALUES ($1, $2)
          RETURNING *
          `,
      [email, passHash]
    );
    return new User(rows[0]);
  }



};
