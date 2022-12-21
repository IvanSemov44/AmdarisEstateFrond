import { useEffect, useState } from 'react';

import * as estatesSevice from '../../Services/EstateService';

import EstateCard from '../EstateCard/EstateCard';
import './Home.css';

const Home = () => {
    const [estates, setEstate] = useState([]);

    const estateId = "387f6683-f763-4e0d-b35c-08dad2038670";

    useEffect(() => {
        estatesSevice.getById(estateId)
            .then(result => {
                console.log(result);
                setEstate(result);
            });
    }, []);

    return (
        <div className="home-card-list">
            <EstateCard estate={estates} />
            {/* {estates.map(x => <Estate key={x.estateId} estate={x} />)} */}
        </div>
    )
}

export default Home;