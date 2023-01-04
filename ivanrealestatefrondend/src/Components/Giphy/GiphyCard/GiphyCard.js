import "../GiphyCard/GiphyCard.css"; 

const GiphyCard = ({gif})=>{

    let img = <img className='giphy-card-img' src={gif.images.downsized.url} alt='img' />
    

    return(
        <div className='giphy-card'>
            {img}
        </div>
    );
}

export default GiphyCard;