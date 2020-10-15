import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}><b>{props.children}</b></button>
);

export default button;