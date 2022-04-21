import { Button } from "@chakra-ui/react";

const Rating = ({ rating }) => {
    let stars = [];
    for (let i = 1; i < 11; i++) {
        let klass = "fa fa-star";
        if (rating >= i && rating !== null) {
            klass = "fa fa-star checked";
        }
        stars.push(
            <i
                style={{ direction: (i % 2 === 0) ? "rtl" : "ltr" }}
                className={klass}
            />
        );
    }
    return (
        <div className="movie__rating">
            {stars}
        </div>
    );
}



const MovieInfo = ({ name, value }) => (
    <div className={`movie__${name}`}>
        <span className='info__head'>
            {name.replace(/\b\w/g, l => l.toUpperCase())}
        </span>
        {value}
    </div>
)

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

export default function Movie({ infos,datiBack }){
    const data = infos;
    return (
        <div className='movie' style={{ backgroundImage: `url(${getImage(infos.poster_path)})` }}>
            <h3 font-weight="bold" className='movie__title'>{infos.title}</h3>
            <span className='movie__description'>{infos.overview}</span>

            <div className='movie__infos'>
                <MovieInfo name='year' value={infos.release_date} />
                <button onClick={() => datiBack(data)} className="movie__imdb-button">Prenota</button>
            </div>
        </div>
    )
}