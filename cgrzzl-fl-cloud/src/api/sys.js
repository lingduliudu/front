var cfg = {
    // dev: 'http://172.16.10.37',
   dev: "http://10.8.7.24:9000",

   // dev:'http://192.168.21.47',


    // dev_img: 'http://172.16.10.37',
    // dev_download: 'http://172.16.10.37',
    dev_img: 'http://10.8.7.24:9000',
    dev_download: 'http://10.8.7.24:9000',

    //前端web端IP地址
    // dev_web: 'http://172.16.10.37/',
    dev_web: "http://10.8.7.24:9000",





    // //sit环境
    pro: 'http://10.8.7.24:9000',
    pro_img: 'http://10.8.7.24:9000',
    pro_download: 'http://10.8.7.24:9000',
    pro_web: 'http://10.8.7.24:9000',


};

var base_url = '';
var base_web_url = '';
var base_url_img = '';
var base_url_downloads = '';
switch (process.env.NODE_ENV) {
    case "development":
        base_url = cfg.dev;
        base_url_img = cfg.dev_img;
        base_url_downloads = cfg.dev_download;
        base_web_url = cfg.dev_web;
        break;
    case "testing":
        base_url = cfg.dev;
        base_url_download = cfg.dev_download;
        base_web_url = cfg.dev_web;
        break;
    case "production":
        base_url = cfg.pro;
        base_url_img = cfg.pro_img;
        base_url_downloads = cfg.pro_download;
        base_web_url = cfg.pro_web;
        break;
}

export const baseURL = base_url
export const baseURLImg = base_url_img
export const baseURLDownloads = base_url_downloads
export const baseWebURL = base_web_url
