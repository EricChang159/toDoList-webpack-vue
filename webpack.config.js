//首先設定好引入的資料，並且設定好把包後的檔案名稱，與輸出路徑，在設定好讀取輸出資料規則(編譯工具)，然後輸出成一個js檔
//建置完成後 安裝 webpack-dev-server 開發者的模式，可以同時開發這個檔案又將檔案在網頁中使用，
//但是開發模式跟上市模式訴求又不同(一個要有除錯模式，另一個不需要，才會跑比較快)，所以要設定條件，判定現在是開發用還是上市用，
//package.json要輸入 "dev": "webpack-dev-server --config webpack.config.js"
//同時要安裝 npm i cross-env 可以解決，windows跟mac上語法差異，就不用寫兩個版本條件。
//還有一個很重要要安裝的 html-webpack-plugin，功能是將pack好的js檔，能夠順利地輸出HTML中(感覺自己引用就可以了!?)
const path = require("path"); //目前不明白require用法(待查)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const HTMLPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const webpack = require("webpack"); //特別注意要引用
//設置判斷開發或上市模式變量，加以判斷，這邊用的是process物件的語法
//process是用來讀取package.json的變量名稱資料的方法。 很神
//並且將module.exports移至下方，新增const config變量取代(目前不知為何)
const ExtractPlugin = require('extract-text-webpack-plugin')
//作品已完成，但是如果一次就載入所有檔案，不是線上環境想要的效果，所以用這個工具，可以把指定的檔案拉出來，
//這次拉的是CSS stylus的代碼。
//安裝 npm install --save-dev extract-text-webpack-plugin
//用來幫我們把非JS原生代碼，拉出來，像是我們打包好的CSS語言存進去了js中，拉出來單獨變成會CSS會比較好。


const config = {
    target: "web",
    //於全局加入便量web，定一目標為web上市平台，
    entry: path.join(__dirname, "src/index.js"), //入口
    //__dirname 意義為此資料的資料夾所在路徑
    //path.join語法 path.join(根目錄,檔案位置) 由根目錄+檔案位置 就是絕對位置
    //output 為出口 filename 在run build時會創建指定文件
    //此時index.js資料(vue阿或是img,css樣式等等)傳入至webpack，再進行打包轉換再以下output至bundle.js
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname, "dist") //在根目錄下創建dist檔案，沒檔名為資料夾
    },
    module: {
        //建立規則，此範例webpack尚未支援vue，所以要創建一個規則，陣列中的物件
        rules: [{
                //規則 test: 正規表達是/.vue$/ 意旨只要是.vue結尾的都套用，下面loader:"vue-loader"
                test: /\.vue$/,
                loader: "vue-loader"
            },

            {
                test: /\.(gif|jpg|jpeg|svg|png)$/,
                use: [{
                    loader: "url-loader", //url-loader，這邊用option配置對象，指定操作方式，每張照片名稱都不一樣所以不能用上述方法
                    options: {
                        limit: 1024, //利用限制方法，將大小為1024以下的檔案，以64位元輸出
                        name: "[name]-pack.[ext]" //'[name]-名稱自訂.[ext]'ext是文件的擴展名
                        //以上loader都要確定有安裝，用node npm 進行安裝。
                    }
                }]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader"

            },

        ]
    },
    plugins: [
        //可接收很多個plugin，不清楚plugin意義，!!!!!!!!!!!!!!!!!!!!!!!!!!!
        new webpack.DefinePlugin({
            //定義是哪一個
            "process.env": {
                //定義一個變量，條件定義，但段是哪個階段，vue的部分會自己會判斷環境加載，雙引號輸出才是字串。
                NODE_ENV: isDev ? "'development'" : "'production'"
            }
        }),
        new HTMLPlugin() //如何具體的去使用，有很多配置項目，他就有辦法讀取。!!!!!!!!!!!!!!!!!!!!!!!
    ]
};

