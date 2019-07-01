//引入所有需要的檔案，並且輸出至webpack!!!打包成一個東西
import Vue from 'vue'
//引入vue資源

import App from './app.vue'
//引入app.vue

//index.js功能為將資料輸出至webpack，再由webpack打包傳遞至，bundle.js。

//style專區
import './assets/styles/global.styl'
import './assets/styles/foot.styl'


const root = document.createElement('div')
document.body.appendChild(root)



//引入vue資源，vue 語法才有效，
//創建一個render方法，(h) 設一個參數，參數內為create app,上面需引入app
new Vue({
    render: (h) => h(App) //設定渲染內容為app.vue
}).$mount(root) //設定渲染在哪個節點

//mount指定渲染節點(元素)，
//整個組件意義為，聲明app渲染到html的內容