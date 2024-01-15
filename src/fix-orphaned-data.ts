import * as mysql from 'mysql';

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'alkemio',
});

// Promisify the connection.query method for easier use with async/await
const query = (sql: string, args: any[] = []) => {
  return new Promise<any>((resolve, reject) => {
    connection.query(sql, args, (error: any, results: any, _fields: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

async function main() {
  try {
    // Connect to the database
    await new Promise<void>((resolve, reject) => {
      connection.connect((error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // Get a list of all tables in the database
    const tables: any[] = await query(
      `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = ?
    `,
      [connection.config.database]
    );

    for (const table of tables) {
      // Get the foreign key constraints for the table
      const foreignKeys: any[] = await query(
        `
        SELECT column_name, referenced_table_name, referenced_column_name
        FROM information_schema.key_column_usage
        WHERE table_schema = ? AND table_name = ? AND referenced_table_name IS NOT NULL
      `,
        [connection.config.database, table.table_name]
      );

      // Generate the SQL query to find orphaned data
      let orphanedDataQuery = `SELECT * FROM ${table.table_name} WHERE `;
      for (const fk of foreignKeys) {
        orphanedDataQuery += `${table.table_name}.${fk.column_name} IS NOT NULL AND ${table.table_name}.${fk.column_name} NOT IN (SELECT ${fk.referenced_column_name} FROM ${fk.referenced_table_name}) AND `;
      }
      orphanedDataQuery = orphanedDataQuery.slice(0, -5);

      // Find any orphaned data
      const orphanedData: any[] = await query(orphanedDataQuery);

      // Delete any orphaned data
      for (const row of orphanedData) {
        await query(
          `
          DELETE FROM ${table.table_name}
          WHERE id = ?
        `,
          [row.id]
        );
        console.log(
          `Deleted orphaned data with id ${row.id} from table ${table.table_name}`
        );
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection to the database
    connection.end();
  }
}

main();
