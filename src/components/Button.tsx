import styles from './Button.module.css';

type ButtonProps = {
    text: string,
}

export function Button(props: ButtonProps) {
    return (
        <button className={styles.button} type='submit'>{props.text}</button>
    )
}
