const pool = require('../utils/pool');

module.exports = class Secret {
  secretId;
  title;
  description;
  createdAt;
  
  constructor(row){
    this.secretId = row.confi_id;
    this.title = row.title;
    this.description = row.description;
    this.createdAt = row.created_at;
  }

  static async insert({ title, description, createdAt }){
    const { rows } = await pool.query(
      `
              INSERT INTO confidentials (title, descriptions, created_at)
              VALUES ($1, $2, $3)
              RETURNING *
              `,
      [title, description, createdAt]
    );
    return new Secret(rows[0]);
  }
  
  static async getAll(){
    const { rows } = await pool.query('SECRET * FROM confidentials');
    return rows.map((row) => new Secret(row));
  }


};
