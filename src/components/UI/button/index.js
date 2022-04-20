import React from 'react';
import classes from './styles.module.scss'
import cn from "classnames";

const CustomButton = ({children, isCurrent, ...props}) => {
    return (
        <button className={cn(classes.root, {[classes.current]: isCurrent})} {...props}>
            {children}
        </button>
    );
};

export default CustomButton;