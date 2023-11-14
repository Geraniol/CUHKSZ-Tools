// ==UserScript==
// @name        CUHKSZ OCTE Tools
// @description CUHKSZ OCTE autofill tool. / CUHKSZ OCTE 自动评教工具。
// @grant       none
// @version     1.0
// @match       https://octe.cuhk.edu.cn/*
// @run-at      document-end
// ==/UserScript==

window.onload = () => {
    if (top == self) {
        document.getElementsByTagName("header")[0].innerHTML += "<div id='octebtn' style='width: 160px; height: 36px; position: fixed; top: 7px; left: calc(50% - 80px); z-index: 1000; background: #dddddd; border-radius: 18px; transition: 0.5s; font-size: 16px; font-weight: bold; color: #633869; display: flex; justify-content: center; align-items: center;'>自 动 填 写</div>";
        document.getElementById("octebtn").addEventListener('click', () => {
            var rows = top.document.getElementsByClassName("tab-pane active")[0].firstChild.contentDocument.getElementsByClassName("layui-row");
            for (var optx = 0; optx < rows.length; optx++) {
                if (rows[optx].innerHTML.indexOf("<input") != -1) {
                    if (optx < 20) var position = Math.floor(Math.random() * rows[optx].childElementCount); else var position = 3;
                    try { rows[optx].getElementsByClassName("layui-unselect")[position].click(); } catch { };
                }
            }
            var rows = top.document.getElementsByClassName("tab-pane active")[0].firstChild.contentDocument.getElementsByClassName("bottom-inline");
            for (var optx = 0; optx < rows.length; optx++) {
                if (rows[optx].innerHTML.indexOf("<input") != -1) {
                    var position = 3;
                    try { rows[optx].getElementsByClassName("layui-unselect")[position].click(); } catch { };
                }
            }
            document.getElementById("octebtn").style.background = "#dda300";
            setTimeout(() => { document.getElementById("octebtn").style.background = "#dddddd"; }, 1000);
        })
    }
}