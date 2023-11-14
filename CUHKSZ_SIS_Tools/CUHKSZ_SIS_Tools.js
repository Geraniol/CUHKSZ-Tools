// ==UserScript==
// @name        CUHKSZ SIS Tools
// @description CUHKSZ SIS timing tool. Replace the original clock which refresh per second with a clock which will keep refreshing. Prevent pages from automatically closing. Turn into green at every ten minutes. Turn into green at the fifth second after loading. / CUHKSZ SIS 计时工具，将原来一秒钟刷新一次的时钟更换为不间断刷新的时钟；阻止页面自动关闭；在每个整十分钟显示绿色提示；在加载后第五秒钟显示绿色提示。
// @grant       none
// @version     1.5
// @match       https://sis.cuhk.edu.cn/*
// @run-at      document-end
// ==/UserScript==

clearInterval( window.int ); // 关闭原时钟
document.getElementById( "pthdr2bkgrnd" ).innerHTML += "<br />当前系统时间：<b id='systemTimeEx' style='border-radius: 5px; padding: 0 5px; font-family: monospace; font-size: 16px; color: #ffffff;'></b> 距离上次操作：<b id='lastClickEx' style='border-radius: 5px; padding: 0 5px; font-family: monospace; font-size: 16px; color: #ffffff;'></b> 秒 <iframe id='rto' style='display: none;'><iframe>";
var lastLoadTime = new Date().getTime(); // 记录静默时间
document.addEventListener( "load", () => { lastLoadTime = new Date().getTime(); }, true );
var ifs = document.getElementsByTagName( "iframe" );
for ( var i0 = 0; i0 < ifs.length; i0++ ) { ifs[ 0 ].onload = () => { ifs[ 0 ].contentDocument.addEventListener( "load", () => { lastLoadTime = new Date().getTime(); }, true ); }; };
setInterval( () =>
{
    document.getElementById( "rto" ).src = "";
    document.getElementById( "rto" ).src = "https://sis.cuhk.edu.cn/psp/csprd/EMPLOYEE/HRMS/?cmd=resettimeout";
}, 600000 ); // 阻止自动关闭
window.int = setInterval( () =>
{
    document.getElementById( "lastClickEx" ).innerText = ( ( new Date().getTime() - lastLoadTime ) / 1000 ).toString().padEnd( 5, "0" );
    if ( ( ( new Date().getTime() - lastLoadTime ) / 1000 ) >= 5 ) document.getElementById( "lastClickEx" ).style.background = "#008800";
    else document.getElementById( "lastClickEx" ).style.background = "#cc0000";
    document.getElementById( "systemTimeEx" ).innerText = ( new Date().toLocaleTimeString() + '.' + new Date().getMilliseconds() ).padEnd( 12, "0" );
    if ( new Date().getMinutes() % 10 == 0 ) document.getElementById( "systemTimeEx" ).style.background = "#008800";
    else document.getElementById( "systemTimeEx" ).style.background = "#cc0000";
}, 0 ); // 启用新时钟
