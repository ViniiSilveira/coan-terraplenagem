(function () {
  "use strict";

  var aviso = document.getElementById("aviso");

  function selecionarTexto(elemento) {
    var intervalo = document.createRange();
    intervalo.selectNodeContents(elemento);

    var selecao = window.getSelection();
    selecao.removeAllRanges();
    selecao.addRange(intervalo);

    if (aviso) {
      aviso.textContent = "Texto selecionado. Use Ctrl+C para copiar.";
    }
  }

  document.querySelectorAll("[data-copy]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var elemento = document.getElementById(botao.getAttribute("data-copy"));
      if (!elemento) return;

      var texto = elemento.textContent.trim();

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto)
          .then(function () {
            if (aviso) aviso.textContent = "Copiado: " + texto;
          })
          .catch(function () { selecionarTexto(elemento); });
      } else {
        selecionarTexto(elemento);
      }
    });
  });
})();
