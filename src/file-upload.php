<?php

/*
 * Eduardo Malherbi Martins (http://emalherbi.com/)
 * Copyright @emm
 * Full Stack Web Developer.
 */

defined('DS') || define('DS', DIRECTORY_SEPARATOR);

$fileName = isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false;

if (!empty($fileName)) {
    $explode = explode('.', $fileName);

    $rand1 = date('YmdHis');
    $rand2 = rand(1, 100);
    $rand3 = rand(1, 100);

    $name = 'File'.$rand1.$rand2.$rand3.'.'.$explode[1];
    $path = 'file';

    @mkdir($path, 0777, true);
    @chmod($path, 0777);

    file_put_contents($path.DS.$name, file_get_contents('php://input'));

    echo $name;
    exit;
}

echo false;
