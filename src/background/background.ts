import { changeSelectedText } from './scripts/changeSelectedText';
import EN_LANG from '@/constants/transliterations/EN-LANG.json';

chrome.storage.local.set({ EN_LANG });

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'selectElement',
    title: 'Транслитерировать текст',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'selectElement' && tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: changeSelectedText,
    });
  }
});
