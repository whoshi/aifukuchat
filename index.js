$(function () 
{
    
    // 送信
    $('form').submit(function () 
    {
      
      var speach1 = document.getElementById("input_speach1").value;
      
      if(speach1 == '')
      {
	 speach1 = "nodata";     
      }
      
      
    
      
      //入力チェック  
      if(speach1 === 'nodata')
      {
	             alert('入力が何もありません');
                     return false;	   
      }
     
      
      var inputdata = "【発話内容1】" + "\n" + speach1 + "\n" + "【アクション】" + "\n" + robohonaction +  "\n" + "【ソング】" + "\n" + robohonsong;
      inputdata = inputdata  + "\n" + "【ダンス】" + "\n" + robohondance + "\n"　+ "【発話内容2】" + "\n" + speach2 + "【翻訳】" + "\n" + transrate ;	    
      
     //GAS側Postイベントエントリ
      var url = 'https://script.google.com/macros/s/AKfycbyYZk_OrR2Pb6kMA2CCxTpbBGbM34t80b2HovVA_ecmiy6cG8_LLZRTtaiPe_knkJ_UrA/exec';
                 
      window.alert("liff.getprofile");  
      liff.getProfile().then
      (profile => 
        {
                 // プロフィール名
                 const name = profile.displayName
                 var JSONdata = {
	                                 speach1:speach1
                                 };
                 window.alert(JSONdata);  
                 //スピナー表示
                 //インジケータ表示
                 // Loading 画像を表示
                 dispLoading("ロボホンに送信中...");
             
                 $.post(url,
                        JSONdata,
                        function(dt)
                        {
	                   //インジケータ除去
	                   // Loading 画像を消す
                           removeLoading();
	                   if(dt.message != 'success!')
	                   {
                               sendText(dt.message);//To LINE 送信
	                       liff.closeWindow(); 
	                   }else
	                   {
		                     window.alert("LIFFアプリでエラーが発生");  
                           }
	                }
                 );
     
        }
      );
      
      return false;
    });
});
