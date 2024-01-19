import { useEffect, useState } from 'react';

import { UserReposType } from '../contexts/UserContext';
import { calcDiffDays } from '../utils/dateDiff';

import starIcon from '../assets/starIcon.svg';

import styles from './Repository.module.css';

type RepositoryProps = {
    repo: UserReposType;
}

export function Repository(props: RepositoryProps) {
  const [repo, setRepo] = useState<UserReposType>();
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setRepo(props.repo);
    setLastUpdated(calcDiffDays(props.repo.updated_at));
  }, [props.repo]);

  return (
    <div className={styles.wrapper}>
      <header>
        <a href={repo ? repo.html_url : ''} target='_blank'><strong>{repo ? repo.name : ''}</strong></a>
      </header>
      
      <p>{repo ? repo.description : ''}</p>

      <footer>
        <img src={starIcon} alt='Star icon' />
        <span>{repo ? repo.stargazers_count : ''}</span>
        <span>•</span>
        <span>{lastUpdated}</span>
      </footer>
    </div>
  )
}
