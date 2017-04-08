/*!
 * @author 郭豪
 * @date 2016/05/12
 * 模拟原生的点击事件
 */

(function($, specialEventName) {
    'use strict';
    var nativeEvent = Object.create(null),
        vague = 5;

    // 防止pc上调试时候点击不触发
    if ('ontouchstart' in document) {
        nativeEvent.start = 'touchstart';
        nativeEvent.ing = 'touchmove';
        nativeEvent.end = 'touchend';
    } else {
        nativeEvent.start = 'mousedown';
        nativeEvent.ing = 'mouseover';
        nativeEvent.end = 'mouseup';
    }

    // jq自定义事件
    $.event.special[specialEventName] = {
        setup: function(data, namespaces, eventHandle) {
            var $element = $(this);
            var eventData = {};
            var forbiddenNativeTap = false;
            // 提供不触发横向原生点击的可能
            if ($element.hasClass('forbiddenNativeTap')) {
                forbiddenNativeTap = true;
            }
            $element
            // 收集事件对象
            .on(nativeEvent.start + ' ' + nativeEvent.ing + ' ' + nativeEvent.end, function(event) {
                eventData.event = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[0] : event;
            })
            .on(nativeEvent.start, function(event) {
                if (event.which && event.which !== 1) {
                    return;
                }

                if (data) {
                    // delegate 事件委托
                    var $target = $(eventData.event.target);
                    if ($target.is(data)) {
                        $target.addClass('global-tap-element-highlight')
                    } else {
                        $target.parentsUntil($element, data).addClass('global-tap-element-highlight');
                    }
                } else {
                    $(this).addClass('global-tap-element-highlight');
                }

                eventData.target = event.target;
                eventData.startX = eventData.event.pageX;
                eventData.startY = eventData.event.pageY;
            })
            .on(nativeEvent.ing, function(event) {
                eventData.pageX = eventData.event.pageX;
                eventData.pageY = eventData.event.pageY;
                if (data) {
                    var $target = $(eventData.event.target);
                    if ($target.is(data)) {
                        $target.removeClass('global-tap-element-highlight')
                    } else {
                        $target.parentsUntil($element, data).removeClass('global-tap-element-highlight');
                    }
                } else {
                    if (eventData.pageY !== eventData.startY) {
                        $(this).removeClass('global-tap-element-highlight');
                    }
                }
                
            })
            .on(nativeEvent.end, function(event) {
                // 对比touchstart和touchend的位置和target
                // 横向移动依然触发
                event.type = specialEventName;
                event.pageX = eventData.event.pageX;
                event.pageY  = eventData.event.pageY;
                if (forbiddenNativeTap) {
                    if (eventData.target === event.target && eventData.startY === eventData.event.pageY && eventData.startX === eventData.event.pageX) {
                        eventHandle.call(this, event);
                    }
                } else {
                    if (eventData.target === event.target && Math.abs(eventData.startY - eventData.event.pageY) <= vague) {
                        eventHandle.call(this, event);
                    }
                }

                if (data) {
                    // delegate 事件委托
                    var $target = $(eventData.event.target);
                    if ($target.is(data)) {
                        $target.removeClass('global-tap-element-highlight')
                    } else {
                        $target.parentsUntil($element, data).removeClass('global-tap-element-highlight');
                    }
                } else {
                    $(this).removeClass('global-tap-element-highlight');
                }
            });
        },
        remove: function() {
            $(this).off(nativeEvent.start + ' ' + nativeEvent.ing + ' ' + nativeEvent.end);
        }
    };
    $.fn[specialEventName] = function(fn) {
        return this[fn ? 'on': 'trigger'](specialEventName, fn);
    };
})(window.$, 'tap'); 

