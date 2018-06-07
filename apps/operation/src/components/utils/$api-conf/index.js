import $apiConf from '@components/utils/$api-conf';
import $schemas from '../$schemas';



export default Object.assign({
    /*
        活动列表
    */
    ACTIVITY_ACTIVITYLIST: {
        name: 'ACTIVITY_ACTIVITYLIST',

        proxy: {
            url: '/activity/activityList',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        增加或修改活动
    */
    ACTIVITY_ADD_OR_UPDATE_ACTIVITY: {
        name: 'ACTIVITY_ADD_OR_UPDATE_ACTIVITY',

        proxy: {
            url: '/activity/addorupdateActivity',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除活动
    */
    ACTIVITY_DELETE_ACTIVITY: {
        name: 'ACTIVITY_DELETE_ACTIVITY',

        proxy: {
            url: '/activity/deleteActivity',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        活动商品列表
    */
    LOTTERY_LOTTERYLIST: {
        name: 'LOTTERY_LOTTERYLIST',

        proxy: {
            url: '/lottery/lotteryList',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        新增或编辑抽奖商品
    */
    LOTTERY_ADD_OR_UPDATE_LOTTERY: {
        name: 'LOTTERY_ADD_OR_UPDATE_LOTTERY',

        proxy: {
            url: '/lottery/addorupdateLottery',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        删除抽奖商品
    */
    LOTTERY_DELETE_LOTTERY: {
        name: 'LOTTERY_DELETE_LOTTERY',

        proxy: {
            url: '/lottery/deleteLottery',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        评论列表
    */
    COMMENT_LIST: {
        name: 'COMMENT_LIST',

        proxy: {
            url: '/comment/list',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        修改评论/禁用/启用
    */
    COMMENT_UPDATE_COMMENT: {
        name: 'COMMENT_UPDATE_COMMENT',

        proxy: {
            url: '/comment/updateComment',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    },

    /*
        管理员添加评论
    */
    COMMENT_ADD_COMMENT: {
        name: 'COMMENT_ADD_COMMENT',

        proxy: {
            url: '/comment/addComment',
            method: 'POST',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        }
    }

}, $apiConf);
