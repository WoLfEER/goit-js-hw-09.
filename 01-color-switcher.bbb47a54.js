!function(){var t={stopBtn:document.querySelector("[data-stop]"),startBtn:document.querySelector("[data-start]")},e=t.stopBtn,n=t.startBtn,o=0;n.addEventListener("click",(function(){n.setAttribute("disabled",""),o=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(){clearInterval(o),n.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.bbb47a54.js.map
