<?php

defined("DS") || define("DS", DIRECTORY_SEPARATOR);
defined("R" ) || define("R", dirname(__FILE__));

$name = isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false;

if ($name) {
	$explode = explode('.', $name);	
	$rand1   = date('YmdHis');
	$rand2   = rand(1,100); 
	$rand3   = rand(1,100);	
	$new     = 'OC' . $rand1 . $rand2 . $rand3 . '.' . $explode[1];
	$path    = 'documentos/ocorrencias/';	
	file_put_contents($path . $name, file_get_contents('php://input'));	
	rename($path . $name, $path . $new);
	echo $new;
	exit;
}

echo false;
?>