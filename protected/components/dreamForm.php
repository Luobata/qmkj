<?php

/**
 * Class ValentineGameForm
 * ValentineGame info
 */
class DreamForm extends CFormModel
{
    public static $sessionKey = "dream-user";

    public function checkLogin()
    {
        // var_dump(Yii::app()->session['1']);
        // exit();
        if (!isset(Yii::app()->session[DreamForm::$sessionKey]) || empty(Yii::app()->session[DreamForm::$sessionKey])) {
            return false;

        } else {
            $arrUser = Yii::app()->session['dream-user'];
        }
        // var_dump(1);
        // exit();
        // validate user
        $user = User::model()->find(array(
            "condition" => "openId=:openId",
            "params" => array(
                ":openId" => $arrUser->openid
            )
        ));

        if (!$user) {
            return false;
        }


        if (isset($user->id) && $user->id == $arrUser->user_id) {
            return $user;
        } else {
            return false;
        }
    }

    public function saveUserWxInfo($arrUser)
    {
        // var_dump($arrUser);
        // exit();
        $openId = $arrUser->openid;
        $user = $this->loadUserByOpenId($openId, true);

        if (!$user) {
            $user = new User();
            $user->create_time = date("Y-m-d H:i:s");
        }

        $user->openId = $arrUser->openid;
        $user->nickname = $arrUser->nickname;
        $user->sex = $arrUser->sex;
        $user->city = $arrUser->city;
        $user->province = $arrUser->province;
        $user->country = $arrUser->country;
        $user->headimgurl = $arrUser->headimgurl;
        $user->ip = Yii::app()->request->userHostAddress;

        $user->save();
        // if (!$user->save()) {
        //     throw new Exception(InitForm::array2Json($user->getErrors()));
        // }

        $arrUser->user_id = $user->id;
        return $arrUser;
    }

    public function loadUserByOpenId($openId, $exceptionAlert = false)
    {
        $user = User::model()->find(array(
            "condition" => "openid=:openid",
            "params" => array(
                ":openid" => $openId,
            ),
        ));

        if (!$user && !$exceptionAlert) {
            throw new Exception("Can not find user with openid: " . $openId);
        }

        return $user;
    }
}