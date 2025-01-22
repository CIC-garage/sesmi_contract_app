const cds = require('@sap/cds');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

module.exports = cds.service.impl(async function () {
    this.on('READ', 'CompanyCode', async (req) => {
      try {
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
  });