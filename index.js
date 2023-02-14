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
     
      
         
      
     //GAS側Postイベントエントリ
      var url = 'https://script.google.com/macros/s/AKfycbygkAvGxnZJtBSGK11OKAZiPhXicx2XT2MvuSyHxUs9CDttW3NNBACcv0rtORbVBUlszA/exec';
	         
                 
       
      liff.getProfile().then
      (profile => 
        {
                 // プロフィール名
                 const name = profile.displayName
                 var JSONdata = {
	                                 chatdata:speach1
                                 };
                 
                 //スピナー表示
                 //インジケータ表示
                 // Loading 画像を表示
                 dispLoading("回答生成中...");
             
                 $.post(url,
                        JSONdata,
                        function(dt)
                        {
	                   //インジケータ除去
	                   // Loading 画像を消す
                           removeLoading();
	                   if(dt.message != 'エラーが発生しました')
	                   {
                               sendText(dt.message);//To LINE 送信
	                       liff.closeWindow(); 
	                   }else
	                   {
		                sendText("GPTでエラーが発生しました。質問の仕方を変えてやり直してみてください！);//To LINE 送信
	                       liff.closeWindow();   
			       //window.alert("LIFFアプリでエラーが発生");  
                           }
	                }
                 );
     
        }
      );
      
      return false;
    });
});
