export const changeSelectedText = async () => {
  const selectedElement = document.activeElement;

  if (!selectedElement) return;

  try {
    if (selectedElement.textContent?.match(/[^A-z]/)) {
      const language = (await chrome.storage.sync.get('language')).language;
      const LANG_EN = (
        await chrome.storage.local.get(`${language ?? 'RU'}_EN`)
      )[`${language ?? 'RU'}_EN`];

      const textContent = selectedElement.textContent;

      selectedElement.textContent =
        textContent
          ?.split('')
          .map((item) => LANG_EN[item as keyof typeof LANG_EN] ?? item)
          .join('') ?? textContent;

      if (textContent !== selectedElement.textContent) {
        return;
      }
    }

    if (selectedElement.textContent?.match(/[A-z]/)) {
      const EN_LANG = (await chrome.storage.local.get('EN_LANG')).EN_LANG;
      selectedElement.textContent =
        selectedElement.textContent
          ?.split('')
          .map((item) => EN_LANG[item as keyof typeof EN_LANG] ?? item)
          .join('') ?? selectedElement.textContent;

      return;
    }
  } catch (e) {
    console.log({ e });
  }
};
