const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(htmlPath, 'utf8');

// 1. Extract Styles
const styleRegex = /<style>([\s\S]*?)<\/style>/g;
let stylesContent = '';
let htmlWithoutStyles = content.replace(styleRegex, (match, p1) => {
    stylesContent += p1 + '\n';
    return '';
});
// Add link to styles.css before </head>
htmlWithoutStyles = htmlWithoutStyles.replace('</head>', '  <link rel="stylesheet" href="styles.css">\n</head>');


// 2. Extract Scripts
// Firebase (module)
const firebaseRegex = /<script type="module">([\s\S]*?)<\/script>/;
let firebaseMatch = htmlWithoutStyles.match(firebaseRegex);
if (firebaseMatch) {
    fs.writeFileSync(path.join(__dirname, 'firebase-config.js'), firebaseMatch[1].trim(), 'utf8');
    htmlWithoutStyles = htmlWithoutStyles.replace(firebaseRegex, '<script type="module" src="firebase-config.js"></script>');
}

// Supabase and AI Judge and Main App are regular <script>
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let scriptBlocks = [];
while ((match = scriptRegex.exec(htmlWithoutStyles)) !== null) {
    scriptBlocks.push({ full: match[0], content: match[1] });
}

// scriptBlocks[0] -> Supabase Auth
// scriptBlocks[1] -> AI Judge
// scriptBlocks[2] -> Main App
if (scriptBlocks.length >= 3) {
    fs.writeFileSync(path.join(__dirname, 'auth.js'), scriptBlocks[0].content.trim(), 'utf8');
    htmlWithoutStyles = htmlWithoutStyles.replace(scriptBlocks[0].full, '<script src="auth.js"></script>');

    fs.writeFileSync(path.join(__dirname, 'ai-judge.js'), scriptBlocks[1].content.trim(), 'utf8');
    htmlWithoutStyles = htmlWithoutStyles.replace(scriptBlocks[1].full, '<script src="ai-judge.js"></script>');

    fs.writeFileSync(path.join(__dirname, 'app.js'), scriptBlocks[2].content.trim(), 'utf8');
    htmlWithoutStyles = htmlWithoutStyles.replace(scriptBlocks[2].full, '<script src="app.js"></script>');
}

// Write the files
fs.writeFileSync(path.join(__dirname, 'styles.css'), stylesContent.trim(), 'utf8');
fs.writeFileSync(htmlPath, htmlWithoutStyles, 'utf8');

console.log('✅ تم فصل وتنسيق الملفات بنجاح!');
