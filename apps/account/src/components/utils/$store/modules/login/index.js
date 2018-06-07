import util from 'util';
import $apiConf from '../../../$api-conf';



const state = {

    /**
     * 用户输入
     * @type {String}
     */
    input: '',

    /**
     * yahoo 天气接口响应
     * @type {String}
     */
    result: ''
};

const DEMO_SET_INPUT = 'DEMO_SET_INPUT';
const DEMO_SET_RESULT = 'DEMO_SET_RESULT';

const mutations = {

    /**
     * 设置用户输入
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [DEMO_SET_INPUT](state, mutation) {
        state.input = mutation.payload;
    },

    /**
     * 设置 yahoo 天气接口响应
     * @param {Object} state state
     * @param {FSA} mutation mutation
     */
    [DEMO_SET_RESULT](state, mutation) {
        state.result = mutation.payload;
    }
};

const actions = {

    /**
     * 设置用户输入
     * @param {Object} context context
     * @param {String} input 用户输入
     */
    async demoSetInput({
        commit
    }, input) {
        if (util.isString(input)) {
            commit({
                type: DEMO_SET_INPUT,
                payload: input
            });
        } else {
            throw new Error('[demoSetInput] invalid input');
        }
    },

    /**
     * 调用 yahoo 天气接口
     * @param {Object} context context
     */
    async demoGetWeathers({
        commit,
        dispatch,
        state
    }) {
        try {
            const response = await dispatch('$apisCall', {
                config: $apiConf.WEATHERS_GET,
                params: {
                    q: `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${state.input}")`
                }
            });

            commit({
                type: DEMO_SET_RESULT,
                payload: response.result
            });
        } catch (error) {
            commit({
                type: DEMO_SET_RESULT,
                payload: error.code ? '暂无数据，请重新输入' : '请求失败，请输入正确城市名'
            });
        }
    }
};

const getters = {

    /**
     * 获取用户输入
     * @param {Object} state state
     * @return {String} input 用户输入
     */
    demoInput(state) {
        return state.input;
    },

    /**
     * 获取 yahoo 天气接口响应
     * @param {Object} state state
     * @param {Object} getters getters
     * @return {Object} result yahoo 天气接口响应
     */
    demoResult(state, getters) {
        const entities = getters.$entities.channel;

        return (entities && entities[state.result]) || {
            error: state.result
        };
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
