import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  base:"http://localhost:8181/project1/dist/",
  server: {
    host: "localhost", // 在 dev 场景下尽量显示声明 ip、port，防止`vite`启动时ip、port自动获取机制导致不准确的问题
    port: 8081
  },
  // cacheDir: "node_modules/.cacheDir",
  plugins: [
    vue(),
    federation({
      name: 'project1', // 远程模块名称
      filename: 'app.js', // 远程模块入口文件，与本地模块中`remotes`配置相对应
      exposes: {
        './App': './src/App.vue', // 组件名称及其对应文件
      },
      shared: ["vue", "vuex", "element-plus"] // 对外提供的组件所依赖的第三方依赖，这个例子使用了`vue`,`vuex`，此处还可以配置依赖版本，参考`Readme.md`
    }),
    ElementPlus(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'css',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        minifyInternalExports: false
      }
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false
      },
    },
  }
})
