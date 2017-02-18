module.exports = {
    entry: './src/Main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_moduels/,
            query: {
                presets:['es2015']
            }
        }]
    },
    devServer: {
        inline: true,
        port: 3000,
        contentBase: __dirname + '/output',
        historyApiFallback: true
    }
};