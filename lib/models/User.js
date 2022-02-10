//we establish the User here and pass it to UserServices.js
const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  #passHash;
  secretId;
  title;
  description;
  createdAt;

  //need to create the constructor
  constructor(row){
    this.id = row.id;
    this.email = row.email;
    this.#passHash = row.password_hash;
    this.secretId = row.confi_id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
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
  static async getByEmail(email){
    const { rows } = await pool.query(
      `
          SELECT *
          FROM users
          WHERE email=$1
          `, [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }
  //we have to create this function to get acced to the passwordhash and use it in users.js and authenticate.js
  get passwordHash(){
    return this.#passHash;
  }

  // static async getAll(){
  //   const { rows } = await pool.query('SECRET * FROM users');
  //   return rows.map((row) => new User(row));
  // }

};
