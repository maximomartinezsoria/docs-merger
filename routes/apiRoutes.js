const path = require('path');
const fs = require('fs-extra');
const mergeDocs = require('../helpers/mergeDocs');

const apiRoutes = app => {
    app.get('/api/file', function (req, res) {
        res.download(path.join(__dirname, `../uploads/${req.query.filename}`), (err) => {
            if (err) {
              throw err;
            } 
        })
    });

    app.post('/api/file', async (req, res) => {
        try {
            if(!req.files) {
                res.send({
                    status: 500,
                    message: 'We dont received any files'                     
                });
            } else {
                const saveFile = async file => {
                    const fileName = file.name.replace(' ', '-');
                    const filePath = path.join(__dirname, `../uploads/${fileName}`);
                    await file.mv(filePath);

                    return fileName;
                }

                const cover = await saveFile(req.files.cover);
                const file = await saveFile(req.files.document);

                mergeDocs(cover, file, app);

                app.on('merged', (err) => {
                    if (err) throw err;
                    
                    res.send({
                        status: 200,
                        message: 'File was merged correctly!',
                        filename: file
                    });
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });    
}

module.exports = apiRoutes;
