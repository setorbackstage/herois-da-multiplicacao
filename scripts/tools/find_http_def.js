const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Admin\\AppData\\Local\\npm-cache\\_npx\\fb1dd8fe0df11c96\\node_modules\\ggcheckout-mcp\\dist\\index.js', 'utf8');

const idx = content.indexOf('class HttpClient');
if (idx !== -1) {
  console.log(content.substring(idx, idx + 800));
} else {
  // search in dist
  console.log('Search in dist');
}
