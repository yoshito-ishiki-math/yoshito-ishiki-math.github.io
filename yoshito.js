// Show the selected language and hide the other language.
function translation(argLang) {
  const elements = document.getElementsByClassName("cngLang");

  for (let i = 0; i < elements.length; i++) {
    const isSelectedLanguage = elements[i].getAttribute("lang") === argLang;
    elements[i].style.display = isSelectedLanguage ? "" : "none";
  }

  // Tell browsers and screen readers which language is currently displayed.
  document.documentElement.lang = argLang;
}

// Copy citation text while keeping it selectable when JavaScript is unavailable.
function copyText(elementId, button) {
  const element = document.getElementById(elementId);

  if (!element || !navigator.clipboard) {
    return;
  }

  navigator.clipboard.writeText(element.textContent.trim()).then(function () {
    const originalLabel = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(function () {
      button.textContent = originalLabel;
    }, 1600);
  });
}

translation("en");
