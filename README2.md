 集合 => 文件 => 欄位
全大寫 =>小駝峰
  {}  =>  {}  =>  key

Login (隨機名字 / 設定名字)
  {ACCOUNT} => {name} => [random]
                      => [users]

  userName: '集點送紅利' >>> localStrage

首頁
  右上角帳號: userName

本日話題 >>>> 聊天室
  {TODAYTOPIC} => {chatRoom} => todayTitle : 毛小孩
                             => titleStore : [ 主題 ]
               => {length}   => length : 0
                             新增集合          文件
                             => {MESSAGE} => {message001} => { content }
                                          => {message002} => { content }...
  const content: {
    sender: userName
    text: '今天晚餐要吃啥呢' <input v-model>
    stamp:
    // sendTime:
    // image:
  }
  * 自己or別人: <li :class="{ 'me' : content.account === userName }">
  * color: (對人顯示)  users.index % 4 === 0藍/1黃/2紫/3橘
  * $_pink: #F6C2C2; -- 預設
    $_blue: #AFCAFF;
    $_purple: #E8CDF3;
    $_yellow: #F3E171;

偷偷說 >>>>      瀏覽文章/新增    聊天室     ID
  {TOTOTALK} => {'toto01'} => title: '紅利聊天室' 
                           => length
                           => color
                           => poster
                           => roomID
                           => {MESSAGE} => {message001} => {content}
             => {'toto02'}

偷偷說組件
TotoTalk => TotoHome (預設) => tototalks => 取得所有聊天室資訊

         => TotoChat (聊天室)     => ChatContent 取訊息 + 取自己名字(從vuex)
            從Vuex取聊天視訊息      => typebar 取聊天室資訊 (length, color, title, poster)
            把length 塞進 vuex        * * * 組件先渲染，因此從組件先取，大頁面再從Vuex拿