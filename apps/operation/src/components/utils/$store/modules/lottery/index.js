import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 抽奖商品列表数据
     * @type {String}
     */
    lotteryData: '',

    addOrUpdateResult: '', // 新增或修改的结果
    delResult: ''
};

const LOTTERY_SET_LOTTERY_DATA = 'LOTTERY_SET_LOTTERY_DATA';
const LOTTERY_SET_ADD_OR_UPDATE_RESULT = 'LOTTERY_SET_ADD_OR_UPDATE_RESULT';
const LOTTERY_SET_DEL_RESULT = 'LOTTERY_SET_DEL_RESULT';

const mutations = {

    /**
     * 设置抽奖商品列表数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOTTERY_SET_LOTTERY_DATA](state, mutation) {
        state.lotteryData = mutation.payload;
    },


    /**
     * 设置新增或编辑结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOTTERY_SET_ADD_OR_UPDATE_RESULT](state, mutation) {
        state.addOrUpdateResult = mutation.payload;
    },

    /**
     * 设置删除结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [LOTTERY_SET_DEL_RESULT](state, mutation) {
        state.delResult = mutation.payload;
    }
};

const actions = {

    /**
     * 调用抽奖商品列表接口
     * @param {Object} context context
     * @param {Object} params params
     */
    async lotteryGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.LOTTERY_LOTTERYLIST,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: LOTTERY_SET_LOTTERY_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取抽奖商品列表失败,错误号：${error.code}`);
        }
    },


    /**
     * 新增或编辑抽奖商品
     * @param {Object} context context
     * @param {Object} params params
     */
    async lotteryAddOrUpdateData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.LOTTERY_ADD_OR_UPDATE_LOTTERY,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: LOTTERY_SET_ADD_OR_UPDATE_RESULT,
                payload: response
            });
        } catch (error) {
            alert(`新增/编辑抽奖商品失败,错误号：${error.code}`);
        }
    },

    /**
     * 删除抽奖商品
     * @param {Object} context context
     * @param {Object} params params
     */
    async lotteryDelData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.LOTTERY_DELETE_LOTTERY,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: LOTTERY_SET_DEL_RESULT,
                payload: response
            });
        } catch (error) {
            alert(`删除抽奖商品失败,错误号：${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取抽奖商品列表
     * @param {Object} state state
     * @return {String} lotteryData 抽奖商品列表数据
     */
    lotteryData(state) {
        return state.lotteryData;
    },

    /**
     * 新增、编辑结果
     * @param {Object} state state
     * @return {String} addOrUpdateResult  结果
     */
    lotteryAddOrUpdateResult(state) {
        return state.addOrUpdateResult;
    },

    /**
     * 删除结果
     * @param {Object} state state
     * @return {String} secondArea  二级列表
     */
    lotteryDelResult(state) {
        return state.delResult;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
