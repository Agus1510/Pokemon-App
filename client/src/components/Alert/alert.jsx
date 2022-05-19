import React from 'react';
import style from './alert.module.css';

function Alert(props){
    return (props.trigger) ? (
    <div className={style.alert}>
        <div className={style.alertInner}>
        <button className={style.closeBtn} onClick={() => window.location = "http://localhost:3000/home"}>Close</button>
        {props.children}
        </div>
    </div>
    ) :  "";
}

export default Alert