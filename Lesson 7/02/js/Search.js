Vue.component("search", {
    props: ["search"],
    template: `
        <form action="#" class="search-form">
            <input type="text" class="search-field" :value="search" v-on:input="$emit('input', $event.target.value)"/>
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `,
});
