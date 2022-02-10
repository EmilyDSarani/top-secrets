const pool = require('../utils/pool');

module.exports = class Secret {
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
