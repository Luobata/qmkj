<?php

class Log extends CActiveRecord {
    public $id;
    public $page1;
    public $page2;
    public $page3;

    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'log';
    }
}
