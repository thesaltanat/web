'use client';
import React from 'react';
import styles from './404.module.css';

const ErrorPage = ({ title = "404", subtitle = "Page Not Found", description = "The resource requested could not be found on the server.", buttLabel, buttonLink }) => {
    return (
        <div className={styles.errorPage}>
            <div className={styles.errorImage}></div>
            <div className={styles.errorContent}>
                <h1 className={styles.errorTitle} dangerouslySetInnerHTML={{ __html: title }} />
                <h2 className={styles.errorSubtitle}>{subtitle}</h2>
                <p className={styles.errorDescription}>{description}</p>
                {buttLabel && buttonLink && (
                    <a href={buttonLink} className={styles.errorBtn}>{buttLabel}</a>
                )}
            </div>
        </div>
    );
};

export default ErrorPage;
