import searchIcon from '../assets/searchIcon.svg';

import styles from './SearchInput.module.css';

type SearchInputProps = {
    name: string,
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
}
 
export function SearchInput(props: SearchInputProps) {
    return (
        <div className={styles.inputWrapper} >
            <img src={searchIcon} alt='Search icon'/>
            <input 
                className={styles.searchInput} 
                type='text' 
                placeholder='Search' 
                name={props.name} 
                value={props.value}
                onChange={props.onChange}
                required={props.required}
            />
        </div>
    )
}