const path = require('path');
module.exports = {
    mode:'production',//production | development
    entry: [
        './src/Assets/Scripts/main.js'
    ],
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js',
    },
};