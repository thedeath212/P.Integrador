const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        if (options.compilerOptions) {
          options.compilerOptions.whitespace = 'condense'; // Opciones: 'preserve', 'condense'
        } else {
          options.compilerOptions = {
            whitespace: 'condense'
          };
        }
        return options;
      });
  }
});
