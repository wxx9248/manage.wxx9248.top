<template>
    <v-app>
        <v-app-bar>
            <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen;">
                <v-icon icon="md:menu" />
            </v-app-bar-nav-icon>
            <v-app-bar-title>Management Portal</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon @click="toggleTheme">
                <v-icon v-if="isLightTheme" icon="md:dark_mode" />
                <v-icon v-else icon="md:light_mode" />
            </v-app-bar-nav-icon>
        </v-app-bar>
        <v-main>
            <v-navigation-drawer v-model="isDrawerOpen" @transitionend="updateEgg">
                <v-list nav>
                    <v-list-item :title="eggContent[eggCount]" ref="egg"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-container class="container">
                <v-card v-for="entry in entries" class="card" variant="outlined">
                    <v-img :aspect-ratio="16 / 9" :src="entry.image" class="image">
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular indeterminate />
                            </div>
                        </template>
                    </v-img>
                    <v-card-title>{{ entry.title }}</v-card-title>
                    <v-card-subtitle>{{ entry.subtitle }}</v-card-subtitle>
                    <v-card-text>{{ entry.text }}</v-card-text>
                    <v-card-actions>
                        <v-btn variant="tonal" prepend-icon="md:open_in_new" @click="openInNewTab(entry.url)">Open</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import matrixLogoURL from "@/assets/images/matrix-logo.svg";
import postgresLogoURL from "@/assets/images/postgres-logo.svg";
import projectXLogoURL from "@/assets/images/project-x-logo.png";
import qBittorrentLogoURL from "@/assets/images/qbittorrent-logo.svg";

import {useTheme} from "vuetify";

export default {
    name: "App",
    components: {},
    setup() {
        const theme = useTheme();
        const eggContent = [
            "Nothing here :)",
            "Hey, really, nothing here",
            "I already said nothing is here",
            "Please stop",
            "I don't have anything to show you",
            "You think it's interesting?",
            "You're just bored",
            "Do something meaningful, okay?",
            "Okay, fine, haha, you win"
        ];
        return {theme, eggContent};
    },
    data: () => ({
        isLightTheme: false,
        isDrawerOpen: false,
        entries: [
            {
                "title": "PostgreSQL Database Management",
                "subtitle": "pgAdmin",
                "text": "",
                "url": "pgadmin4",
                "image": postgresLogoURL
            },
            {
                "title": "qBittorrent Web UI",
                "subtitle": "qBittorrent",
                "text": "",
                "url": "qBitWebUI",
                "image": qBittorrentLogoURL
            },
            {
                "title": "Synapse (Matrix) Server Administration",
                "subtitle": "synapse-admin",
                "text": "",
                "url": "synapse-admin",
                "image": matrixLogoURL
            }
        ],
        eggCount: 0
    }),
    methods: {
        openInNewTab(url) {
            window.open(url);
        },
        toggleTheme() {
            this.isLightTheme = !this.isLightTheme;
        },
        updateEgg() {
            if (!this.isDrawerOpen && this.eggCount < this.eggContent.length - 1) {
                ++this.eggCount;
            }
        }
    },
    watch: {
        isLightTheme(newValue) {
            this.theme.global.name.value = newValue ? 'light' : 'dark';
        }
    },
    computed: {
        imageFilter() {
            return this.isLightTheme ? "contrast(100%)" : "contrast(80%)";
        }
    }
};
</script>

<style scoped>
.container {
    display               : grid;
    gap                   : 2rem;
    grid-template-columns : auto auto auto;
    height                : 100%;
    width                 : 100%;
}

@media screen and (max-width : 768px) {
    .container {
        grid-template-columns : auto;
    }
}

.card {
    display        : flex;
    flex-direction : column;
}

.card .image {
    height : 10rem;
    margin : 1rem;
    width  : auto;
}

@media (prefers-color-scheme : dark) {
    .card .image {
        filter: v-bind(imageFilter);
    }
}
</style>
