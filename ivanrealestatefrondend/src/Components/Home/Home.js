import { useEffect, useState } from 'react';

import * as estatesSevice from '../../Services/EstateService';

import Estate from '../Estate/Estate';
import './Home.css';

const Home = () => {
    const [estates, setEstate] = useState([]);

    useEffect(() => {
        estatesSevice.getAll()
            .then(result => {
                setEstate(result);
            });
    }, []);

    return (
        <div className="home-card-list">
            {estates.map(x => <Estate estate={x} />)}
        </div>
    )
}

export default Home;