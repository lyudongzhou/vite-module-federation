import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
// import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost", // 在 dev 场景下尽量显示声明 ip、port，防止`vite`启动时ip、port自动获取机制导致不准确的问题
    port: 8081
  },
  base:"http://localhost:8181/main/dist/",
  // cacheDir: "node_modules/.cacheDir",
  plugins: [
    vue(),
    federation({
      name: "main", // 远程模块名称，一个服务既可以作为本地模块使用远程模块组件，可以作为远程模块，对外提供组件
      filename: "app.js", // 远程模块入口文件，与本地模块中`remotes`配置相对应
      remotes: {
        project1: "http://localhost:8181/project1/dist/assets/app.js", // 远程模块入口文件的网络地址，用于获取远程模块的`remoteEntry.js`来加载组件
      },
      shared: ["vue", "vuex", "element-plus"] // 远程模块组件使用的第三方依赖，如果本地有可以优先使用本地；在 dev 模式下尽量在本地引用这些第三方依赖，防止第三方组件在 dev 和打包模式下不同导致的问题。
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
    target: 'es2020',
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
