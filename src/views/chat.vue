<template>
  <div>
   <aside id="sidebar_rptb"  v-if="open==true" class="sidebar_rptb active" style="width:360px">
       <div id="rptb" class="rptb" style="visibility: visible; height: 792px;" data-simplebar="init">
           <div class="simplebar-wrapper" style="margin: 0px;">
               <div class="simplebar-height-auto-observer-wrapper">
                   <div class="simplebar-height-auto-observer">
                    </div>
                </div>
                <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                        <div class="simplebar-content-wrapper" style= "height:auto,overflow:hidden scroll">
                        <div class="simplebar-content" style="padding: 0px;">
                        <div id="rptb_header" class="rptb_header" @click="close">
                            <button type="button" class="btn_toggle-sidebar_rptb btn btn-link">
                                <i class="xi-2x xi-arrow-right" ></i>
                            </button>
                            <span id="rptb_cnt" class="rptb_cnt">
                            <span id="commentCount256_1">3</span></span></div>
                        <div id="entry256Comment">
                          <div id="reply_list" class="reply_list" data-content="댓글 부탁드려요" style="min-height: 551px;">
                              <ul id="reply_container" class="reply_container">
                                
                                  <li id="comment13743589" class="rp_general">
                                    <div class="info_custom">
                                      <div class="writer"><img src="//i1.daumcdn.net/thumb/C50x50/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&amp;fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_S.png" class="img_profile" alt="프로필사진"> <span class="edit" onclick="open_edit_window(&quot;edit_comment13743589&quot;)"><i class="xi-plus-circle"></i></span>
                                        <div id="edit_comment13743589" class="edit_window" style="display:none"><a href="#" onclick="commentRequireLogin(); return false;commentComment(13743589); return false" class="link_re">댓글 </a><a href="#" onclick="deleteComment(13743589);return false" class="link_edit">수정/삭제</a></div><span class="nickname"><img src="https://lullu-lalla.tistory.com/favicon.ico" width="16" height="16" alt="Favicon of https://lullu-lalla.tistory.com" onerror="this.onerror=null;this.parentNode.removeChild(this)">  <a href="https://lullu-lalla.tistory.com" onclick="return openLinkInNewWindow(this)">binbing</a><span class="tistoryProfileLayerTrigger" onclick="TistoryProfile.show(event, this, {&quot;blogId&quot;:&quot;2773470&quot;,&quot;title&quot;:&quot;Bing's&quot;,&quot;url&quot;:&quot;https:\/\/lullu-lalla.tistory.com&quot;,&quot;nickname&quot;:&quot;binbing&quot;,&quot;items&quot;:[],&quot;isSubscriber&quot;:false,&quot;device&quot;:&quot;web_pc&quot;}); return false;"></span></span> <span class="date">2021.02.25 09:49 <a href="/toolbar/popup/abuseReport/?entryId=256&amp;commentId=13743589" onclick="window.open(this.href, 'ThisBlogReportPopup', 'width=550, height=510, toolbar=no, menubar=no, status=no, scrollbars=no'); return false;">신고</a></span>
                                      </div>
                                    </div>
                                    <div class="desc"><span class="txt_reply">댓글창 싱기방기~~ <br>
