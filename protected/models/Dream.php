<?php

class Dream extends CActiveRecord {
    public $id;
    public $userId;
    public $headimgurl;
    public $nickname;
    public $dream;
    public $startTime;
    public $openId;
    public $sex;

    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'dream';
    }
}
