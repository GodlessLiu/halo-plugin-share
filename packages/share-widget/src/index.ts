import ShareWidget from "@/components/share.vue";
import "@/styles/tailwind.css";
import type { App, Plugin } from "vue";
const plugin: Plugin = {
    install(app: App) {
        app.component("ShareWidget", ShareWidget);
    },
};

export default plugin;

export { ShareWidget };
