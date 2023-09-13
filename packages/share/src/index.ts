function init() {
    console.log(1111);
}
console.log(1111);

document.addEventListener(
    "DOMContentLoaded",
    () => {
        init;
    },
    {
        once: true,
    }
);
