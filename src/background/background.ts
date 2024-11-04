chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'selectElement',
    title: 'Получить данные о выбранном элементе',
    contexts: ['all'],
  });
});

function getElementInfo() {
  const element = document.activeElement;
  console.log(element?.textContent);
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'selectElement' && tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getElementInfo,
    });
  }
});
