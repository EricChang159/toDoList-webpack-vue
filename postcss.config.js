//引入 npm安裝的 postcss-loader 和 autoprefixer 作用在於優化CSS代碼
//優化需要加前綴的CSS瀏覽器屬性，通過這個語法就會自動生成相容瀏覽器的前綴字

const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer()
    ]
}