안그래도 궁금했던 내용이었어용~</span></div>
                                    
                                      <ul id="re_reply_container" class="re_reply_container">
                                        
                                          <li id="comment13743716" class="re_reply rp_admin">
                                            <div class="info_custom">
                                              <div class="writer"><img src="//i1.daumcdn.net/thumb/C50x50/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&amp;fname=https%3A%2F%2Ftistory2.daumcdn.net%2Ftistory%2F2115043%2Fattach%2F3f35c988f50c4cdbb87d46663913d91b" class="img_profile" alt="프로필사진"> <span class="edit" onclick="open_edit_window(&quot;edit_comment13743716&quot;)"><i class="xi-plus-circle-o"></i></span>
                                                <div id="edit_comment13743716" class="edit_window" style="display:none"><a href="#" onclick="deleteComment(13743716); return false;" class="link_edit">수정/삭제</a></div><span class="nickname"><img src="https://ux.stories.pe.kr/favicon.ico" width="16" height="16" alt="Favicon of https://ux.stories.pe.kr" onerror="this.onerror=null;this.parentNode.removeChild(this)">  <a href="https://ux.stories.pe.kr" onclick="return openLinkInNewWindow(this)">어쩌다보니여기까지</a><span class="tistoryProfileLayerTrigger" onclick="TistoryProfile.show(event, this, {&quot;blogId&quot;:&quot;2115043&quot;,&quot;title&quot;:&quot;UX \uacf5\uc791\uc18c&quot;,&quot;url&quot;:&quot;https:\/\/uxgjs.tistory.com&quot;,&quot;nickname&quot;:&quot;\uc5b4\uca4c\ub2e4\ubcf4\ub2c8\uc5ec\uae30\uae4c\uc9c0&quot;,&quot;items&quot;:[],&quot;isSubscriber&quot;:false,&quot;device&quot;:&quot;web_pc&quot;}); return false;"></span></span> <span class="date">2021.02.25 12:52 <a href="/toolbar/popup/abuseReport/?entryId=256&amp;commentId=13743716" onclick="window.open(this.href, 'ThisBlogReportPopup', 'width=550, height=510, toolbar=no, menubar=no, status=no, scrollbars=no'); return false;">신고</a></span>
                                              </div>
                                            </div>
                                            <div class="desc"><span class="txt_reply">감사합니다 ~~</span></div>
                                          </li>
                                        
                                      </ul>
                                    
                                  </li>
                                
                                  <li id="comment13786969" class="rp_general">
                                    <div class="info_custom">
                                      <div class="writer"><img src="//i1.daumcdn.net/thumb/C50x50/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&amp;fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_S.png" class="img_profile" alt="프로필사진"> <span class="edit" onclick="open_edit_window(&quot;edit_comment13786969&quot;)"><i class="xi-plus-circle"></i></span>
                                        <div id="edit_comment13786969" class="edit_window" style="display:none"><a href="#" onclick="commentRequireLogin(); return false;commentComment(13786969); return false" class="link_re">댓글 </a><a href="#" onclick="deleteComment(13786969);return false" class="link_edit">수정/삭제</a></div><span class="nickname"><img src="https://h2ksp2.tistory.com/favicon.ico" width="16" height="16" alt="Favicon of https://h2ksp2.tistory.com" onerror="this.onerror=null;this.parentNode.removeChild(this)">  <a href="https://h2ksp2.tistory.com" onclick="return openLinkInNewWindow(this)">금실장</a></span> <span class="date">2021.04.25 19:16 <a href="/toolbar/popup/abuseReport/?entryId=256&amp;commentId=13786969" onclick="window.open(this.href, 'ThisBlogReportPopup', 'width=550, height=510, toolbar=no, menubar=no, status=no, scrollbars=no'); return false;">신고</a></span>
                                      </div>
                                    </div>
                                    <div class="desc"><span class="txt_reply">ㄴㄹㄴㅇㄹㅇㄴㄹ</span></div>
                                    
                                  </li>
                                
                                <div id="edit_dummy" class="edit_dummy" onclick="close_edit_window()"></div>
                              </ul>
                            
                          </div>
                          <form method="post" action="/comment/add/256" onsubmit="return false" style="margin: 0">
                            <div id="reply_write" class="reply_write">
                                
                              <div class="form_reg">
                                
                                  
                                    <div class="form_guest">
                                      <input name="name" v-model="userName" title="이름" placeholder="이름" class="input_comment comment_name" tabindex="2"> 
                                      <textarea id="comment" name="comment" class="input_comment comment_textarea" placeholder="입력해주세요." tabindex="1"></textarea>
                                  
                                  <div class="input_comment_checkbox"><input id="comment_secret" class="comment_secret" name="secret" type="checkbox" tabindex="4"> <label for="comment_secret"></label></div>
                                <button type="button" onclick="addComment(this, 256); return false;" id="btn_submit" class="btn_submit btn btn-link"><i class="xi-send xi-x"></i></button>
                              </div>
                            </div>
                          </form>
                          
                        </div>
                      </div></div></div></div><div class="simplebar-placeholder" style="width:auto,height:800px">
                          </div></div>
                          <div class="simplebar-track simplebar-horizontal" style="visibility:hidden">
                              <div class="simplebar-scrollbar" style="width:0px,display:none">
                                  
                            </div>
  </div>
  </div>
  </aside>
  <aside  v-else id="sidebar_rptb" class="sidebar_rptb" @click="openModal" style="width:50px">
       <div id="rptb" class="rptb" style="visibility: visible; height: 792px;" data-simplebar="init">
           <div class="simplebar-wrapper" style="margin: 0px;">
               <div class="simplebar-height-auto-observer-wrapper">
                   <div class="simplebar-height-auto-observer">
                    </div>
                </div>
                <div class="simplebar-mask">
                    <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                        <div class="simplebar-content-wrapper" style="height:100%,overflow:scroll hidden">
                        <div class="simplebar-content" style="padding: 0px;">
                        <div id="rptb_header" class="rptb_header">
                            <button type="button" class="btn_toggle-sidebar_rptb btn btn-link">
                                <i class="xi-2x xi-message" ></i>
                            </button>
                            <span id="rptb_cnt" class="rptb_cnt">
                            <span id="commentCount256_1">3</span></span></div>
                        <div id="entry256Comment">
                          <div id="reply_list" class="reply_list" data-content="댓글 부탁드려요" style="min-height: 551px;">
                              <ul id="reply_container" class="reply_container">
                                
                                  <li id="comment13743589" class="rp_general">
                                    <div class="info" style="background-color:none !important;">
                                      <div class="writer"><img src="//i1.daumcdn.net/thumb/C50x50/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&amp;fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_S.png" class="img_profile" alt="프로필사진"> <span class="edit" onclick="open_edit_window(&quot;edit_comment13743589&quot;)"><i class="xi-plus-circle"></i></span>
                                        <div id="edit_comment13743589" class="edit_window" style="display:none"><a href="#" onclick="commentRequireLogin(); return false;commentComment(13743589); return false" class="link_re">댓글 </a><a href="#" onclick="deleteComment(13743589);return false" class="link_edit">수정/삭제</a></div><span class="nickname"><img src="https://lullu-lalla.tistory.com/favicon.ico" width="16" height="16" alt="Favicon of https://lullu-lalla.tistory.com" onerror="this.onerror=null;this.parentNode.removeChild(this)">  <a href="https://lullu-lalla.tistory.com" onclick="return openLinkInNewWindow(this)">binbing</a><span class="tistoryProfileLayerTrigger" onclick="TistoryProfile.show(event, this, {&quot;blogId&quot;:&quot;2773470&quot;,&quot;title&quot;:&quot;Bing's&quot;,&quot;url&quot;:&quot;https:\/\/lullu-lalla.tistory.com&quot;,&quot;nickname&quot;:&quot;binbing&quot;,&quot;items&quot;:[],&quot;isSubscriber&quot;:false,&quot;device&quot;:&quot;web_pc&quot;}); return false;"></span></span> <span class="date">2021.02.25 09:49 <a href="/toolbar/popup/abuseReport/?entryId=256&amp;commentId=13743589" onclick="window.open(this.href, 'ThisBlogReportPopup', 'width=550, height=510, toolbar=no, menubar=no, status=no, scrollbars=no'); return false;">신고</a></span>
                                      </div>
                                    </div>
                                    <div class="desc"><span class="txt_reply">댓글창 싱기방기~~ <br>
