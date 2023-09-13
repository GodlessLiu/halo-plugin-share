import satori from "satori";
import * as React from "react";
// init svg
function init() {
    fetch("http://localhost:8090/apis/api.console.halo.run/v1alpha1/plugins/PluginShareWidget/config").then((res) => {
        console.log(res);
    });
    fetch("/upload/Roboto-Black.ttf").then(async (res) => {
        const arrayBuffer = await res.arrayBuffer();
        const header = document.querySelector("#header")!;
        const svg = await satori(<div>hello world</div>, {
            width: 600,
            height: 400,
            fonts: [
                {
                    name: "Roboto",
                    data: arrayBuffer,
                    weight: 400,
                    style: "normal",
                },
            ],
        });
        header.innerHTML = svg;
    });
}
if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", init);
} else {
    // `DOMContentLoaded` has already fired
    init();
}
