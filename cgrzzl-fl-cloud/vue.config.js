

const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  assetsDir: "static",

  lintOnSave: false, 
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  //文件hash
  filenameHashing: true, 
  configureWebpack: config => {

     return {
       resolve: {
         alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'scss_vars': '@/styles/vars.scss'
         }
       }
     }  
  },
  devServer: {
    overlay:{
      warings:false,
      errors:false
    },
    // proxy: {
    //   '/api': {
        
    //     //dev服务地址
    //     // target: `http://172.16.10.37`,
    //     // target: `http://10.8.7.24:9004`,  //创格线上地址
    //     target: `http://10.8.7.24:9000`,  //创格线上地址
    //     // target: `http://172.25.8.218:9004`,  //本地地址
 
    //     changeOrigin:true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // }
  }


}

