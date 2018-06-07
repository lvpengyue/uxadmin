import util from 'util';
import vue from 'vue';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 用户信息
     * @type {Object}
     */
    account: null,

    firstArea: '', // 一级区域列表
    secondArea: '', // 二级区域列表
    couponList: '', // 优惠券列表
    activityList: '', // 活动列表
    productList: '' // 所有商品列表
};

const $GROUP_SET_ACCOUNT = '$GROUP_SET_ACCOUNT';
const $GROUP_CLEAR_ACCOUNT = '$GROUP_CLEAR_ACCOUNT';
const $GROUP_SET_FIRST_AREA = '$GROUP_SET_FIRST_AREA';
const $GROUP_SET_SECOND_AREA = '$GROUP_SET_SECOND_AREA';
const $GROUP_SET_COUPON_LIST = '$GROUP_SET_COUPON_LIST';
const $GROUP_SET_ACTIVITY_LIST = '$GROUP_SET_ACTIVITY_LIST';
const $GROUP_SET_PRODUCT_LIST = '$GROUP_SET_PRODUCT_LIST';


const mutations = {

    /**
     * 设置登录的账号
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_ACCOUNT](state, mutation) {
        state.account = mutation.payload;
    },

    /**
     * 清除账号
     * @param {Object} state state
     */
    [$GROUP_CLEAR_ACCOUNT](state) {
        state.account = null;
    },

    /**
     * 设置一级区域列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_FIRST_AREA](state, mutation) {
        state.firstArea = mutation.payload;
    },

    /**
     * 设置二级区域列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_SECOND_AREA](state, mutation) {
        state.secondArea = '';
        state.secondArea = mutation.payload;
    },

    /**
     * 设置优惠券列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_COUPON_LIST](state, mutation) {
        state.couponList = mutation.payload;
    },

    /**
     * 设置活动列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_ACTIVITY_LIST](state, mutation) {
        state.activityList = mutation.payload;
    },

    /**
     * 设置商品列表
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [$GROUP_SET_PRODUCT_LIST](state, mutation) {
        state.productList = mutation.payload;
    }
};

const actions = {

    /**
     * 登录
     * @method $groupLogin
     * @param {Object} context context
     * @param {Object} input 用户名,密码
     */
    async $groupLogin({
        commit,
        dispatch
    }, input) {
        if (util.isObject(input)) {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMMENTLOGIN,
                params: input
            });

            commit({
                type: $GROUP_SET_ACCOUNT,
                payload: response.data
            });
        } else {
            throw new Error('[$groupLogin] invalid input');
        }
    },

    /**
     * 登出
     * @method $groupLogout
     * @param {Object} context context
     * @param {Object} account 用户名
     */
    async $groupLogout({
        commit,
        dispatch
    }, account) {
        await dispatch('$apisCall', {
            config: $apiConf.COMMENTLOGINOUT,
            params: account
        });

        commit({
            type: $GROUP_CLEAR_ACCOUNT
        });
    },

    /**
     * 设置用户信息
     * @method $groupSetAccount
     * @param {Object} context context
     * @param {Object} info 登陆用户信息修改
     */
    async $groupSetAccount({
        commit
    }, info) {
        if (util.isObject(info)) {
            commit({
                type: $GROUP_SET_ACCOUNT,
                payload: info
            });
        } else {
            throw new Error('$groupSetAccount invalid info');
        }
    },

    /**
     * 清空状态数里账号状态为null
     * @method $groupClearAccount
     * @param {Object} context context
     */
    $groupClearAccount({
        commit
    }) {
        commit({
            type: $GROUP_CLEAR_ACCOUNT
        });
    },

    /**
     * 个人修改密码
     * @method $groupResetPassword
     * @param {Object} context context
     *  @param {Object} resetForm 修改密码表单数据
     */
    async $groupResetPassword({
        commit,
        dispatch
    }, resetForm) {
        if (util.isObject(resetForm)) {
            await dispatch('$apisCall', {
                config: $apiConf.JM_USER_CHANGE_PASSWORD,
                params: JSON.stringify(resetForm)
            });
        } else {
            throw new Error('$groupResetPassword invalid resetForm');
        }
    },

    /**
     * 修改个人资料
     * @method $groupEditSelfInfo
     * @param {Object} context context
     *  @param {Object} formEdit 编辑个人资料数据
     */
    async $groupEditSelfInfo({
        commit,
        dispatch
    }, formEdit) {
        if (util.isObject(formEdit)) {
            await dispatch('$apisCall', {
                config: $apiConf.JM_USER_EDIT,
                params: JSON.stringify(formEdit)
            });
        } else {
            throw new Error('$groupResetPassword invalid formEdit');
        }
    },

    /**
     * 获取一级列表地址
     * @param {Object} context context
     */
    async $groupGetFirstArea({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ACTIVITY_FIRST_AREA,
                params: Object.assign({}, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: $GROUP_SET_FIRST_AREA,
                payload: response
            });
        } catch (error) {
            alert(`获取一级地址列表失败,错误号：${error.code}`);
        }
    },

     /**
     * 获取二级地址列表接口
     * @param {Object} context context
     * @param {Object} params params
     */
    async $groupGetSecondArea({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ACTIVITY_SECOND_AREA,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: $GROUP_SET_SECOND_AREA,
                payload: response
            });
        } catch (error) {
            alert(`获取二级地址列表失败,错误号：${error.code}`);
        }
    },

     /**
     * 获取优惠券列表
     * @param {Object} context context
     * @param {Object} params params
     */
    async $groupGetCouponList({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.LOTTERY_COUPONLIST,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: $GROUP_SET_COUPON_LIST,
                payload: response.data
            });
        } catch (error) {
            alert(`获取优惠券列表失败,错误号：${error.code}`);
        }
    },

    /**
     * 获取活动列表
     * @param {Object} context context
     * @param {Object} params params
     */
    async $groupGetActivityList({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.LOTTERY_GET_ACTIVITY_LIST,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: $GROUP_SET_ACTIVITY_LIST,
                payload: response.data
            });
        } catch (error) {
            alert(`获取活动列表失败,错误号：${error.code}`);
        }
    },

    /**
     * 获取商品所有列表
     * @param {Object} context context
     * @param {Object} params params
     */
    async $groupGetProductList({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMMENT_ALL_PRODUCT,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: $GROUP_SET_PRODUCT_LIST,
                payload: response.data
            });
        } catch (error) {
            alert(`获取商品列表失败,错误号：${error.code}`);
        }
    }

};

const getters = {

    /**
     * 获取用户信息
     * @param {Object} state 状态数据
     * @return {Object} state.account 用户对象
     */
    $groupAccount(state) {
        return state.account;
    },

    /**
     * 一级地址数据
     * @param {Object} state state
     * @return {String} firstArea 一级地址列表
     */
    $groupFirstArea(state) {
        return state.firstArea;
    },

    /**
     * 二级地址列表
     * @param {Object} state state
     * @return {String} secondArea  二级列表
     */
    $groupSecondArea(state) {
        return state.secondArea;
    },

    /**
     * 优惠券列表
     * @param {Object} state state
     * @return {String} couponList  优惠券列表
     */
    $groupCouponList(state) {
        return state.couponList;
    },

    /**
     * 活动列表
     * @param {Object} state state
     * @return {String} ActivityList  活动列表
     */
    $groupActivityList(state) {
        return state.activityList;
    },

    /**
     * 商品列表
     * @param {Object} state state
     * @return {String} ActivityList  活动列表
     */
    $groupProductList(state) {
        return state.productList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