안그래도 궁금했던 내용이었어용~</span></div>
                                    
                                      <ul id="re_reply_container" class="re_reply_container">
                                        
                                          <li id="comment13743716" class="re_reply rp_admin">
                                            <div class="info">
                                              <div class="writer"><img src="//i1.daumcdn.net/thumb/C50x50/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&amp;fname=https%3A%2F%2Ftistory2.daumcdn.net%2Ftistory%2F2115043%2Fattach%2F3f35c988f50c4cdbb87d46663913d91b" class="img_profile" alt="프로필사진"> <span class="edit" onclick="open_edit_window(&quot;edit_comment13743716&quot;)"><i class="xi-plus-circle-o"></i></span>
                                                <div id="edit_comment13743716" class="edit_window" style="display:none"><a href="#" onclick="deleteComment(13743716); return false;" class="link_edit">수정/삭제</a></div><span class="nickname"><img src="https://ux.stories.pe.kr/favicon.ico" width="16" height="16" alt="Favicon of https://ux.stories.pe.kr" onerror="this.onerror=null;this.parentNode.removeChild(this)">  <a href="https://ux.stories.pe.kr" onclick="return openLinkInNewWindow(this)">어쩌다보니여기까지</a><span class="tistoryProfileLayerTrigger" onclick="TistoryProfile.show(event, this, {&quot;blogId&quot;:&quot;2115043&quot;,&quot;title&quot;:&quot;UX \uacf5\uc791\uc18c&quot;,&quot;url&quot;:&quot;https:\/\/uxgjs.tistory.com&quot;,&quot;nickname&quot;:&quot;\uc5b4\uca4c\ub2e4\ubcf4\ub2c8\uc5ec\uae30\uae4c\uc9c0&quot;,&quot;items&quot;:[],&quot;isSubscriber&quot;:false,&quot;device&quot;:&quot;web_pc&quot;}); return false;"></span></span> <span class="date">2021.02.25 12:52 <a href="/toolbar/popup/abuseReport/?entryId=256&amp;commentId=13743716" onclick="window.open(this.href, 'ThisBlogReportPopup', 'width=550, height=510, toolbar=no, menubar=no, status=no, scrollbars=no'); return false;">신고</a></span>
                                              </div>
                                            </div>
                                            <div class="desc"><span class="txt_reply">감사합니다 ~~</span></div>
                                          </li>
                                        
                                      </ul>
                                    
                                  </li>
                                
                                  <li id="comment13786969" class="rp_general">
                                    <div class="info">
                                      <div class="writer"><img src="//i1.daumcdn.net/thumb/C50x50/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&amp;fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_S.png" class="img_profile" alt="프로필사진"> <span class="edit" onclick="open_edit_window(&quot;edit_comment13786969&quot;)"><i class="xi-plus-circle"></i></span>
                                        <div id="edit_comment13786969" class="edit_window" style="display:none"><a href="#" onclick="commentRequireLogin(); return false;commentComment(13786969); return false" class="link_re">댓글 </a><a href="#" onclick="deleteComment(13786969);return false" class="link_edit">수정/삭제</a></div><span class="nickname"><img src="https://h2ksp2.tistory.com/favicon.ico" width="16" height="16" alt="Favicon of https://h2ksp2.tistory.com" onerror="this.onerror=null;this.parentNode.removeChild(this)">  <a href="https://h2ksp2.tistory.com" onclick="return openLinkInNewWindow(this)">금실장</a></span> <span class="date">2021.04.25 19:16 <a href="/toolbar/popup/abuseReport/?entryId=256&amp;commentId=13786969" onclick="window.open(this.href, 'ThisBlogReportPopup', 'width=550, height=510, toolbar=no, menubar=no, status=no, scrollbars=no'); return false;">신고</a></span>
                                      </div>
                                    </div>
                                    <div class="desc"><span class="txt_reply">ㄴㄹㄴㅇㄹㅇㄴㄹ</span></div>
                                    
                                  </li>
                                
                                <div id="edit_dummy" class="edit_dummy" onclick="close_edit_window()"></div>
                              </ul>
                            
                          </div>
                          <form method="post" action="/comment/add/256" onsubmit="return false" style="margin: 0">
                            <div id="reply_write" class="reply_write">
                                <textarea id="comment" name="comment" class="input_comment comment_textarea" placeholder="입력해주세요." tabindex="1"></textarea>
                              <div class="form_reg">
                                
                                  
                                    <div class="form_guest"><input name="name" value="" title="이름" placeholder="이름" class="input_comment comment_name" tabindex="2"> <input type="password" name="password" value="" title="비밀번호" maxlength="12" placeholder="비밀번호" class="input_comment comment_password" tabindex="3"></div>
                                  
                                  <div class="input_comment_checkbox"><input id="comment_secret" class="comment_secret" name="secret" type="checkbox" tabindex="4"> <label for="comment_secret"></label></div>
                                <button type="button" onclick="addComment(this, 256); return false;" id="btn_submit" class="btn_submit btn btn-link"><i class="xi-send xi-x"></i></button>
                              </div>
                            </div>
                          </form>
                          
                        </div>
                      </div></div></div></div><div class="simplebar-placeholder" style="width:auto,height:615px">
                          </div></div>
                          <div class="simplebar-track simplebar-horizontal" style="visibility: visible">
                              <div class="simplebar-scrollbar" style="width:25px,display:block,transform:translate3d(0px, 0px, 0px)"></div></div><div class="simplebar-track simplebar-vertical" style="visibility: visible;"><div class="simplebar-scrollbar" style="height: 784px; display: block; transform: translate3d(0px, 8px, 0px);">
                                  
                            </div>
  </div>
  </div>
  </aside>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      flag: "",
      userName: "",
      message: "",
    };
  },
  props: {
    open: Boolean,
    userInfo: Object,
  },
  created() {
    this.uplodaUser();
  },
  computed: {},
  methods: {
    close() {
      this.$emit("closeit");
    },
    openModal() {
      this.$emit("openit");
    },
    uplodaUser() {
      if (this.userInfo != null) {
        this.userName = this.userInfo.name;
      }
    },
  },
};
// var rptb_right_loading_false = document.getElementsByClassName("rptb_right_loading_false"),
//                               edit_date = document.getElementsByClassName("date"),
//                               edit_window = document.getElementsByClassName("edit_window"),
//                               edit_dummy = document.getElementById("edit_dummy"),
//                               eleRptb = document.getElementById("rptb"),
//                               adsenseHeight = 70,
//                               list = "",
//                               list_content = "",
//                               list_content_wrapper = "",
//                               list_content_height = "",
//                               list_content_wrapper_height = "",
//                               scrollStep = "";

