import { animate, inView } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

// Verifica se o usuário prefere menos animações
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Se as animações estiverem ativadas, prepara os elementos da página
if (!prefersReducedMotion) {
  const elementsToAnimate = [
    ".hero-copy",
    ".hero-image",
    ".step",
    ".slogan blockquote",
    "#servicos h2",
    "#servicos .intro",
    ".card",
    "#diferenciais h2",
    ".row",
    ".location-info",
    ".location-map-frame",
    ".contact h2",
    ".contact .intro",
    ".box",
  ];

  const elements = document.querySelectorAll(elementsToAnimate.join(", "));

  // Esconde os elementos antes de iniciar as animações
  elements.forEach((element) => {
    element.dataset.motion = "hidden";
  });

  document.documentElement.classList.add("motion-ready");

  // Anima cada elemento quando ele aparece na tela
  elements.forEach((element) => {
    const parentElements = element.parentElement.children;

    // Alguns elementos recebem um pequeno atraso entre as animações
    const shouldDelay = element.matches(".step, .card, .row, .box");

    const animationDelay = shouldDelay
      ? Array.prototype.indexOf.call(parentElements, element) * 0.08
      : 0;

    inView(
      element,
      () => {
        animate(
          element,
          {
            opacity: [0, 1],
            transform: ["translateY(24px)", "translateY(0px)"],
          },
          {
            duration: 0.65,
            delay: animationDelay,
            easing: "ease-out",
          }
        );
      },
      {
        once: true,
        amount: 0.12,
      }
    );
  });
}
