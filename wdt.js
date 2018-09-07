/**
 * Copyright (c) 2017, OCEAN
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @file timer code of Mobius Yellow. manage state of Mobius
 * @copyright KETI Korea 2017, OCEAN
 * @author Il Yeup Ahn [iyahn@keti.re.kr]
 */

var events = require('events');
var wdt = new events.EventEmitter();                                                                    // wdt라는 EventEmitter객체를 생성하고 이를 이용하여 이벤트 핸들러와 이벤트를 연동시키는 역할을 한다.

var wdt_callback_q = {};                                                                                //object 초기화
var wdt_value_q = {};
var wdt_tick_q = {};
var wdt_param1_q = {};
var wdt_param2_q = {};
var wdt_param3_q = {};

setInterval(function () {                                                                               //  wdt라는 EventEmitter는 1초마다를 resource_manager통해 이벤트를 발생시킨다.
    wdt.emit('resource_manager');
}, 1000);

wdt.on('resource_manager', function() {                                                                 //wdt는 resource_manager라는 이벤트와 이벤터헨들러 함수를 연동시킨다.
    for (var id in wdt_value_q) {
        if(wdt_value_q.hasOwnProperty(id)) {                                                            //hasOwnProperty 메서드는 object에 지정된 이름의 속성이 있을 경우 true를 반환하고 그렇지 않으면 false를 반환한다
            ++wdt_tick_q[id];
            if((wdt_tick_q[id] % wdt_value_q[id]) == 0) {
                wdt_tick_q[id] = 0;
                if(wdt_callback_q[id]) {
                    wdt_callback_q[id](id, wdt_param1_q[id], wdt_param2_q[id], wdt_param3_q[id]);
                }
            }
        }
    }
});

exports.set_wdt = function (id, sec, callback_func, param1, param2, param3) {                           //아래의 속성들을 가진 set_wdt함수 모듈을 정의하기
    wdt_value_q[id] = sec;
    wdt_tick_q[id] = 0;
    wdt_callback_q[id] = callback_func;
    wdt_param1_q[id] = param1;
    wdt_param2_q[id] = param2;
    wdt_param3_q[id] = param3;
};

exports.get_wdt_callback = function (id) {                                                              //아래의 속성들을 가진 get_wdt_callback함수 모듈을 정의하기
    return wdt_callback_q[id];
};

exports.get_wdt_value = function (id) {                                                                 //아래의 속성들을 가진 get_wdt_value함수 모듈을 정의하기
    return wdt_value_q[id];
};

exports.del_wdt = function (id) {                                                                       //아래의 속성들을 가진 del_wdt함수 모듈을 정의하기
    delete wdt_value_q[id];
    delete wdt_callback_q[id];
};