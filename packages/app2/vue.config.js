const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = defineConfig({
    devServer: {
        port: 3003,
    },
    publicPath: 'http://localhost:3003',
    configureWebpack() {
        return {
            plugins: [
                new ModuleFederationPlugin({
                    name: 'app2',
                    filename: 'entry.js',
                    exposes: {
                        './Button': './src/components/Button.vue',
                        './test': './src/test.ts',
                    },
                    shared: {
                        vue: {
                            eager: true,
                            singleton: true,
                        },
                    },
                }),
            ],
        }
    },
    chainWebpack(config) {
        config.optimization.delete('splitChunks')
    },
})
