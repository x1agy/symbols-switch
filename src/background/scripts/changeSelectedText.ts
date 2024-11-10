export const changeSelectedText = async () => {
  const selectedElement = document.activeElement;

  if (!selectedElement) return;

  try {
    if (selectedElement.textContent?.match(/[А-яЁё]/)) {
    }

    if (selectedElement.textContent?.match(/[A-z]/)) {
      const EN_LANG = (await chrome.storage.local.get('EN_LANG')).EN_LANG;
      selectedElement.textContent =
        selectedElement.textContent
          ?.split('')
          .map((item) => EN_LANG[item as keyof typeof EN_LANG] ?? item)
          .join('') ?? selectedElement.textContent;
    }
  } catch (e) {
    console.log({ e });
  }
};
