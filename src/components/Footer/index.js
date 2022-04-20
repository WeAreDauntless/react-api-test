import React from 'react';
import Container from "../Container";
import styles from './styles.module.scss'

const Index = () => {
    return (
        <footer className={styles.root}>
            <Container>
                <div className={styles.footerWrap}>
                    Coded with
                    <span className={styles.heart}></span>
                    for Test
                </div>
            </Container>
        </footer>
    );
};

export default Index;