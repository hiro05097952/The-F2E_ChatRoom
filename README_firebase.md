# 文件說明
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
