<?php

class DreamController extends Controller {

    public $appId = "wx1fdca5b8a748f86b";
    public $secret = "944ca14646867291fcb4d0913ce9b88e";

    //配置参数的数组
    public $CONF =  array(
        '__CALL_URL__' =>'http://localhost/qmkj/index.php?r=dream' //当前页地址
    );



    public function actions()
    {
        return array(
            // captcha action renders the CAPTCHA image displayed on the contact page
            'captcha'=>array(
                'class'=>'CCaptchaAction',
                'backColor'=>0xFFFFFF,
            ),
            // page action renders "static" pages stored under 'protected/views/site/pages'
            // They can be accessed via: index.php?r=site/page&view=FileName
            'page'=>array(
                'class'=>'CViewAction',
            ),
        );
    }
    public function actionIndex() {
        $sdk = new JSSDK($this->appId, $this->secret);
        $signPackage = $sdk->getSignPackage();

        if (!isset($_GET['code']) || empty($_GET['code'])) {
            $getCodeUrl  =  "https://open.weixin.qq.com/connect/oauth2/authorize".
                    "?appid=" . $this->appId .
                    "&redirect_uri=" . $this->CONF['__CALL_URL__']  . 
                    "&response_type=code".
                    "&scope=snsapi_userinfo". #!!!scope设置为snsapi_base !!!
                    "&state=1";

            //跳转微信获取code值,去登陆   
            header('Location:' . $getCodeUrl);
            exit;
        }

        // $userInfo = new UserLogin($this->appId, $this->secret);
        $userInfo = array(
            "userId" => isset($_GET['userId']) ? $_GET['userId'] : '',
            "openId" => $_GET['openId']
        );

        $dreamItem = Dream::model()->find('openId=:openId and userId=:userId', array(
            ':openId' => $userInfo['openId'],
            ':userId' => $userInfo['userId']
        ));

        if (!$dreamItem) {
            $this->renderPartial('dream', array(
                "signPackage" => CJSON::encode($signPackage),
                "user" => CJSON::encode($userInfo)
            ));
        } else {
            $dreamList = Dream::model()->findAll('userId=:userId', array(
                ':userId' => $userInfo['userId']
            ));
            var_dump(time());
            $startTime = date("Y年m月d日", $dreamList[0]->startTime/ 1000);
            $leftTime = date("d", time() - $dreamList[0]->startTime / 1000);
            $today = date("Y年m月d日", time());;
            var_dump($leftTime);
            // exit();

            $this->renderPartial('show', array(
                "signPackage" => CJSON::encode($signPackage),
                "user" => CJSON::encode($userInfo),
                "dreamList" => $dreamList,
                "startTime" => $startTime,
                "leftTime" => $leftTime,
                "today" => $today
            ));
        }

    }

    public function actionShow() {
        $sdk = new JSSDK($this->appId, $this->secret);
        $signPackage = $sdk->getSignPackage();

        if (!isset($_GET['code']) || empty($_GET['code'])) {
            $getCodeUrl  =  "https://open.weixin.qq.com/connect/oauth2/authorize".
                    "?appid=" . $this->appId .
                    "&redirect_uri=" . $this->CONF['__CALL_URL__']  . 
                    "&response_type=code".
                    "&scope=snsapi_userinfo". #!!!scope设置为snsapi_base !!!
                    "&state=1";

            //跳转微信获取code值,去登陆   
            header('Location:' . $getCodeUrl);
            exit;
        }

        // $userInfo = new UserLogin($this->appId, $this->secret);
        // var_dump($userInfo);
        // exit;

        $this->renderPartial('show', array(
            "signPackage" => CJSON::encode($signPackage)
        ));
    }

    public function actionShare() {
        $sdk = new JSSDK($this->appId, $this->secret);
        $signPackage = $sdk->getSignPackage();

        $this->renderPartial('share', array(
            "signPackage" => CJSON::encode($signPackage)
        ));
    }

    public function actionAdd() {
        $openId = $_POST['openId'];
        $userId = $_POST['userId'];
        $dreamItem = Dream::model()->find('openId=:openId and userId=:userId', array(
            ':openId' => $openId,
            ':userId' => $userId
        ));
        if ($dreamItem) {
            $back = array(
                'code' => 300,
                'msg' => '该用户已经填写过梦想'
            );
        } else {
            $dreamItem = new Dream;
            $dreamItem->userId = $userId;
            $dreamItem->openId = $openId;
            $dreamItem->headimgurl = $_POST['headimgurl'];
            $dreamItem->nickname = $_POST['nickname'];
            $dreamItem->dream = $_POST['dream'];
            $dreamItem->startTime = $_POST['startTime'];
            $dreamItem->save();
            $back = array(
                'code' => 200,
                'msg' => ''
            );
        }

        echo json_encode($back);
    }
}