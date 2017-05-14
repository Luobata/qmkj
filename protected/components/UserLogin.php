<?php

class UserLogin
{
    private $appId;
    private $appSecret;

    public function __construct($appId, $appSecret)
    {
        $this->appId = $appId;
        $this->appSecret = $appSecret;
    }

    /**
     * 获取access_token
     */
    public function getToken()
    {
        $code = $_GET['code'];
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
        $url .= 'appid='.$this->appId;
        $url .= '&secret='.$this->appSecret;
        $url .= '&code='.$code;
        $url .= '&grant_type=authorization_code';
 
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 500);
        $data = curl_exec($ch);
        $data = json_decode($data,true);
        curl_close($ch);
 
        $access_token = $data['access_token'];
        $openid = $data['openid'];
        $get_user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';
 
        $ch = curl_init();
        curl_setopt($ch,CURLOPT_URL,$get_user_info_url);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        $res = curl_exec($ch);
        curl_close($ch);
　　　　//返回的是一个数组，里面存放用户的信息
        $res = json_decode($res,true);
 
    }
}