if (isDev) { //開發環境專用工具都在這裡
    config.module.rules.push({ //直接使用CSS代碼，
        test: /\.styl/,

        use: [
            "style-loader",
            "css-loader",
            {
                loader: "postcss-loader", //功能由下往上丟，接收stylus-loader傳過來的資料進行處理
                options: { //然後處理完再丟給css-loader
                    //此處功能就是說，stylus已經會提供sourceMap
                    //而postcss-loader也是提供source，語法就是在跟他說已經是了，不要再轉格式!?，增加效率
                    //這都是既定用法~
                    sourceMap: true
                }
            },
            "stylus-loader"
        ]

    })
    config.devtool = "#cheap-module-eval-source-map";
    config.devServer = {
            //devServe為webpack2新增物件語法
            port: 8000,
            host: "0.0.0.0",
            //host設置這樣的好處，可以透過localhost 0.0.0.1進行訪問
            //也可透過本機內網ip進行訪問，可以在別人電腦上訪問，也可用手機，如果直接設定成localhost就沒有這兩個好處
            overlay: {
                //基本配置用來報錯
                errors: true
            }, //historyFallback 好像也是常用語法
            hot: true //啟動熱加載，不需要重置頁面就會自動刷新，正常來說需要寫語法來處理熱加載過程，怎麼處理是要自己定義的
            //但是因為這邊用的是vue，vue-loader就自動加載模塊功能，所以不需要額外編寫處理熱加載的方法。
            //不知道是不是單頁面應用的方法，需要再研究!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        },
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(), //啟動hot功能的插件
            new webpack.NoEmitOnErrorsPlugin() //減少不需要的信息展示
        );
} else { //正式環境特別部分都寫在這裡
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue'] //不常會更動到的代碼(類庫帶碼)，因為每次的build代碼會越來越大，所以要將業務邏輯代碼分離。
    }
    config.output.filename = '[name].[chunkhash:8].js' //hash可以看成節點，節點的名稱，如果用hash是整個大節點dom概念的名稱
    //那chunkhash是每隔小節點的名稱命名，這樣就可以讓名稱不一樣，可以以此分開dev 與上市的檔案
    config.module.rules.push({ //希望在線上環境中可以分離CSS檔案
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader', //style-loader適用來CSS-loader的CSS語言轉為js語言，讓他可以輸出在html中的style標籤
            use: [ //但這邊是要輸出成CSS，放入css檔中，所以不需要style-loader在編寫成js語法
                "css-loader",
                {
                    loader: "postcss-loader", //功能由下往上丟，接收stylus-loader傳過來的資料進行處理
                    options: { //然後處理完再丟給css-loader
                        //此處功能就是說，stylus已經會提供sourceMap
                        //而postcss-loader也是提供source，語法就是在跟他說已經是了，不要再轉格式!?，增加效率
                        //這都是既定用法~
                        sourceMap: true
                    }
                },
                "stylus-loader"
            ]

        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'), //設定名稱
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime' //將webpack生成代碼集中起來，webpack會給每個模塊命名，但因為當更動webpack的時候，會在檔案build的過程中，插入編譯碼，造成會有順序上的問題
            //如此一來會影響到chunkhash值(因為是以節點命名)，這樣想用hash長緩存的效果就會沒有(常緩存是??)，所以把webpack板模分開，就可以避免這個問題，必須放在vendor以後否則會失效，
            //因為，webpack板模在最後面，就不會有順序問題
        })

    )
}

module.exports = config;

//webpack 設置檔案入口以及檔案出口，在npm urn build 會進行組合，
//整個功能為，將設置的index.js(index為我們的要求文件，希望能達成的功能)入口檔案，做處理，並在指定輸出的地方，產生一個文件
//bundle文件，打包我們輸入的要求，範例要求為，(渲染內容app,與vue語法引入)
//輸出後的js建，為直接能在瀏覽器上運行的js代碼。
//最後在package.json 的build裡面輸入
//webpack --config 你的webpack檔案名稱
//並在cmd上輸入 npm run build，在build上指定 可為區域變數，全局變量可能會有版本問題

//結語:將靜態類型資源，打包結合再一起變成一個js，後可直接可在html上運行，在開發時通常會有很多零碎的js，
//打包一起 可以減少http請求，第二點模塊依賴，若有新項目就不需要再重寫一遍，可以直接引用模塊，
//如果網頁都引用同一個js檔，改名子或是更動就會顯得困難，
//就像夾自助餐一樣，想吃什麼就夾什麼，想要什麼功能就放什麼，打包再一起通通拿去做撒尿牛完，打包成一個便當