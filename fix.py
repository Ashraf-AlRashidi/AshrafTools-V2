import codecs

path = 'app.js'
content = codecs.open(path, 'r', 'utf-8').read()

# I know that the syntax errors are mostly around backslash escaped template literals,
# e.g., \`  and \${

modified = content.replace('\\`', '`').replace('\\${', '${')

codecs.open(path, 'w', 'utf-8').write(modified)
print("Fixed app.js syntax")
