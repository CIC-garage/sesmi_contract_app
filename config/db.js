const hana = require('@sap/hana-client');
require('dotenv').config();
// console.log('HANA_DB_URL:', process.env.HANA_DB_URL);
// console.log('HANA_DB_USERNAME:', process.env.HANA_DB_USERNAME);
// console.log('HANA_DB_PASSWORD:', process.env.HANA_DB_PASSWORD);
function connectToDatabase() {
    const connection = hana.createConnection();
    const connParams = {
        serverNode: "f25af037-0f41-43b6-a215-0ec41c01030c.hana.trial-us10.hanacloud.ondemand.com:443",
        uid: "DBADMIN",
        pwd: "Sap@123456789",
        encrypt: true,
        sslValidateCertificate: false  // For testing purposes, not recommended for production
    };
 
    try {
        connection.connect(connParams);
        console.log('Successfully connected to SAP HANA');
        return connection;
    } catch (err) {
        console.error('Failed to connect to SAP HANA:', err);
        throw err;
    }
}
 
module.exports = connectToDatabase;
 