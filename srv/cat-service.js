const cds = require('@sap/cds');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const connectToDatabase = require('../config/db');
const schemaName = 'DBADMIN';  // Replace with your schema name if needed
const connection = connectToDatabase();

module.exports = cds.service.impl(async function () {
    this.on('READ', 'CompanyCode', async (req) => {
      try {
        
        // console.Console('Error executing insert query:', connection);
        const response = await executeHttpRequest(
          { method: 'GET',
            url: 'https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_COMPANYCODE_SRV/A_CompanyCode',
            headers: {
                APIKey: 'ED8QioTGnmFfUilKFxUGUAIng7FG7hL8',
                Cookie: 'sap-usercontext=sap-client=100'
              } }
        );
        const results = response.data?.d?.results || [];
    // Extract only CompanyCode and CompanyCodeName
    const result = results.map((item) => ({
      CompanyCode: item.CompanyCode,
      CompanyCodeName: item.CompanyCodeName,
    }));

    return result;
      } catch (error) {
          console.error('Error fetching data from external service:', error.message);
          req.reject(500, 'Failed to fetch data from external service');
      }
    });

    this.on('READ', 'HeaderSet', async (req) => {
      const tableName = 'HEADERSET';
      const query = `SELECT * FROM ${schemaName}."${tableName}"`;
  
      return new Promise((resolve, reject) => {
          connection.exec(query, (err, results) => {
              if (err) {
                  console.error('Error executing query:', err);
                  // connection.disconnect();
                  return reject(err); // Reject the promise with the error
              }
              // connection.disconnect();
              console.log('Query Results:', results);
              resolve(results); // Resolve the promise with the query results
          });
      });
  });
  });