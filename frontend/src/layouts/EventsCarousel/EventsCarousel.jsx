import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label="Previous"
        className="flex-center absolute left-[-1.15rem] top-[45%] transform -translate-y-1/2 bg-dimWhite bg-opacity-80 shadow-md rounded-full p-2 transition-colors duration-300 hover:bg-opacity-100 z-10"
    >
        <KeyboardArrowLeft />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label="Next"
        className="flex-center absolute right-[-1.15rem] top-[45%] transform -translate-y-1/2 bg-dimWhite bg-opacity-80 shadow-md rounded-full p-2 transition-colors duration-300 hover:bg-opacity-100 z-10"
    >
        <KeyboardArrowRight />
    </button>
);

const EventsCarousel = ({ events }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1280, // For screens smaller than 1280px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024, // For screens smaller than 1024px
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // For screens smaller than 768px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640, // For screens smaller than 640px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // For screens smaller than 480px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <Slider {...settings}>
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="w-full flex-center flex-col bg-white rounded-lg text-black px-4"
                    >
                        <img
                            className="object-contain w-full rounded-lg"
                            src={`/${event.image_name}`}
                            alt={`${event.image_name}`}
                        />
                        <div className="flex-center mt-2">
                            <p className="font-normal text-base text-darkGray">{event.name}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default EventsCarousel;
