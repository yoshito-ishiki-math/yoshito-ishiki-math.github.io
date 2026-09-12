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
async function copyText(elementId, button) {
  const element = document.getElementById(elementId);
  let status = button.parentElement.querySelector('.copy-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'copy-status';
    status.setAttribute('role', 'status');
    button.parentElement.appendChild(status);
  }
  const japanese = document.documentElement.lang === 'ja';
  try {
    if (!element || !navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(element.textContent.trim());
    status.textContent = japanese ? 'コピーしました。' : 'Copied.';
  } catch {
    status.textContent = japanese
      ? 'コピーできませんでした。引用文を選択してコピーしてください。'
      : 'Could not copy. Please select and copy the citation text.';
  }
}

translation("en");
