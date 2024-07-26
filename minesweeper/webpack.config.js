const path = require('path');

module.exports = (env) => {
    console.log('env: ', env);

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js'
        },
        module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ] 
        }]
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'build'),
            },
            host: '0.0.0.0',
            port: 8080
        },
        devtool: env.production ? "source-map" : "eval-cheap-source-map"
    };
}