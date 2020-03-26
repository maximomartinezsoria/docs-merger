const fs = require('fs');
const path = require('path');
const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');

const mergeDocs = (coverName, fileName, app) => {
    const cover = path.resolve(__dirname, `../uploads/${coverName}`);
    const file = path.resolve(__dirname, `../uploads/${fileName}`);

    const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;
    
    const Apikey = defaultClient.authentications['Apikey'];
    Apikey.apiKey = process.env.CLOUDMERSIVE_API_KEY;
    
    const apiInstance = new CloudmersiveConvertApiClient.MergeDocumentApi();
    
    const inputFile1 = Buffer.from(fs.readFileSync(cover).buffer); 
    const inputFile2 = Buffer.from(fs.readFileSync(file).buffer); 

    const callback = function(error, data, response) {
      if (error) console.error(error)
      
      fs.writeFile(file, data, err => {
        if (err) throw err;

        app.emit('merged');
      });
    };
    
    apiInstance.mergeDocumentDocx(inputFile1, inputFile2, callback);
}

module.exports = mergeDocs;