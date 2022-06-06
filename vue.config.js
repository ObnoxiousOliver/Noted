const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pages: {
    index: {
      entry: 'src/renderer/index.ts'
    }
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/index.js',
      preload: 'src/main/preload.js'
    }
  }
})
