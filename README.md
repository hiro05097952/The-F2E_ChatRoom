# The F2E - ChatRoom

## 運行說明

``` bash
# 安裝
npm install

# 運行測試端在本地:8080
npm run dev

# 建立專案
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 小提示
``` bash
因為登入名稱還沒寫得很完善，如果之前登入過的話請直接在路徑後面加上home進入首頁
```
# FireBase 資料說明
### FireStore 命名
    集合{}(全大寫)  =>  文件{}(小駝峰)  =>  欄位(key)

### Login 登入頁面
    功能：隨機命名，設定名字
    集合資料：{ACCOUNT} => {name} => [random]
                                   =>  [users]
    取得資料：userName => '集點送紅利' 存進 localStrage

### Home 首頁
    組件：navbar + tototalks + addpen

### TodaysTopic 本日話題聊天室
    1. 集合資料：{TODAYTOPIC} => {chatRoom} => todayTitle : 毛小孩
                                          => titleStore : [ 主題 ]
                                          => {length}=> length : 0
                                                集合           文件            欄位
                                          => {MESSAGE} => {message001} => { content }

    2. 訊息資料
     content: {
        sender: userName
        text: '今天晚餐要吃啥呢'
        stamp: all/bird/smell
        sendTime: (未開發)
        image: (未開發)
      }

    3. 小筆記
    ps.1 辨別自己or別人: 對照 userName 並加上 class="me"
    ps.2 聊天室訊息顏色: users.index % 4 === 0藍/1黃/2紫/3橘 
         (線上使用者名單位置去除4種顏色，取餘數)
    ps.3 4種顏色
         pink: #F6C2C2; -- default
         blue: #AFCAFF;
         purple: #E8CDF3;
         yellow: #F3E171;


### TotoTalk
    1. 組件： 
    TotoTalk => TotoHome (預設) => tototalks(firebase取全部聊天室資訊)

             => TotoChat (聊天室) => ChatContent(firebase取聊天訊息) + 取自己名字(從vuex)
                從vuex取聊天室訊息 => typebar (firebase取 '聊天室資訊' ，並塞進vuex)

    ps.1 組件先渲染，因此從組件先取firebase，大頁面再從vuex拿
    ps.2 聊天室資訊：length, color, title, poster

    2. 集合資料
     偷偷說首頁    瀏覽文章/新增    聊天室資訊     值
    {TOTOTALK} => {'toto01'} =>  title:   '紅利聊天室' 
                               =>  length
                               =>  color
                               =>  poster
                               =>  roomID
                                    集合          聊天室訊息         值
                               => {MESSAGE} => {message001} => {content}

# 心得

```bash
首先...先來許個願，
希望UI下次資料可以提供斜線的背景（拜託
上週嘗試用css寫出的間距是差蠻多的，兩週都是自己另外畫一張出來XＤ

這週的關卡...量比想像中來得太多，有些功能還沒做到齊全
還是單純是我挑了個內容比較豐富的設計(!?

這次使用的資料庫是firebase，雖然google寫得超好懂的（但第一次碰還是卡了很久

在建構資料層以及命名參考了這篇文章
[Cloud Firestore β: (4) 規劃一個聊天室的資料模型](https://ithelp.ithome.com.tw/articles/10205855)

另外還要去規劃資料該儲存在 vuex 還是 firebase ，
其中困擾蠻久的是userName... 最後決定存在localStorage

還有這次嘗試把組件分的較多較明確
但到中間發現自己的命名實在太爛一直搞混
只好寫了個小筆記邊紀錄哪個組件取什麼資料）

在新增偷偷說的頁面，
```
