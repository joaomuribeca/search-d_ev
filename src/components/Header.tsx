import { useContext, useState } from 'react';

import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../services/userService';

import { SearchInput } from './SearchInput';

import styles from './Header.module.css';

export function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  async function fetchData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      search: {value: string}
    }

    try {
      const result = await getUser(`${formElements.search.value}`);
      setUser(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;

    setInputValue(newValue);
  }

  return (
    <header className={styles.header}>
        <a href='/' className={styles.title}>Search <span className={styles.titlePurple}>d<span className={styles.underlineStyle}>_</span>evs</span></a>
        <form onSubmit={fetchData} className={styles.inputWrapper}>
          <SearchInput name='search' value={inputValue} onChange={handleChange} required={true} />
        </form>
    </header>
  )
}
