const cds = require('@sap/cds');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const connectToDatabase = require('../config/db');
const schemaName = 'DBADMIN';  // Replace with your schema name if needed
const connection = connectToDatabase();

module.exports = cds.service.impl(async function () {

  
  this.on('READ', 'ValueHelpSet', async (req) => {
    var filters = req.query.SELECT.where;
    let valueHelpType = null;

    // Extract filter value
    if (req.query.SELECT && req.query.SELECT.where) {
        req.query.SELECT.where.forEach((filter, index) => {
            if (typeof filter === "object" && filter.ref && filter.ref[0] === "ValueHelpType") {
              valueHelpType = req.query.SELECT.where[index + 2]; // Value is at index+2
            }
        });
    }

    const selectionParameter = '';
    if (valueHelpType != '' && valueHelpType != null) {

      try {
        const response = await executeHttpRequest(
          {
            method: 'GET',
            url: `http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/ValueHelpSet?$filter=ValueHelpType eq '${valueHelpType.val}'`,
            headers: {
              'Cookie': 'sap-usercontext=sap-client=210', // Replace with your actual cookie if needed
              'Authorization': 'Basic ' + Buffer.from('s.ahmed:Sa@123456789').toString('base64'), // Replace with your credentials
              'Accept': 'application/json', // Ensure the response is in JSON format
              'Content-Type': 'application/json' // Specify the content type
            }
          }
        );
        return response.data.d.results;
      } catch (error) {
        console.error('Error executing the request', error);
      }
    
      
    }

        });


















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