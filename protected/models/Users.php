<?php

/**
 * This is the model class for table "user".
 *
 * The followings are the available columns in table 'user':
 * @property integer $id
 * @property string $openid
 * @property string $wx_nickname
 * @property integer $wx_sex
 * @property string $wx_city
 * @property string $wx_province
 * @property string $wx_country
 * @property string $wx_avatar
 * @property string $name
 * @property string $telephone
 * @property string $ip
 * @property string $province
 * @property string $city
 * @property string $school
 * @property string $reading_book
 * @property string $wechat
 * @property string $total_reading_time
 * @property string $token
 * @property integer $is_forbidden
 * @property string $create_time
 */
class User extends InitActiveRecord
{
    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return 'user';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('openid, ip', 'required'),
            array('wx_sex, is_forbidden', 'numerical', 'integerOnly' => true),
            array('openid, province, city, school, wechat', 'length', 'max' => 255),
            array('wx_nickname, wx_avatar, name, telephone, reading_book, token', 'length', 'max' => 1023),
            array('wx_city, wx_province, wx_country', 'length', 'max' => 63),
            array('ip', 'length', 'max' => 127),
            array('total_reading_time', 'length', 'max' => 11),
            array('create_time', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, openid, wx_nickname, wx_sex, wx_city, wx_province, wx_country, wx_avatar, name, telephone, ip, province, city, school, reading_book, wechat, total_reading_time, token, is_forbidden, create_time', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array();
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id' => 'ID',
            'openid' => 'Openid',
            'wx_nickname' => 'Wx Nickname',
            'wx_sex' => 'Wx Sex',
            'wx_city' => 'Wx City',
            'wx_province' => 'Wx Province',
            'wx_country' => 'Wx Country',
            'wx_avatar' => 'Wx Avatar',
            'name' => 'Name',
            'telephone' => 'Telephone',
            'ip' => 'Ip',
            'province' => 'Province',
            'city' => 'City',
            'school' => 'School',
            'reading_book' => 'Reading Book',
            'wechat' => 'Wechat',
            'total_reading_time' => 'Total Reading Time',
            'token' => 'Token',
            'is_forbidden' => 'Is Forbidden',
            'create_time' => 'Create Time',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     *
     * Typical usecase:
     * - Initialize the model fields with values from filter form.
     * - Execute this method to get CActiveDataProvider instance which will filter
     * models according to data in model fields.
     * - Pass data provider to CGridView, CListView or any similar widget.
     *
     * @return CActiveDataProvider the data provider that can return the models
     * based on the search/filter conditions.
     */
    public function search()
    {
        // @todo Please modify the following code to remove attributes that should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id);
        $criteria->compare('openid', $this->openid, true);
        $criteria->compare('wx_nickname', $this->wx_nickname, true);
        $criteria->compare('wx_sex', $this->wx_sex);
        $criteria->compare('wx_city', $this->wx_city, true);
        $criteria->compare('wx_province', $this->wx_province, true);
        $criteria->compare('wx_country', $this->wx_country, true);
        $criteria->compare('wx_avatar', $this->wx_avatar, true);
        $criteria->compare('name', $this->name, true);
        $criteria->compare('telephone', $this->telephone, true);
        $criteria->compare('ip', $this->ip, true);
        $criteria->compare('province', $this->province, true);
        $criteria->compare('city', $this->city, true);
        $criteria->compare('school', $this->school, true);
        $criteria->compare('reading_book', $this->reading_book, true);
        $criteria->compare('wechat', $this->wechat, true);
        $criteria->compare('total_reading_time', $this->total_reading_time, true);
        $criteria->compare('token', $this->token, true);
        $criteria->compare('is_forbidden', $this->is_forbidden);
        $criteria->compare('create_time', $this->create_time, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return User the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
    
    public function afterFind()
    {
        parent::afterFind(); // TODO: Change the autogenerated stub
        $this->wx_nickname = urldecode($this->wx_nickname);
    }

    public function beforeSave()
    {
        $this->wx_nickname = urlencode($this->wx_nickname);
        return parent::beforeSave(); // TODO: Change the autogenerated stub
    }

}
