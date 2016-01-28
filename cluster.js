var inputFile = "source";
var outputFile = "destination";
var grid = 100; // 聚合网格大小，单位墨卡托单位，近视米

var projection = require('./projection');
var outputStr = "";
var fs = require('fs');

var data = fs.readFileSync(inputFile,"utf-8");

data = data.split("\n");

var outputArr = {};

for (var i = 1; i < data.length - 1; i++) {
    var points = [];
    var line = data[i].split(',');
    var mc = projection.lngLat2Mercator({
        x: line[0],
        y: line[1]
    });

    var key = parseInt(mc.x / grid) + ',' + parseInt(mc.y / grid);

    if (outputArr[key]) {
        outputArr[key] ++;
    } else {
        outputArr[key] = 1;
    }

}

var outputStr = '';
for (var key in outputArr) {
    var mc = key.split(",");
    var lngLat = projection.mercator2LngLat({
        x: mc[0] * grid,
        y: mc[1] * grid
    });
    outputStr += lngLat.x + "," + lngLat.y + ','+ outputArr[key] + "\n";
}

fs.writeFile(outputFile, outputStr, function(err){
    if (err) {
        console.log("fail " + err);
    } else {
        console.log("写入文件ok");
    }
});