//                             function init_basic() {
//                               list = document.getElementById("rptb"), setTimeout((function() {
//                                 setTimeout((function() {
//                                   setSecretTag()
//                                 }), 300), new MutationObserver(e => {
//                                   e.some(e => {
//                                     e.addedNodes.length >= 3 && rptb_right_loading_false.length && (setRptbElementPosition(), setExpendToggle())
//                                   })
//                                 }).observe(list, {
//                                   attributes: !1,
//                                   childList: !0,
//                                   characterData: !1,
//                                   subtree: !0
//                                 })
//                               }), 300)
//                             }

//                             function init_extend() {
//                               list = document.getElementById("rptb"), var_ads_client && var_ads_rptb_slot && setAdsense("observer", "reply_write", var_ads_client, var_ads_rptb_slot), setRptbInnerHeight(), setTimeout((function() {
//                                 setTimeout((function() {
//                                   setSecretTag(), scrollToBottom(200)
//                                 }), 300), new MutationObserver(e => {
//                                   list_content_wrapper = document.getElementsByClassName("simplebar-content-wrapper")[0], e.some(e => {
//                                     if (e.addedNodes.length >= 5) return setRptbInnerHeight(), setRptbWidth(), setSecretTag(), scrollToBottom(200), list_content_wrapper.scrollTop += 200
//                                   })
//                                 }).observe(list, {
//                                   attributes: !1,
//                                   childList: !0,
//                                   characterData: !1,
//                                   subtree: !0
//                                 })
//                               }), 300)
//                             }

