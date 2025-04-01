const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Adjust the path if your entry point is different
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true, // Clean the output directory before each build
    },
    devServer: {
        static: path.resolve(__dirname, 'build'), // Serve content from the 'build' directory
        port: 3000, // Set the port to 3000
        hot: true, // Enable Hot Module Replacement
        open: true, // Open the browser after server has been started
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            // Add other loaders as needed
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // Ensure this path points to your HTML template
        }),
        // Add other plugins as needed
    ],
};
