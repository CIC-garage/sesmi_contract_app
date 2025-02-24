const cds = require('@sap/cds');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const connectToDatabase = require('../config/db');
const schemaName = 'DBADMIN';  // Replace with your schema name if needed
// const connection = connectToDatabase();

module.exports = cds.service.impl(async function () {

   // value help request
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


    // get currency request

    this.on('GetCurrencyExecuteAction', async (req) => {
      const { Vendor } = req.data; // Extract the input parameter

      try {
        const response = await executeHttpRequest(
          {
            method: 'GET',
            url: `http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/GetCurrencyExecuteAction?Vendor='${Vendor}'`,
            headers: {
              'Cookie': 'sap-usercontext=sap-client=210', // Replace with your actual cookie if needed
              'Authorization': 'Basic ' + Buffer.from('s.ahmed:Sa@123456789').toString('base64'), // Replace with your credentials
              'Accept': 'application/json', // Ensure the response is in JSON format
              'Content-Type': 'application/json' // Specify the content type
            }
          }
        );
        return { Currency: response.data.d.Currency };
      } catch (error) {
        console.error('Error executing the request', error);
      }
  });

      // create Po set 

      this.on('CREATE', 'ContractPOHeaderSet', async (req) => {

        const csrfResponse = await executeHttpRequest({
          method: 'GET',
          url: 'http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/',
          headers: {
              'Cookie': 'sap-usercontext=sap-client=210',
              'Authorization': 'Basic ' + Buffer.from('s.ahmed:Sa@123456789').toString('base64'),
              'x-csrf-token': 'Fetch'
          }
      });
      const csrfToken = csrfResponse.headers['x-csrf-token'];
        try {
          req.headers['x-csrf-token'] = csrfToken;        
            const response = await executeHttpRequest({
              url: `http://S4H-QAS.bhgroup.local:8003/sap/opu/odata/CICSE/SESMI_SRV/ContractPOHeaderSet?sap-client=210`
            },{
              method :'POST',
              data:req.data,
              headers: {
                'Authorization': 'Basic ' + Buffer.from('s.ahmed:Sa@123456789').toString('base64'),
                'Cookie': 'sap-usercontext=sap-client=210',  // ✅ Send session cookies
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',  // ✅ Ensure UTF-8 encoding
  
              }
            }
            );
          
          
          return {
            PoNumber: req.data.PoNumber, 
            ...response.data.d
        };
        
        } catch (error) {
          console.error('Error executing the request', error);
        }
    });

    this.on('READ', 'HeaderSet', async (req) => {
      // const tableName = 'HEADERSET';
      // const query = `SELECT * FROM ${schemaName}."${tableName}"`;
  
      // return new Promise((resolve, reject) => {
      //     connection.exec(query, (err, results) => {
      //         if (err) {
      //             console.error('Error executing query:', err);
      //             // connection.disconnect();
      //             return reject(err); // Reject the promise with the error
      //         }
      //         // connection.disconnect();
      //         console.log('Query Results:', results);
      //         resolve(results); // Resolve the promise with the query results
      //     });
      // });
  });
  });