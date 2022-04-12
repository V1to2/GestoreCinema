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


const Movie = ({ infos }) => {
    const cast = infos.cast.map(actor => (
        <p key={actor}>{actor}</p>
    ))
    return (
        <div className='movie' style={{ backgroundImage: `url(${infos.poster})` }}>

            <h2 className='movie__title'>{infos.title}</h2>

            <span className='movie__description'>{infos.description}</span>

            <div className='movie__infos'>
                <MovieInfo name='duration' value={infos.duration} />
                <MovieInfo name='director' value={infos.director} />
                <MovieInfo name='year' value={infos.year} />
                <MovieInfo name='cast' value={cast} />
            </div>

            <div className='movie__imdb'>
                <Rating rating={Math.round(infos.rating)} />
                <a href={infos.imdbLink} className='movie__imdb-button' target='blank'> IMDb </a>
            </div>

        </div>
    )
}
export default Movie;