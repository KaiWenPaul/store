/**
 * 购物车测试
 * 1,测试全选
 * 2,测试单选
 * 3,测试编辑和完成
 * 4,测试加减和完成
 * 5,测试删除
 *
 */
common.intTime = 1000;
var startTime = Date.now();
var delay = common.delay;
// 添加到购物车
function addToCar(id) {
    var data = { id: id, prdNum: 1};
    var url = common.getWebUrl('addToShopCar');
    common.ajax(url, data, function(res){});
};
var shopCarTest = {
    init: function() {
        // 测试全选
        this.step1();
        // 测试单选
        this.step2();
        // 测试编辑和完成
        this.step3();
        // 测试加减和完成
        this.step4();
        // 测试删除
        this.step5();
    },
    // 添加到购物车
    addToCar: function(id) {
        var data = { id: id, prdNum: 1};
        var url = common.getWebUrl('addToShopCar');
        common.ajax(url, data, function(res){});
    },
    // 测试全选
    step1: function() {
        console.log('step1测试全选...');
        delay(1,function() {
            $('#select_all div:nth-child(1)').trigger('click');
        });
        delay(1,function() {
            $('#select_all div:nth-child(1)').trigger('click');
            console.log('step2测试选中...');
        });
    },
    // 测试单选
    step2: function() {
        var $sels = $('#shopping_list .no_select');
        // 依次取消勾选
        for (var i=0;i<$sels.length;i++) {
            (function(i) {
                delay(1,function() {
                    $sels[i].click();
                },0.4);
            })(i);
        }
        // 依次勾选
        for (var j=$sels.length-1;j>=0;j--) {
            (function(j) {
                delay(1,function() {
                    $sels[j].click();
                },0.4);
            })(j);
        }
    },
    // 测试编辑
    step3: function() {
        // 点击编辑
        delay(1,function() {
            console.log('测试编辑和完成...');
            // 测试编辑和完成
            $('#car_edit').trigger('click');
        });
        // 点击完成
        delay(1,function() {
            $('#car_edit').trigger('click');
        },1.5);
    },
    // 测试加减和完成
    step4: function () {
        delay(1,function() {
            console.log('测试加减和完成...');
            // 测试编辑和完成
            $('#car_edit').trigger('click');
        });
        var $adds = $('.number_content .js_add');
        var $minus = $('.number_content .js_minus');
        // 加
        delay(1,function() {
            $adds[0].click;
            $adds[1] && $adds[1].click();
            $adds[2] && $adds[2].click();
            $adds[0].click();
            $adds[1] && $adds[1].click();
            $adds[2] && $adds[2].click();
            $adds[0].click();
            $adds[1] && $adds[1].click();
            $adds[2] && $adds[2].click();
        });
        // 减
        delay(1,function() {
            $minus[0].click();
            $minus[0].click()
            $minus[0].click()
            $minus[0].click();
            $minus[0].click();
            $minus[0].click()
            $minus[0].click()
            $minus[0].click();
        });
        // 点击完成
        delay(1,function() {
            $('#car_edit').trigger('click');
        });
    },
    // 测试删除
    step5: function() {
        var $list = $('#shopping_list .no_select');
        //  删除一个
        delay(1,function () {
            $('#car_edit').trigger('click');
            $list[0].click();
        });
        delay(1,function () {
            $('#delete_btn').trigger('click');
        });
        delay(1,function() {
            $('.pop_sure_btn').trigger('click');
        });
        // 全部删除
        delay(1,function () {
            $('.select_all').trigger('click');
        });
        delay(1,function() {
            $('#delete_btn').trigger('click');
        });
        delay(1,function() {
            $('.pop_sure_btn').trigger('click');
            var endTime = Date.now();
            alert('测试用时: ' + (endTime - startTime)/1000);
        });
    }
};
delay(0.1, function() {
    shopCarTest.init();
});

