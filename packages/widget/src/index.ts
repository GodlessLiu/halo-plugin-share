import { createApp, defineComponent } from "vue";
//@ts-ignore
import { ShareWidget } from "@halo-dev/share-widget";
import "@halo-dev/share-widget/dist/style.css";

// SearchWidget will mount this dom
const container = document.createElement("div");
const root = document.createElement("div");
const styleEl = document.createElement("link");
const shadowDOM = container.attachShadow?.({ mode: "open" }) || container;
styleEl.setAttribute("rel", "stylesheet");
styleEl.setAttribute("href", "/plugins/PluginShareWidget/assets/static/style.css");
shadowDOM.appendChild(styleEl);
shadowDOM.appendChild(root);
document.body.appendChild(container);

function createComponent() {
    if (!container || !root) {
        return;
    }

    const rootComponent = defineComponent({
        components: {
            ShareWidget,
        },
        data() {
            return {
                visible: false,
            };
        },
        mounted() {
            this.visible = true;
        },
        methods: {
            onVisibleChange(visible: boolean) {
                if (!visible) {
                    setTimeout(() => {
                        app.unmount();
                    }, 200);
                }
            },
        },
        template: `
          <ShareWidget v-model:visible="visible" @update:visible="onVisibleChange"/>`,
    });

    const app = createApp(rootComponent);
    app.mount(root);
}

export function open() {
    createComponent();
}
setTimeout(createComponent, 1000);
