import { useEffect, useState } from 'react';

import GiphyCard from '../GiphyCard/GiphyCard';
import * as giphyService from '../../../Services/GiphyService';

// import EstateCard from '../EstateCard/EstateCard';
// import './Home.css';

const GiphyCatalog = () => {
    const [gif, setGif] = useState([]);

    // const estateId = "387f6683-f763-4e0d-b35c-08dad2038670";

    // useEffect(() => {
    //     let ignore = false;
    //     giphyService.getAll()
    //         .then(result => {
    //             if (!ignore) {
    //                 console.log(result.data);
    //                 setGif(result.data);
    //             }
    //         });
    //     return () => {
    //         ignore = true;
    //     }
    // }, []);

    useEffect(() => {
        let ignore = false;
        giphyService.getAll()
            .then(result => {
                if (!ignore) {
                    console.log(result.data);
                    setGif(result.data);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);


    return (
        <div>
            {gif.map(x => <GiphyCard key={x.Id} gif={x} />)}

            {/* <GiphyCard id={}/> */}
        </div>
    )
}

export default GiphyCatalog;