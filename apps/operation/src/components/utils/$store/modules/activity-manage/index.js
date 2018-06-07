import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 活动列表数据
     * @type {String}
     */
    activityData: '',
    addOrUpdateResult: '', // 新增或修改的结果
    delResult: ''
};

const ACTIVITY_MANAGE_SET_ACTIVITY_DATA = 'ACTIVITY_MANAGE_SET_ACTIVITY_DATA';
const ACTIVITY_MANAGE_SET_ADD_OR_UPDATE_RESULT = 'ACTIVITY_MANAGE_SET_ADD_OR_UPDATE_RESULT';
const ACTIVITY_MANAGE_SET_DEL_RESULT = 'ACTIVITY_MANAGE_SET_DEL_RESULT';

const mutations = {

    /**
     * 设置活动列表数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ACTIVITY_MANAGE_SET_ACTIVITY_DATA](state, mutation) {
        state.activityData = mutation.payload;
    },

    /**
     * 设置新增或编辑结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ACTIVITY_MANAGE_SET_ADD_OR_UPDATE_RESULT](state, mutation) {
        state.addOrUpdateResult = mutation.payload;
    },

    /**
     * 设置删除结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [ACTIVITY_MANAGE_SET_DEL_RESULT](state, mutation) {
        state.delResult = mutation.payload;
    }
};

const actions = {

    /**
     * 调用活动列表接口
     * @param {Object} context context
     * @param {Object} params params
     */
    async activityManageGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ACTIVITY_ACTIVITYLIST,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: ACTIVITY_MANAGE_SET_ACTIVITY_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取活动列表失败,错误号：${error.code}`);
        }
    },

    /**
     * 新增或编辑活动
     * @param {Object} context context
     * @param {Object} params params
     */
    async activityManageAddOrUpdateData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ACTIVITY_ADD_OR_UPDATE_ACTIVITY,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: ACTIVITY_MANAGE_SET_ADD_OR_UPDATE_RESULT,
                payload: response
            });
        } catch (error) {
            alert(`新增/编辑活动失败,错误号：${error.code}`);
        }
    },

    /**
     * 删除活动
     * @param {Object} context context
     * @param {Object} params params
     */
    async activityManageDelData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.ACTIVITY_DELETE_ACTIVITY,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: ACTIVITY_MANAGE_SET_DEL_RESULT,
                payload: response
            });
        } catch (error) {
            alert(`删除活动失败,错误号：${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取活动列表
     * @param {Object} state state
     * @return {String} activityData 活动列表数据
     */
    activityManageData(state) {
        return state.activityData;
    },

    /**
     * 新增、编辑结果
     * @param {Object} state state
     * @return {String} addOrUpdateResult  结果
     */
    activityManageAddOrUpdateResult(state) {
        return state.addOrUpdateResult;
    },

    /**
     * 删除结果
     * @param {Object} state state
     * @return {String} secondArea  二级列表
     */
    activityManageDelResult(state) {
        return state.delResult;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
