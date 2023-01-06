import React from 'react';

import '../Spinner/Spinner.css';

export const Spinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <span className="loading-spinner-text">Loading</span>
            </div>
        </div>
    );
}