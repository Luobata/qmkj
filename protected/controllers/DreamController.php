<?php

class DreamController extends Controller {

    public $appId = "wx1fdca5b8a748f86b";
    public $secret = "944ca14646867291fcb4d0913ce9b88e";

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

        $this->renderPartial('dream', array(
            "signPackage" => CJSON::encode($signPackage)
        ));
    }

    public function actionShow() {
        $sdk = new JSSDK($this->appId, $this->secret);
        $signPackage = $sdk->getSignPackage();

        $this->renderPartial('show', array(
            "signPackage" => CJSON::encode($signPackage)
        ));
    }
}
