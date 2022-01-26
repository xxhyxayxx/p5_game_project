const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?ts$/,
                exclude: /(node_modules|bower_components)/,
                use: 'ts-loader',
            }
        ]
    }
};