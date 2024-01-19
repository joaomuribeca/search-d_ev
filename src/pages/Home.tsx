import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

import { getUser } from '../services/userService';
import { UserContext } from '../contexts/UserContext';

import { SearchInput } from '../components/SearchInput';
import { Button } from '../components/Button';

import styles from './Home.module.css';
 
export function Home() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  // Busca pelo User usando o valor do input
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
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error('Usuário não encontrado', {
          position: "top-center",
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
          position: "top-center",
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

  // Lida com as mudanças no input
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
