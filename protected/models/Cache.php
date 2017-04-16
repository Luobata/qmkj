<?php

/**
 * This is the model class for table "mysql_cache".
 *
 * The followings are the available columns in table 'mysql_cache':
 * @property integer $id
 * @property string $app_name
 * @property string $cache_key
 * @property string $cache_value
 */
class Cache extends InitActiveRecord
{
    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return 'cache';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('app_name, cache_key, cache_value', 'required'),
            array('id', 'numerical', 'integerOnly' => true),
            array('app_name, cache_key', 'length', 'max' => 31),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('id, app_name, cache_key, cache_value', 'safe', 'on' => 'search'),
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
            'app_name' => 'App Name',
            'cache_key' => 'Cache Key',
            'cache_value' => 'Cache Value',
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
        $criteria->compare('app_name', $this->app_name, true);
        $criteria->compare('cache_key', $this->cache_key, true);
        $criteria->compare('cache_value', $this->cache_value, true);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Cache the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}
