import React from 'react';
import styles from './styles.module.scss'
import cn from 'classnames'

const Container = ({children, className, ...props}) => {
    return (
        <div className={cn(styles.root, className)} {...props}>
            {children}
        </div>
    );
};

export default Container;