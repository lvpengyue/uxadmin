export default {
    /*
        登陆接口
    */
    COMMENTLOGIN: {
        name: 'COMMENTLOGIN',

        proxy: {
            url: '/commentLogin',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        登出接口
    */
    COMMENTLOGINOUT: {
        name: 'COMMENTLOGINOUT',

        proxy: {
            url: '/commentLoginOut',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        获取一级地址列表
    */
    ACTIVITY_FIRST_AREA: {
        name: 'ACTIVITY_FIRST_AREA',

        proxy: {
            url: '/activity/firstarea',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        获取二级地址列表
    */
    ACTIVITY_SECOND_AREA: {
        name: 'ACTIVITY_SECOND_AREA',

        proxy: {
            url: '/activity/secondarea',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        获取优惠券列表
    */
    LOTTERY_COUPONLIST: {
        name: 'LOTTERY_COUPONLIST',

        proxy: {
            url: '/lottery/couponList',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        活动商品获取活动列表
    */
    LOTTERY_GET_ACTIVITY_LIST: {
        name: 'LOTTERY_GET_ACTIVITY_LIST',

        proxy: {
            url: '/lottery/getActivityList',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        活动商品获取活动列表
    */
    COMMENT_ALL_PRODUCT: {
        name: 'COMMENT_ALL_PRODUCT',

        proxy: {
            url: '/comment/allProduct',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    }
};
