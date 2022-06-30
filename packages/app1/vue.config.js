const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack() {
        return {
            plugins: [
                new ModuleFederationPlugin({
                    name: 'app1',
                    remotes: {
                        app2: 'app2@[app2Url]/entry.js',
                    },
                    shared: {
                        vue: {
                            eager: true,
                            singleton: true,
                        },
                    },
                }),
                new ExternalTemplateRemotesPlugin(),
            ],
        }
    },
})
