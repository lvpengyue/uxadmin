import header from '@components/widgets/header/index.vue';
import footer from '@components/widgets/footer/index.vue';



export default {
    components: {

        // https://github.com/sebastian-software/vue-locale/issues/46
        // prefix 'c' means 'component'
        cHeader: header,
        cFooter: footer
    }
};
