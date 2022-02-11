const pool = require('../utils/pool');

module.exports = class Secret {
  secretId;
  title;
  description;
  createdAt;
  userId;

  constructor(row){
    this.secretId = row.confi_id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
    this.userId = row.user_id;
  }
  //comment coding to get CI to pass
  static async insert({ title, description, userId }){
    const { rows } = await pool.query(
      `
              INSERT INTO confidentials (title, description, user_id)
              VALUES ($1, $2, $3)
              RETURNING *
              `,
      [title, description, userId]
    );
    return new Secret(rows[0]);
  }
  
  static async getAll(){
    const { rows } = await pool.query('SELECT * FROM confidentials');
    return rows.map((row) => new Secret(row));
  }


};
