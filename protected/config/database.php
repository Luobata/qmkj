<?php

// This is the database connection configuration.
return array(
	'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
	// uncomment the following lines to use a MySQL database
	'connectionString' => 'mysql:host=123.56.2.55;dbname=qmkj',
	'emulatePrepare' => true,
	'username' => 'root',
	'password' => 'qmkj123~',
	'charset' => 'utf8'
);
