import React from 'react'
import "../components_css/carousel.css"

const Carousel = () => {
    return (
        <div className='carousel-body'>
            <div id="carousel" className="carousel slide" data-bs-ride="carousel" style={{ width: "100%", height: "100%" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={require('./c-img-1.png')}  className="d-block w" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={require('./c-img-2.png')} className="d-block w" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={require('./c-img-3.png')} className="d-block w" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={require('./c-img-4.png')}  className="d-block w" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
