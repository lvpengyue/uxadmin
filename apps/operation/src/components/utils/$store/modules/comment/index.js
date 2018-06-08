import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 评论列表数据
     * @type {String}
     */
    data: '',

    updateResult: '', // 修改的结果/启用/禁用
    upResult: '', // 置顶的结果
    addResult: '' // 评论员新增评论的结果
};

const COMMENT_SET_DATA = 'COMMENT_SET_DATA';
const COMMENT_SET_UPDATE_RESULT = 'COMMENT_SET_UPDATE_RESULT';
const COMMENT_SET_UP_RESULT = 'COMMENT_SET_UP_RESULT';
const COMMENT_SET_ADD_RESULT = 'COMMENT_SET_ADD_RESULT';

const mutations = {

    /**
     * 设置评论列表的数据
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [COMMENT_SET_DATA](state, mutation) {
        state.data = mutation.payload;
    },


    /**
     * 设置修改的结果/启用/禁用
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [COMMENT_SET_UPDATE_RESULT](state, mutation) {
        state.updateResult = mutation.payload;
    },

    /**
     * 设置置顶的结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [COMMENT_SET_UP_RESULT](state, mutation) {
        state.upResult = mutation.payload;
    },

    /**
     * 设置新增评论结果
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [COMMENT_SET_ADD_RESULT](state, mutation) {
        state.addResult = mutation.payload;
    }
};

const actions = {

    /**
     * 调用评论列表接口
     * @param {Object} context context
     * @param {Object} params params
     */
    async commentGetData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMMENT_LIST,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: COMMENT_SET_DATA,
                payload: response
            });
        } catch (error) {
            console.log(`获取评论列表失败,错误号：${error.code}`);
        }
    },


    /**
     * 编辑评论/启动/禁用
     * @param {Object} context context
     * @param {Object} params params
     */
    async commentUpdateData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMMENT_UPDATE_COMMENT,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: COMMENT_SET_UPDATE_RESULT,
                payload: response
            });
        } catch (error) {
            alert(`修改评论失败,错误号：${error.code}`);
        }
    },

    /**
     * 置顶的结果
     * @param {Object} context context
     * @param {Object} params params
     */
    async commentUpData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMMENT_UPDATE_COMMENT,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: COMMENT_SET_UP_RESULT,
                payload: response
            });
        } catch (error) {
            alert(`置顶评论失败,错误号：${error.code}`);
        }
    },

    /**
     * 新增评论
     * @param {Object} context context
     * @param {Object} params params
     */
    async commentAddData({
        commit,
        dispatch,
        state
    }, params) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.COMMENT_ADD_COMMENT,
                params: Object.assign({}, params, {
                    account: this.getters.$groupAccount.account,
                    password: this.getters.$groupAccount.password
                })
            });

            commit({
                type: COMMENT_SET_ADD_RESULT,
                payload: response
            });
        } catch (error) {
            alert(`新增评论失败,错误号：${error.code}`);
        }
    }
};

const getters = {

    /**
     * 获取评论列表
     * @param {Object} state state
     * @return {String} data 评论列表
     */
    commentData(state) {
        return state.data;
    },

    /**
     * 编辑结果/启用/禁用
     * @param {Object} state state
     * @return {String} updateResult  结果
     */
    commentUpdateResult(state) {
        return state.updateResult;
    },

    /**
     * 置顶评论的结果
     * @param {Object} state state
     * @return {String} updateResult  结果
     */
    commentUpResult(state) {
        return state.upResult;
    },

    /**
     * 新增结果
     * @param {Object} state state
     * @return {String} addResult  新增结果
     */
    commentAddResult(state) {
        return state.addResult;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
