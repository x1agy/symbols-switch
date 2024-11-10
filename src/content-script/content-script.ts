import { changeSelectedText } from '@/background/scripts/changeSelectedText';

let keysCache: string[];
let keysHistory: string[] = [];

const listenBindKeys = async (event: KeyboardEvent) => {
  const keys: string[] | undefined =
    keysCache ?? (await chrome.storage.sync.get('bindKeys')).bindKeys;
  keysCache = keys;

  if (!keys) return;

  const isRightKey = keys?.includes(event.key);

  if (isRightKey) {
    switch (keysHistory.length) {
      case 0: {
        keysHistory.push(event.key);
        break;
      }
      case 1: {
        if (keysHistory[0] === event.key) {
          keysHistory = [];
        } else {
          keysHistory = [];
          changeSelectedText();
        }
        break;
      }
    }
  } else {
    keysHistory = [];
  }
};

document.addEventListener('keydown', listenBindKeys);
