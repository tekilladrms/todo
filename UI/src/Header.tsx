import React from 'react';
import s from './Header.module.css';


const Header = ( props: any ) => {
    return(
        <div className={s.header}>
            <h1>Todo-шечка</h1>
            <div className={s.userPanel}>
                <p>Username</p>
                <button>Sign out</button>
            </div>
        </div>
    )
}


export default Header;