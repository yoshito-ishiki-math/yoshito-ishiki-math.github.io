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

translation("en");
