import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { Repository } from "../components/Repository";
import Sidebar from "../components/Sidebar";

import styles from './Profile.module.css';
import { UserContext, UserReposType } from "../contexts/UserContext";
import { getUserRepos } from "../services/userService";

export function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [repos, setRepos] = useState<Array<UserReposType>>([]);
  const [refresh, setRefresh] = useState(false);

  async function fetchReposData() {
    try {
      setRepos([]);
      const result: Array<UserReposType> = await getUserRepos(`${user.login}`);

      let array = result;
      array.sort(({stargazers_count: a}, {stargazers_count: b}) => b-a);

      setRepos(result);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

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
