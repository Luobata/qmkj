<?php

class DreamController extends Controller {

    public $appId2 = "wx1fdca5b8a748f86b";
    public $secret2 = "944ca14646867291fcb4d0913ce9b88e";

    public $appId = "wxa22a9e086b07b666";
    public $secret = "a48b605fb25c0d1835a9b2add089df11";

    //配置参数的数组
    public $CONF =  array(
        '__CALL_URL__' =>'http://h5.ruyiso.com/qmkj/index.php?r=dream' //当前页地址
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
        $dreamForm = new DreamForm();
        $userInfo = $dreamForm->checkLogin();
        $signPackage = $sdk->getSignPackage();
        $returnUrl = Yii::app()->request->url;

        // if (!isset($_GET['code']) || empty($_GET['code'])) {
        if ($userInfo == false) {
            $this->redirect($this->createUrl("dream/login", array(
                "returnUrl" => urlencode($returnUrl),
            )));
            exit;
        }
        // $userInfo = $user->getToken();
        $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        // $userInfo = array(
        //     "userId" => isset($_GET['userId']) ? $_GET['userId'] : '',
        //     "openId" => $_GET['openId']
        // );
        // var_dump($userInfo->id);

        // $dreamItem = Dream::model()->find('openId=:openId and userId=:userId', array(
        //     ':openId' => $userInfo->openId,
        //     ':userId' => $userId
        // ));
        $dreamItem2 = Dream::model()->find('openId=:openId and userId=:userId', array(
            ':openId' => $userInfo->openId,
            ':userId' => $userInfo->openId
        ));
        // var_dump($dreamItem2);
        // exit();
        // if ($dreamItem2 && !$userId) {
        //     $this->redirect($this->createUrl("dream/index", array(
        //         "userId" => urlencode($dreamItem2->userId),
        //     )));
        //     exit;
        // }

        if (!$dreamItem2) {
            $this->renderPartial('dream', array(
                "signPackage" => CJSON::encode($signPackage),
                "user" => CJSON::encode($userInfo),
                "userId" => $userInfo->openId
            ));
        } else {
            $dreamList = Dream::model()->findAll('userId=:userId', array(
                ':userId' => $userInfo->openId
            ));
            $startTime = date("Y年m月d日", $dreamList[0]->startTime / 1000);
            $leftTime = date("d", time() - $dreamList[0]->startTime / 1000);
            $leftTime = floor((time() - $dreamList[0]->startTime / 1000) / 3600 / 24);
            if ($leftTime < 0) $leftTime = 0;
            $today = date("Y年m月d日", time());
            $rank = $dreamForm->loadUserByOpenId($dreamList[0]->openId, true);

            $this->renderPartial('show', array(
                "signPackage" => CJSON::encode($signPackage),
                "user" => CJSON::encode($userInfo),
                "rank" => $rank->id,
                "userId" => $userInfo->openId,
                "dreamList" => $dreamList,
                "startTime" => $startTime,
                "leftTime" => $leftTime,
                "today" => $today
            ));
        }
    }

