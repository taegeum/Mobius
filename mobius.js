var fs = require('fs');                                     //파일 입출력 모듈

var data  = fs.readFileSync('conf.json', 'utf-8');          //conf.json파일을 동기적 읽기 (conf.json의 파일에 utf-8의 방식으로 데이터 내용을 쓴다.) / 비동기는 데이터 내용을 쓴 후 callback함수를 호출한다.
var conf = JSON.parse(data);

global.defaultnmtype        = 'short';                      //number type 초기화
global.defaultbodytype      = 'json';                       //body type을 json형태로 초기화


// my CSE information
global.usecsetype           = 'in';                         // select 'in' or 'mn' or asn'
global.usecsebase           = 'Mobius';
global.usecseid             = '/Mobius';
global.usecsebaseport       = conf.csebaseport;

// global.usedbhost            = 'localhost';
global.usedbhost            = 'mobius.c4f8trhirbsy.ap-northeast-2.rds.amazonaws.com';
global.usedbpass            = conf.dbpass;                  //database 비번으로 초기화


global.usepxywsport         = '7577';
global.usepxymqttport       = '7578';                       // mptt포트 초기화


global.usetsagentport       = '7582';

global.usemqttbroker        = '114.70.21.42';                  // mqttbroker for mobius

global.usesecure            = 'disable';                    // 안정성 확인
if(usesecure === 'enable') {
    global.usemqttport      = '8883';
}
else {
    usemqttport             = '1883';
}

global.wdt = require('./wdt');                              //wdt파일의 모듈 전체를 가져와 global.wdt로 초기화 한다. 이파일은 주로 이벤트를 처리하는 eventEmitter

// CSE core
require('./app');                                           //app파일의 모듈 전체를 가져오기
