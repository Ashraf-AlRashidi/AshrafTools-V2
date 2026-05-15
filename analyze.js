const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;

let match;
while ((match = styleRegex.exec(content)) !== null) {
    console.log(`Found <style> from index ${match.index} to ${match.index + match[0].length}, length: ${match[1].length}`);
}

while ((match = scriptRegex.exec(content)) !== null) {
    console.log(`Found <script> from index ${match.index} to ${match.index + match[0].length}, length: ${match[1].length}`);
}
