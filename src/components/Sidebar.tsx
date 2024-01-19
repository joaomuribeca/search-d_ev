import { Button } from './Button'

import groupIcon from '../assets/groupIcon.svg';
import heartIcon from '../assets/heartIcon.svg';
import buildingIcon from '../assets/buildingIcon.svg';
import locationIcon from '../assets/locationIcon.svg';
import mailIcon from '../assets/mailIcon.svg';
import linkIcon from '../assets/linkIcon.svg';
import twitterIcon from '../assets/twitterIcon.svg';

import styles from './Sidebar.module.css'
import { UserType } from '../contexts/UserContext';

type SidebarProps = {
    user:  UserType
}

export default function Sidebar(props: SidebarProps) {

  return (
    <aside>
        <div className={styles.sidebar}>
            <div className={styles.userWrapper}>
                <img className={styles.avatar} src={props.user.avatar_url} />
                <div className={styles.nameWrapper}>
                    <strong>{props.user.name}</strong>
                    <span>@{props.user.login}</span>
                </div>
            </div>
            
            <p className={styles.bio}>{props.user.bio}</p>

            <div className={styles.userInfo}>
                <img src={groupIcon} alt='Group icon'/>
                <span className={styles.infoText}>{props.user.followers} seguidores</span>
            </div>
            <div className={styles.userInfo}>
                <img src={heartIcon} alt='Heart icon'/>
                <span className={styles.infoText}>{props.user.following} seguindo</span>
            </div>

            {props.user.company !== null ? (
                <div className={styles.userInfo}>
                    <img src={buildingIcon} alt='Building icon'/>
                    <span className={styles.infoText}>{props.user.company}</span>
                </div>
            ) : null}
            
            <div className={styles.userInfo}>
                <img src={locationIcon} alt='Location icon'/>
                <span className={styles.infoText}>{props.user.location}</span>
            </div>

            {props.user.email !== null ? (
                <div className={styles.userInfo}>
                    <img src={mailIcon} alt='Mail icon'/>
                    <span className={styles.infoText}>{props.user.email}</span>
                </div>
            ) : null}

            {props.user.blog !== '' ? (
                <div className={styles.userInfo}>
                    <img src={linkIcon} alt='Link icon'/>
                    <a href={props.user.blog} target='_blank' className={styles.infoLink}>{props.user.blog}</a>
                </div>
            ) : null }

            {props.user.twitter_username !== null ? (
                <div className={styles.userInfo}>
                    <img src={twitterIcon} alt='Twitter icon'/>
                    <a href={`https://twitter.com/${props.user.twitter_username}`} target='_blank' className={styles.infoLink}>@{props.user.twitter_username}</a>
                </div>
            ) : null}
        </div>

        <footer>
            <Button text='Contato' />
        </footer>
    </aside>
  )
}
