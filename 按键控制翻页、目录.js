// ==UserScript==
// @name         按键控制翻页、目录
// @namespace    https://nuclearvga.github.io/
// @version      1.0
// @description  按⬅➡键前后翻页，Enter键进入目录.
// @author       NuclearVGA
// @include      *
// @run-at       document-end
// @grant        none
// ==/UserScript==

const key_for_text = {
    'ArrowLeft': ['上一页', '上一章',],
    'Enter': ['目录', '章节列表',],
    'ArrowRight': ['下一页', '下一章',],
}

function main(ev) {
    console.debug(`On Key Down:\tkey:${ev.key}, code:${ev.keyCode}`);
    if (ev.key in key_for_text) {
        let array = document.getElementsByTagName('a');
        for (let index = 0; index < array.length; index++) {
            key_for_text[ev.key].forEach(text => {
                if (index < array.length) {
                    if (array[index].innerText.match(text)) {
                        if (ev.keyCode) {
                            window.location = array[index].href;
                        } else {
                            var iframe = document.createElement('iframe');
                            iframe.src = array[index].href;
                            document.body.appendChild(iframe);
                        }
                        index = array.length;
                        console.debug(`Find ${text} in\t`, array[index]);
                    }
                }
            });
        }
    }
}

window.onkeydown = main;

for (const key in key_for_text) {
    console.debug('Add Key Listener:\t' + key);
    main({ 'key': key });
}
