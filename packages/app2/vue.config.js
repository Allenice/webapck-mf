const { defineConfig } = require('@vue/cli-service')
const { ModuleFederationPlugin } = require('webpack').container
const { MFLiveReloadPlugin } = require('@module-federation/fmr')

module.exports = defineConfig({
    devServer: {
        port: 3003,
    },
    // 开发模式一定要设置 auto 或者写死地址，不如 app1 调用模块的时候，地址就不对了
    publicPath: 'auto',
    configureWebpack() {
        return {
            plugins: [
                // 目前使用联邦模块，hot reload 会失效
                new ModuleFederationPlugin({
                    // 这个 name 会变成 window 的变量
                    name: 'app2',
                    filename: 'entry.js',
                    exposes: {
                        './Button': './src/components/Button.vue',
                        './test': './src/test.ts',
                    },
                    shared: {
                        vue: {
                            singleton: true,
                        },
                    },
                }),
                new MFLiveReloadPlugin({}),
            ],
        }
    },
    chainWebpack(config) {
        config.optimization.delete('splitChunks')
    },
})
