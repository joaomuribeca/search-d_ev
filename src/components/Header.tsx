import { useContext, useState } from 'react';

import { UserContext } from '../contexts/UserContext';

import { getUser } from '../services/userService';

import { SearchInput } from './SearchInput';

import styles from './Header.module.css';
import { Bounce, toast } from 'react-toastify';

export function Header() {
  const { setUser } = useContext(UserContext);

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
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error('Usuário não encontrado', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error('Ocorreu algum problema, tente novamente', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
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
