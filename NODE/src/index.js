const ApiPort = 4400;
const CurrentDir = process.cwd();

var fs = require('fs');
const cors = require('cors')
const express = require('express');
const app = express();

const apiRoute = express.Router();
app.use(cors());
app.use('/api', apiRoute);
apiRoute.get('/', function (req, res) {
    res.file(__dirname + '/../app');
});
app.use('/', express.static(__dirname + '/../app'))

apiRoute.use('/static', express.static(CurrentDir))
apiRoute.get('/getDirStructure', function (req, res) {
    res.send(dirToJson(CurrentDir));
});

function dirToJson(rootDirPath) {
    const maxNodeCount = 10000;
    let nodeCount = 0;
    const dirToObject = dirPath => {
        const ret = {
            dir: {},
            file: []
        };
        const files = fs.readdirSync(dirPath)
        files.forEach(file => {
            if (++nodeCount > maxNodeCount) {
                throw 'Max Depth'
            }
            const fullFilePath = dirPath + '/' + file;
            if (fs.lstatSync(fullFilePath).isDirectory()) {
                ret.dir[file] = dirToObject(fullFilePath);
            } else {
                ret.file.push(file);
            }
        });

        return ret;
    }
    const dir = dirToObject(rootDirPath);
    return JSON.stringify(dir);
}


app.listen(ApiPort, function () {
    console.log(`Node listening on port ${ApiPort}!`);
});