//                             function init_extend_backup() {
//                               setTimeout((function() {
//                                 list = document.getElementById("rptb"), list_content = document.getElementsByClassName("simplebar-content")[0], list_content_wrapper = document.getElementsByClassName("simplebar-content-wrapper")[0], setTimeout((function() {
//                                   scrollToBottom(200)
//                                 }), 1e3), new MutationObserver(e => {
//                                   list_content_wrapper = document.getElementsByClassName("simplebar-content-wrapper")[0], e.some(e => {
//                                     if (e.addedNodes.length > 5) return setRptbInnerHeight(), setRptbWidth(), setSecretTag(), scrollToBottom(200), var_ads_client && var_ads_rptb_slot && setAdsense("observer", "reply_write", var_ads_client, var_ads_rptb_slot), list_content_wrapper.scrollTop += 200
//                                   })
//                                 }).observe(list, {
//                                   attributes: !1,
//                                   childList: !0,
//                                   characterData: !1,
//                                   subtree: !0
//                                 })
//                               }), 300)
//                             }

//                             function setRptbElementPosition() {
//                               var e = document.querySelector(".reply_container"),
//                                 t = document.querySelector(".tt_more_preview_comments_wrap");
//                               e && t && e.insertBefore(t, e.firstChild), document.querySelectorAll(".edit i").forEach((function(e) {
//                                 e.className = "xi-ellipsis-v"
//                               }))
//                             }

//                             function setSecretTag() {
//                               document.querySelector("#reply_list").querySelectorAll("ul li .desc .txt_reply").forEach((function(e) {
//                                 let t = e.innerHTML; - 1 != t.indexOf("비밀댓글") && (e.innerHTML = t.replace(/\[비밀댓글]/gi, '<i class="xi xi-lock"></i>'), e.parentElement.classList.add("secret"))
//                               }))
//                             }

