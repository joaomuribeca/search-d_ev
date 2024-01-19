import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { Repository } from "../components/Repository";
import Sidebar from "../components/Sidebar";

import styles from './Profile.module.css';
import { UserContext, UserReposType } from "../contexts/UserContext";
import { getUserRepos } from "../services/userService";
import { Bounce, toast } from "react-toastify";

export function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [repos, setRepos] = useState<Array<UserReposType>>([]);
  const [refresh, setRefresh] = useState(false);

  // Busca os repositórios do User presente no contexto
  async function fetchReposData() {
    try {
      setRepos([]);
      const result: Array<UserReposType> = await getUserRepos(`${user.login}`);

      let array = result;
      array.sort(({stargazers_count: a}, {stargazers_count: b}) => b-a);

      setRepos(result);
      setRefresh(!refresh);
    } catch (error: any) {
      toast.error('Ocorreu algum problema ao buscar os repositórios do usuário', {
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

  // Checa se existe algum User no Contexto, se não tiver volta para a home
  function checkUser() {
    Object.keys(user).length === 0 ? navigate("/") : {};
  }

  useEffect(() => {
    checkUser();
    fetchReposData();
  }, [user]);

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar user={user} />
        <main className={styles.reposWrapper}>
          {repos.length !== 0 ? repos.map((repo, index) => (
            <Repository 
              repo={repo}
              key={index}
            />
          )) : null}
        </main>
      </div>
    </div>
  )
}
