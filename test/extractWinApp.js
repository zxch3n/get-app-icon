var getIcon = require('../dist/index');
var fs = require('fs');

async function test() {
    var icon = await getIcon.extractIcon('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe');
    icon = icon.split(',')[1];
    var buffer = Buffer.from(icon, 'base64');
    fs.writeFile('./image.png', buffer, ()=>{console.log('Done')});
}

test();
console.log('Done');