<?php

$pageSize = 20;
$pageNum = 0;
$output = array();
$query = urlencode("银行");
$location = "39.913328,116.380617";
$radius = 5000;

$url = "http://api.map.baidu.com/place/v2/search?ak=1XjLLEhZhQNUzd93EjU5nOGQ&output=json&query=$query&page_size=20&page_num=0&scope=1&location=$location&radius=$radius";

$result = json_decode(file_get_contents($url));

$total = $result->total;

$output = array_merge($output, $result->results);

$pageNums = ceil($total / $pageSize);

for ($pageNum = 1; $pageNum < $pageNums; $pageNum++) {
    var_dump($pageNum);
    $url = "http://api.map.baidu.com/place/v2/search?ak=1XjLLEhZhQNUzd93EjU5nOGQ&output=json&query=$query&page_size=20&page_num=$pageNum&scope=1&location=$location&radius=$radius";
    $result = json_decode(file_get_contents($url));
    $output = array_merge($output, $result->results);
}

$filepoint = fopen("result", "w");

var_dump(count($output));

fwrite($filepoint, json_encode($output));

fclose($filepoint);