    public function actionLogin()
    {
        $appId = $this->appId;
        $callBackUrl = $this->createUrl("dream/callBack", array(
            "returnUrl" => $_GET["returnUrl"],
        ));
        $callBackUrl = Yii::app()->request->hostInfo . $callBackUrl;
        $callBackUrl = urlencode($callBackUrl);

        $url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={$appId}&redirect_uri={$callBackUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        $this->redirect($url);
    }

    public function actionCallBack()
    {
        $user = new UserLogin($this->appId, $this->secret);
        $userInfo = $user->getToken();

        $dreamForm = new DreamForm();
        $arrUser = $dreamForm->saveUserWxInfo($userInfo);
        
        Yii::app()->session[DreamForm::$sessionKey] = $arrUser;

        if (isset($_GET["returnUrl"]) && $_GET["returnUrl"]) {
            $returnUrl = urldecode($_GET["returnUrl"]);
            $returnUrl = Yii::app()->request->hostInfo . $returnUrl;

        } else {
            $returnUrl = $this->createUrl("dream/index");
        }

        $this->redirect($returnUrl);
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
        $dreamForm = new DreamForm();
        $userInfo = $dreamForm->checkLogin();
        $returnUrl = Yii::app()->request->url;

        if ($userInfo == false) {
            $this->redirect($this->createUrl("dream/login", array(
                "returnUrl" => urlencode($returnUrl),
            )));
            exit;
        }
        $userId = isset($_GET['userId']) ? $_GET['userId'] : '';

        if ($userInfo->openId == $userId) {
            $this->redirect($this->createUrl("dream/index", array(
                "userId" => urlencode($userId),
            )));
            exit;
        }

        $dreamItem = Dream::model()->find('openId=:openId and userId=:userId', array(
            ':openId' => $_GET['userId'],
            ':userId' => $_GET['userId']
        ));



        $time = date("Y年m月d日", $dreamItem->startTime / 1000);

        $this->renderPartial('share', array(
            "signPackage" => CJSON::encode($signPackage),
            "user" => CJSON::encode($userInfo),
            "userId" => $userId,
            "dreamItem" => $dreamItem,
            "time" => $time
        ));
    }

    public function actionAll() {
        $sdk = new JSSDK($this->appId, $this->secret);
        $signPackage = $sdk->getSignPackage();
        $dreamForm = new DreamForm();
        $userInfo = $dreamForm->checkLogin();
        $returnUrl = Yii::app()->request->url;

        if ($userInfo == false) {
            $this->redirect($this->createUrl("dream/login", array(
                "returnUrl" => urlencode($returnUrl),
            )));
            exit;
        }
        $userId = isset($_GET['userId']) ? $_GET['userId'] : '';

        // $dreamList = Dream::model()->limt(2)->findAll('openId = userId');
        $dreamList = Dream::model()->findAll('openId = userId LIMIT :limit OFFSET :offset', array(
            ':limit' => 10,
            ':offset' => 0
        ));
        // var_dump($dreamList);

        $this->renderPartial('all', array(
            "signPackage" => CJSON::encode($signPackage),
            "user" => CJSON::encode($userInfo),
            "userId" => $userId,
            "dreamList" => $dreamList
        ));
    }

    public function actionAdd() {
        $openId = $_POST['openId'];
        $userId = $_POST['userId'];

        $dreamItem2 = Dream::model()->find('openId=:openId and userId=:userId', array(
            ':openId' => $openId,
            ':userId' => $openId
        ));
        if (!$dreamItem2) {
            $dreamItem2 = new Dream;
            $dreamItem2->userId = $openId;
            $dreamItem2->openId = $openId;
            $dreamItem2->headimgurl = $_POST['headimgurl'];
            $dreamItem2->nickname = $_POST['nickname'];
            $dreamItem2->dream = $_POST['dream'];
            $dreamItem2->startTime = $_POST['startTime'];
            $dreamItem2->sex = $_POST['sex'];
            $dreamItem2->save();
        }
        $dreamItem = Dream::model()->find('openId=:openId and userId=:userId', array(
            ':openId' => $openId,
            ':userId' => $userId
        ));
        if (!$dreamItem) {
            $dreamItem = new Dream;
            $dreamItem->userId = $userId;
            $dreamItem->openId = $openId;
            $dreamItem->headimgurl = $_POST['headimgurl'];
            $dreamItem->nickname = $_POST['nickname'];
            $dreamItem->dream = $_POST['dream'];
            $dreamItem->startTime = $_POST['startTime'];
            $dreamItem->sex = $_POST['sex'];
            $dreamItem->save();
            // $back = array(
            //     'code' => 200,
            //     'msg' => ''
            // );
        }
        // echo($dreamItem2->$userId);
        // return;
        $back = array(
            'code' => 300,
            'msg' => '该用户已经填写过梦想',
            'data' => array(
                'userId' => $openId
            )
        );

        echo json_encode($back);
    }

    public function actionList() {
        $dreamList = Dream::model()->findAll('openId = userId LIMIT :limit OFFSET :offset', array(
            ':limit' => 10,
            ':offset' => (int)$_GET['offset']
        ));
        $back = array(
            'code' => 200,
            'msg' => '',
            'data' => $dreamList
        );
        echo json_encode($back);
    }
}