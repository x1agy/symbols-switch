import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import Flex from 'antd/es/flex';
import Typography from 'antd/es/typography';
import Button from 'antd/es/button';
import Select from 'antd/es/select';
import Input from 'antd/es/input';
import Tooltip from 'antd/es/tooltip';
import Github from '@/shared/UI/Icons/GithubIcon.svg?react';
import Telegram from '@/shared/UI/Icons/TelegramIcon.svg?react';
import Language from '@/shared/UI/Icons/Language.svg?react';

import styles from './App.module.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<
    string | undefined
  >();
  const [rightInput, setRightInput] = useState<string | undefined>();
  const timer = useRef<number | undefined>();

  useEffect(() => {
    const func = async () => {
      const language = (await chrome.storage.sync.get('language')).language;
      const bindKeys = (await chrome.storage.sync.get('bindKeys')).bindKeys;

      setRightInput(bindKeys?.[1]);
      setSelectedLanguage(language);
    };

    func();
  });

  const handleChangeLanguage = (value: string) => {
    chrome.storage.sync.set({ language: value });

    setSelectedLanguage(value);
  };

  const handleChangeInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key) {
      setRightInput(event.key);

      const id = setTimeout(() => {
        chrome.storage.sync.set({ bindKeys: ['Control', event.key] });
        timer.current = undefined;
      }, 1000);

      if (timer.current !== undefined) {
        clearTimeout(timer.current);
      }

      timer.current = id;
    }
  };

  return (
    <Flex vertical justify='center' className={styles.holder}>
      <Flex className={styles.settings} justify='space-between'>
        <Flex className={styles.hotKeys} align='center'>
          <Input
            className={styles.hotKeys_input}
            value='Control'
            onChange={() => {}}
          />
          +
          <Input
            className={styles.hotKeys_input}
            onKeyUp={handleChangeInput}
            value={rightInput}
          />
          <Tooltip title='Рекомендую поставить на Shift, клавиши с буквами могут вызвать баги'>
            <span className={styles.questionMark}>?</span>
          </Tooltip>
        </Flex>
        <Select
          placeholder={<Language />}
          onChange={handleChangeLanguage}
          value={selectedLanguage}
          className={styles.select}
        >
          <Select.Option value='RU'>RU</Select.Option>
          <Select.Option value='UA'>UA</Select.Option>
        </Select>
      </Flex>
      <Typography.Title>{chrome.i18n.getMessage('hello')}</Typography.Title>
      <Typography.Text>{chrome.i18n.getMessage('description')}</Typography.Text>
      <Flex gap={16} className={styles.links} justify='center'>
        <Button
          onClick={() =>
            chrome.tabs.create({ url: 'https://github.com/x1agy' })
          }
          className={styles.button}
        >
          <Github className={styles.github} />
        </Button>
        <Button
          onClick={() => chrome.tabs.create({ url: 'https://t.me/xhhdhe' })}
          className={styles.button}
        >
          <Telegram className={styles.telegram} />
        </Button>
      </Flex>
    </Flex>
  );
}

export default App;
