import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../services/userService';
import { UserContext } from '../contexts/UserContext';

import { SearchInput } from '../components/SearchInput';
import { Button } from '../components/Button';

import styles from './Home.module.css';
 
 export function Home() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');

    async function fetchUserData(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const form = event.currentTarget
      const formElements = form.elements as typeof form.elements & {
        search: {value: string}
      }

      try {
        const result = await getUser(`${formElements.search.value}`);
        setUser(result);
        navigate("/perfil");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const newValue = event.currentTarget.value;

      setInputValue(newValue);
    }

  return (
    <div className={styles.wrapper}>
        <div className={styles.title}>Search <span className={styles.titlePurple}>d<span className={styles.underlineStyle}>_</span>evs</span></div>
        <form onSubmit={fetchUserData} className={styles.searchWrapper}>
            <SearchInput name='search' value={inputValue} onChange={handleChange} required={true} />
            <Button text='Search'/>
        </form>
    </div>
  )
}