import { useEffect, useState } from 'react';

import * as estatesSevice from '../../Services/EstateService';

import Estate from '../Estate/Estate';
import './Home.css';

const Home = () => {
    const [estates, setEstate] = useState([]);

    useEffect(() => {
        estatesSevice.getAll()
            .then(result => {
                console.log(result)
                setEstate(result);
            });
    }, []);

    return (
        <div className="home-card-list">
            {estates.map(x => <Estate key={x.estateId} estate={x} />)}
        </div>
    )
}

export default Home;