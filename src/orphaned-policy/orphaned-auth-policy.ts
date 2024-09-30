import { datasource } from '../prune-orphan-data/migration.config';

// Function to execute the queries
async function executeQueries() {
  await datasource.initialize();
  const queryRunner = datasource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Step 1: Get the list of all tables in the current database
    const allTablesResult = await queryRunner.query(`
      SELECT TABLE_NAME
      FROM information_schema.tables
      WHERE TABLE_SCHEMA = DATABASE();
    `);

    const tablesWithAuthorizationId: string[] = [];

    // Check each table for 'authorizationId' column
    for (const table of allTablesResult) {
      const columnCheckResult = await queryRunner.query(
        `
          SELECT COLUMN_NAME
          FROM information_schema.columns
          WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = ?
            AND COLUMN_NAME = 'authorizationId';
        `,
        [table.TABLE_NAME]
      );

      // Only include the table if it has the 'authorizationId' column
      if (columnCheckResult.length > 0) {
        tablesWithAuthorizationId.push(table.TABLE_NAME);
      }
    }

    // Log the tables with 'authorizationId' column
    console.log('Tables with authorizationId:', tablesWithAuthorizationId);

    // Step 2: Execute queries for each table
    for (const table of tablesWithAuthorizationId) {
      // Construct the SQL query for each table
      const query = `
        SELECT * FROM ${table}
        WHERE (NOT EXISTS (
            SELECT 1
            FROM authorization_policy
            WHERE authorization_policy.id = ${table}.authorizationId
          ) OR ${table}.authorizationId IS NULL);
      `;

      try {
        // Execute the query
        const results: any[] = await queryRunner.query(query);

        // Ensure rowCount is 0 if results is not an array
        const rowCount = Array.isArray(results) ? results.length : 0;

        // Log results or indicate no rows were found
        if (results.length > 0) {
          console.log(`Results from ${table}:`, results);
        } else {
          console.log(
            `No results returned from ${table}. Row count: ${rowCount}`
          );
        }
      } catch (queryError) {
        console.error(`Error executing query for table: ${table}`, queryError);
      }
    }
  } catch (error) {
    // Handle connection errors
    if (error instanceof Error) {
      console.error('Error connecting to the database:', error.message);
    } else {
      console.error('Unexpected error connecting to the database:', error);
    }
  } finally {
    // Release resources
    await queryRunner.release();
    await datasource.close();
  }
}

// Run the function
executeQueries();
