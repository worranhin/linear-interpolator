//jshint esversion: 6

const app = Vue.createApp({
    data() {
        return {
            known1: 1,
            known2: 2,
            expected: 1.5,
            data1: 1,
            data2: 2,
        };
    },
    computed: {
        dataGet() {
            return this.data1 + (this.data2 - this.data1) / 
                (this.known2 - this.known1) * (this.expected - this.known1);
        }
    }
});

const vm = app.mount('#app');