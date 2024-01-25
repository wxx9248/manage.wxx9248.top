// Styles
import "vuetify/styles";

// Vuetify
import {createVuetify} from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {md, aliases} from "vuetify/iconsets/md";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark"
    },
    icons: {
        defaultSet: "md",
        aliases,
        sets: {
            md
        }
    }
});

export default vuetify;
