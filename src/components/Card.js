import { Link } from "react-router-dom";

function Card({ title, text, btnType = "primary", url }) {
    return (
        <article className="col-md-4">
            <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text flex-grow-1">{text}</p>

                    <Link to={url} className={`btn btn-${btnType}`}>
                        Ver más
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default Card;
