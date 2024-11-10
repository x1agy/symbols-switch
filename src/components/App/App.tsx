import Flex from 'antd/es/flex';
import Typography from 'antd/es/typography';
import Button from 'antd/es/button';
import Github from '@/shared/UI/Icons/GithubIcon.svg?react';
import Telegram from '@/shared/UI/Icons/TelegramIcon.svg?react';

import styles from './App.module.css';

function App() {
  return (
    <Flex vertical justify='center' className={styles.holder}>
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
