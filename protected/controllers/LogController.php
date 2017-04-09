<?php

class LogController extends Controller {

    public function actionIndex() {

    }

    public function actionAdd() {
        $tag = $_GET;
        $type = 'page'.$_GET['type'];
        $logs = Log::model()->findByPk(1);
        $logs[$type] = $logs[$type] + 1;
        $logs->save();

        echo json_encode($logs);
    }
}
