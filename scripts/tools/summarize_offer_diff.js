const { execSync } = require('child_process');

const diff = execSync('"C:\\Program Files\\Git\\cmd\\git.exe" diff HEAD:tabuada-offer.html upstream/main:tabuada-offer.html', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

console.log('Total diff length:', diff.length);

// Look for added sections or scripts
const addedLines = diff.split('\n').filter(l => l.startsWith('+') && !l.startsWith('+++'));
console.log('Added lines count:', addedLines.length);

const keywords = ['pixel', 'utm', 'ggcheckout', 'checkout', 'security', 'anti-clone', 'video', 'duolingo', 'preview', 'vercel'];
for (const kw of keywords) {
  const matches = addedLines.filter(l => l.toLowerCase().includes(kw));
  console.log(`Keyword "${kw}": ${matches.length} matches. Sample:`, matches.slice(0, 2));
}
