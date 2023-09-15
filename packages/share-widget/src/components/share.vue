<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue";

const props = withDefaults(
    defineProps<{
        visible: boolean;
    }>(),
    {
        visible: false,
    }
);
const emit = defineEmits<{
    (e: "update:visible", visible: boolean): void;
}>();

const onVisibleChange = (visible: boolean) => {
    emit("update:visible", visible);
};
const closeModal = () => {
    props.visible = false;
    onVisibleChange(props.visible);
};
const info = ref<any>();
onBeforeMount(() => {
    // @ts-ignore
    info.value = window.post;
});
const goto = (type: string) => {
    switch (type) {
        case "weibo":
            window.open("https://service.weibo.com/share/share.php?url=" + info.value.status.permalink);
    }
};
</script>

<template>
    <div
        v-show="visible"
        @click.self="closeModal"
        class="halo-share-widget w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-40 z-[99999999]"
    >
        <div class="halo-share-items absolute bottom-0 bg-white w-full p-2">
            <p class="text-xs text-gray-500">分享</p>
            <div class="share-lists">
                {{ info }}
                <button @click="goto('qq')">QQ</button>
                <button @click="goto('weibo')">QQ</button>
                <button @click="goto('oooo')">QQ</button>
            </div>
            <div class="h-[1px] bg-black"></div>
        </div>
    </div>
</template>