//                             function setRptbInnerHeight() {
//                               let e = document.getElementById("rptb"),
//                                 t = document.getElementById("rptb_header"),
//                                 n = document.getElementById("reply_list"),
//                                 i = document.getElementById("reply_write"),
//                                 s = window.outerWidth <= 767;
//                               setTimeout((function() {
//                                 let l = window.innerHeight,
//                                   o = document.getElementsByClassName("container_postbtn_wrap")[0];
//                                 e.style.height = s ? l - o.offsetHeight + "px" : l + "px", n.style.minHeight = l - (t.offsetHeight + i.offsetHeight) + "px"
//                               }), 500)
//                             }

//                             function setRptbWidth() {
//                               let e = document.getElementById("reply_write"),
//                                 t = document.getElementById("reply_list"),
//                                 n = document.getElementById("rptb_header").offsetWidth;
//                               e.style.width = n + "px", t.style.width = n + "px"
//                             }

//                             function setAdsense(e, t, n, i) {
//                               document.getElementById("reply_container"), document.getElementsByClassName("adWrap").length;
//                               let s = document.getElementById(t),
//                                 l = document.createElement("div");
//                               l.classList.add("adWrap", "text-center");
//                               let o = '<ins class="adsbygoogle" style="display:inline-block;width:300px;height:60px" data-ad-client="' + n + '" data-ad-slot="' + i + '"></ins>';
//                               l.innerHTML = o, s.insertBefore(l, s.firstChild), (adsbygoogle = window.adsbygoogle || []).push({})
//                             }

//                             function scrollToBottom(e) {
//                               list_content_wrapper = document.getElementsByClassName("simplebar-content-wrapper")[0];
//                               var t = setInterval((function() {
//                                 list_content_wrapper && (list_content_wrapper_height = list_content_wrapper.offsetHeight, scrollStep = list_content_wrapper_height / (e / 20), list_content_wrapper.scrollTop + list_content_wrapper_height + 5 <= list_content_wrapper.scrollHeight ? list_content_wrapper.scrollTop += scrollStep : (clearInterval(t), list_content_wrapper.scrollTop = list_content_wrapper.scrollHeight))
//                               }), 20)
//                             }

//                             function open_edit_window(e) {
//                               e = document.getElementById(e);
//                               edit_window.forEach((function(e) {
//                                 e.style.display = "none"
//                               })), e.style.display = "flex", edit_dummy.style.display = "block", setAbuseBtnPosition()
//                             }

//                             function close_edit_window() {
//                               edit_dummy.style.display = "none", edit_window.forEach((function(e) {
//                                 e.style.display = "none"
//                               }))
//                             }

//                             function setAbuseBtnPosition() {
//                               edit_date.forEach((function(e) {
//                                 let t = e.getElementsByTagName("a")[0] ? e.getElementsByTagName("a")[0] : "";
//                                 t && (t.innerHTML = "<i class='xi-warning' style='font-size:0.9rem'></i>", e.previousElementSibling.previousElementSibling.appendChild(t))
//                               }))
//                             }
//                             var timer1 = !0,
//                               timer2 = !0;

//                             function setExpendToggle() {
//                               if (timer1) {
//                                 var e = document.querySelectorAll("#reply_container > li");
//                                 [].forEach.call(e, (function(e) {
//                                   e.addEventListener("click", (function() {
//                                     ! function(e, t) {
//                                       if (timer2) {
//                                         var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
//                                         n.test(e.className) ? e.className = e.className.replace(n, " ").trim() : e.className += " " + t, timer2 = !1, setTimeout(() => timer2 = !0, 100)
//                                       }
//                                     }(e, "expend")
//                                   }), {
//                                     passive: !1
//                                   })
//                                 })), timer1 = !1, setTimeout(() => timer1 = !0, 3e3)
//                               }
//                             }
//                             window.addEventListener("load", (function() {
//                               setTimeout(() => {
//                                 rptb_right_loading_false.length ? (init_basic(), setRptbElementPosition(), setExpendToggle()) : init_extend(), document.getElementById("rptb").style.visibility = "visible"
//                               }, 300)
//                             }), {
//                               passive: !0
//                             })
</script>

<style>
.v-application .reply_container .info {
  background-color: none;
  border-color: #2196f3 !important;
}
.v-application .reply_container .info {
  background-color: none;
  border-color: #2196f3 !important;
  visibility: hidden;
}
</style>

