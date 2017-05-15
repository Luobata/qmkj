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
 
        $data = json_decode($this->httpGet($url));
 
        $access_token = $data->access_token;
        $openid = $data->openid;
        $get_user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';
 
        $res = json_decode($this->httpGet($get_user_info_url));

;
        return $res;
    }

    private function httpGet($url)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($curl, CURLOPT_URL, $url);

        $res = curl_exec($curl);
        curl_close($curl);

        return $res;
    }
}