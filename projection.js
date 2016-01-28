//经纬度转墨卡托
function lngLat2Mercator(lnglat) {
    lnglat.x = parseFloat(lnglat.x);
    lnglat.y = parseFloat(lnglat.y);
    var x = lnglat.x * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lnglat.y) * Math.PI / 360)) / (Math.PI / 180);

    y = y * 20037508.34 / 180;
    return {
        x: x,
        y: y
    };
}

//墨卡托转经纬度
function mercator2LngLat(mercator) {
    var x = mercator.x / 20037508.34 * 180;
    var y = mercator.y / 20037508.34 * 180;
    y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
    return {
        x: x,
        y: y
    };
}

module.exports = {
	lngLat2Mercator: lngLat2Mercator,
    mercator2LngLat: mercator2LngLat
}
