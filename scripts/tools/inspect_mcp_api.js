const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Admin\\AppData\\Local\\npm-cache\\_npx\\fb1dd8fe0df11c96\\node_modules\\ggcheckout-mcp\\dist\\index.js', 'utf8');

const matches = content.match(/https?:\/\/[a-zA-Z0-9\.\-\_\:\/]+/g);
console.log('URLs:', Array.from(new Set(matches)));

// Look for baseURL or headers
const baseMatch = content.match(/baseURL[^\,]+/g);
console.log('BaseURL match:', baseMatch);
