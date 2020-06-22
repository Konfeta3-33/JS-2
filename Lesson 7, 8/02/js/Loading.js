Vue.component("loading", {
    props: ["loading"],
    template: `
        <div v-show="loading">Нет данных</div>
    `,
});
