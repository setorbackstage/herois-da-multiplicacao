const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Admin\\AppData\\Local\\npm-cache\\_npx\\fb1dd8fe0df11c96\\node_modules\\ggcheckout-mcp\\dist\\index.js', 'utf8');

const matches = content.match(/axios[^\;]+|headers[^\;]+|apiKey[^\;]+|GGCHECKOUT[^\;]+/gi);
console.log('Matches:', matches);
