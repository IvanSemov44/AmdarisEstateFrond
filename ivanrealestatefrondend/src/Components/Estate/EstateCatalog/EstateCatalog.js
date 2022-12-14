import { useEffect, useState } from 'react';

import * as estatesSevice from '../../../Services/EstateService';

import EstateCard from '../EstateCard/EstateCard';
// import './Home.css';

const EstateCatalog = () => {
    const [estates, setEstate] = useState([]);

    // const estateId = "387f6683-f763-4e0d-b35c-08dad2038670";

    useEffect(() => {
        let ignore = false;
        estatesSevice.getAll()
            .then(result => {
                if(!ignore){
                    console.log(result);
                    setEstate(result);
                }
            });
            return () =>{
                ignore = true;
            }
    }, []);

    return (
        <div className="home-card-list">
            {/* <EstateCard estate={estates} /> */}
            {estates.map(x => <EstateCard key={x.estateId} estate={x} />)}
        </div>
    )
}

export default EstateCatalog;