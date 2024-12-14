import React, { useEffect, useRef } from "react";
import { AnimatedDiv, AnimatedH1, AnimatedP } from "./AnimatedComponent";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import TvIcon from "@mui/icons-material/Tv";
import CasinoIcon from "@mui/icons-material/Casino";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import TungstenIcon from "@mui/icons-material/Tungsten";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import WifiIcon from "@mui/icons-material/Wifi";

const iconStyle = { fontSize: "2.5rem" };

const hostelData = {
    title: "PG Hostel For Men and Women",
    description:
        "The PG Hostel for men was established in 2002 at the Taramani campus with a minimum strength of 75 students. Now, it accommodates 587 postgraduate students and Ph.D. scholars from various disciplines like Arts, Science, Linguistics, and Humanities. The women's hostel was established in 2007 and expanded in 2016 and 2019 to accommodate 400 students.",
    sections: [
        {
            title: "Men's Hostel",
            established: "2002",
            capacity: 587,
            buildings: ["PG Block", "Research Scholar Block"],
            facilities: [
                { name: "Library", icon: <LocalLibraryIcon sx={iconStyle} /> },
                { name: "Gym", icon: <FitnessCenterIcon sx={iconStyle} /> },
                { name: "Smart Laundry Room", icon: <LocalLaundryServiceIcon sx={iconStyle} /> },
                { name: "Playgrounds", icon: <SportsCricketIcon sx={iconStyle} /> },
                { name: "TV Hall", icon: <TvIcon sx={iconStyle} /> },
                { name: "Indoor Games Room", icon: <CasinoIcon sx={iconStyle} /> },
                { name: "Parking", icon: <TwoWheelerIcon sx={iconStyle} /> },
                { name: "24x7 Electricity", icon: <TungstenIcon sx={iconStyle} /> },
                { name: "RO Drinking Water", icon: <LocalDrinkIcon sx={iconStyle} /> },
                { name: "Wi-Fi", icon: <WifiIcon sx={iconStyle} /> },
            ],
        },
        {
            title: "Women's Hostel",
            established: "2007",
            capacity: 400,
            buildings: ["T1 Block", "T2 Block (added in 2016)", "T3 Block (added in 2019)"],
            facilities: [
                "Library (includes a Digital Library and a Visually Impaired Library with Braille Books)",
                "Gym",
                "Smart Laundry Room (with Washing Machine)",
                "Playgrounds (Cricket, Shuttle, Football, Volleyball, Kabaddi)",
                "TV Hall",
                "Indoor Games Room (Chess, Carom Board)",
                "Parking",
                "24x7 Electricity",
                "RO Drinking Water",
                "Wi-Fi",
            ],
        },
        {
            title: "Hostel Events",
            events: [
                "Monthly Special Dinner with DJ and Cultural Events",
                "Fresher’s Day",
                "Farewell Day",
                "Hostel Day (Dream Land)",
                "Pongal Celebration",
            ],
        },
        {
            title: "Hostel Management",
            description:
                "The hostel is managed by wardens, deputy wardens, managers, and the student council. The administration oversees the hostel, kitchen, and mess operations. There are 25 workers managing the hostel.",
            committees: [
                { name: "Student Council", role: "Manages hostel administration" },
                { name: "Library Committee", role: "Handles library management" },
                {
                    name: "Literary Committee",
                    role: "Organizes study circles and literary competitions",
                },
                { name: "Tech Committee", role: "Oversees technical works in the hostel" },
            ],
        },
        {
            title: "Hostel Mess",
            description:
                "The hostel mess is managed by student secretaries and managers under the supervision of wardens. The mess offers a variety of meals and is operated efficiently with regular feedback from students.",
        },
        {
            title: "Hostel Day (Dream Land)",
            description:
                "The hostel day celebrations are combined for both the men's and women's hostels. The first Hostel Day was celebrated in 2004. It is an annual event where students enjoy cultural activities and special dinners.",
            events: [
                "Old age home visitors and children’s home students visit the hostel",
                "Donations are made to orphanages and homes",
                "Cultural events and performances by visitors",
                "Chief guest speeches",
                "Prize distribution for sports and literary competitions",
            ],
        },
    ],
    contact: {
        phone_numbers: ["9655407709", "9345212678", "8667503794"],
        email: "Dreamlandunom@gmail.com",
    },
};

const Home = () => {
    const sectionRefs = useRef([]);

    useEffect(() => {
        const options = {
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("loaded");
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        // <div className="scroll-snap-y">
        //   <div className="container mx-auto p-4">
        //     <h1 className="text-4xl font-bold mb-4 text-center">{hostelData.title}</h1>
        //     <motion.div
        //       id="first-section"
        //       ref={(el) => (sectionRefs.current[0] = el)}
        //       className="snap-center h-auto flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white fade-in"
        //     >
        //       <p className="text-lg mb-6">{hostelData.description}</p>
        //     </motion.div>

        //     {hostelData.sections.map((section, index) => (
        //       <motion.div
        //         key={index}
        //         ref={(el) => (sectionRefs.current[index + 1] = el)}
        //         className="snap-center h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white fade-in"
        //       >
        //         <div className="text-center">
        //           <h2 className="text-3xl font-semibold mb-2">{section.title}</h2>
        //           {section.description && <p>{section.description}</p>}
        //           {section.established && <p>Established: {section.established}</p>}
        //           {section.capacity && <p>Capacity: {section.capacity}</p>}
        //           {section.buildings && section.buildings.length > 0 && (
        //             <>
        //               <h3 className="text-xl font-semibold mt-4">Buildings:</h3>
        //               <ul className="list-disc list-inside">
        //                 {section.buildings.map((building, idx) => (
        //                   <li key={idx}>{building}</li>
        //                 ))}
        //               </ul>
        //             </>
        //           )}
        //           {section.facilities && section.facilities.length > 0 && (
        //             <>
        //               <h3 className="text-xl font-semibold mt-4">Facilities:</h3>
        //               <ul className="list-disc list-inside">
        //                 {section.facilities.map((facility, idx) => (
        //                   <li key={idx}>{facility}</li>
        //                 ))}
        //               </ul>
        //             </>
        //           )}
        //           {section.events && section.events.length > 0 && (
        //             <>
        //               <h3 className="text-xl font-semibold mt-4">Events:</h3>
        //               <ul className="list-disc list-inside">
        //                 {section.events.map((event, idx) => (
        //                   <li key={idx}>{event}</li>
        //                 ))}
        //               </ul>
        //             </>
        //           )}
        //           {section.committees && section.committees.length > 0 && (
        //             <>
        //               <h3 className="text-xl font-semibold mt-4">Committees:</h3>
        //               <ul className="list-disc list-inside">
        //                 {section.committees.map((committee, idx) => (
        //                   <li key={idx}>
        //                     <strong>{committee.name}</strong>: {committee.role}
        //                   </li>
        //                 ))}
        //               </ul>
        //             </>
        //           )}
        //         </div>
        //       </motion.div>
        //     ))}

        //     <footer className="mt-12">
        //       <p className="text-center text-gray-500">Contact us:</p>
        //       <p className="text-center">
        //         Phone Numbers: {hostelData.contact.phone_numbers.join(', ')} | Email: {hostelData.contact.email}
        //       </p>
        //     </footer>
        //   </div>
        // </div>

        <>
            <div className="w-full h-full flex-center flex-col">
                <div className="w-full flex-center flex-col max-w-[1250px] px-8 md:px-4">
                    <div className="flex-center flex-col min-h-[90vh] md:min-h-[80vh] text-center gap-y-6">
                        <div className="flex flex-col md:gap-y-4">
                            <AnimatedH1
                                delay={0.3}
                                className="text-darkGray font-black text-4xl md:text-6xl"
                            >
                                Your Journey Starts Here at
                            </AnimatedH1>
                            <AnimatedH1
                                delay={0.6}
                                className="text-primary font-black text-4xl md:text-6xl"
                            >
                                Dream Land
                            </AnimatedH1>
                        </div>
                        <AnimatedP
                            delay={0.9}
                            className="text-black font-extralight text-sm md:text-xl"
                        >
                            Welcome to Taramani PG for Men and Women
                        </AnimatedP>
                    </div>
                    <div className="w-full h-full min-h-[90vh] md:min-h-[60vh] flex flex-col lg:flex-row gap-x-8 gap-y-4 md:mt-28">
                        <AnimatedDiv
                            delay={0.6}
                            className="w-full h-full flex justify-center lg:justify-start lg:flex-1"
                        >
                            <img
                                className="rounded-lg object-contain w-[500px] md:w-[600px]"
                                src="/unom.jpg"
                                alt="unom image"
                            />
                        </AnimatedDiv>
                        <div className="flex items-center lg:items-end flex-col gap-y-4 flex-1">
                            <AnimatedH1
                                delay={0.3}
                                className="font-black text-darkGray text-3xl md:text-4xl lg:text-5xl text-center lg:text-end"
                            >
                                Know about the
                                <br />
                                Dream Land
                            </AnimatedH1>
                            <AnimatedP
                                delay={0.9}
                                className="font-light text-justify md:text-base lg:text-xl lg:font-extralight max-w-[600px]"
                            >
                                {hostelData.description}
                            </AnimatedP>
                        </div>
                    </div>
                    <div className="w-full min-h-screen flex flex-col sm:flex-row gap-y-8 sm:gap-y-0">
                        {hostelData.sections.slice(0, 2).map((section, key) => (
                            <div
                                key={key}
                                className={`w-full h-full flex flex-col gap-y-4 md:mt-28`}
                            >
                                <AnimatedH1
                                    delay={0.3}
                                    className={`font-black text-darkGray text-3xl md:text-4xl lg:text-5xl text-center`}
                                >
                                    {section.title}
                                </AnimatedH1>
                                <div className="w-full h-full flex-center flex-col gap-y-4">
                                    {/* <img
                                      className="rounded-lg object-contain w-[500px] md:w-[600px]"
                                      src="/unom.jpg"
                                      alt="unom image"
                                  /> */}
                                    <div className="flex-center gap-x-12 md:gap-x-16 w-full h-full">
                                        <AnimatedDiv
                                            delay={0.6}
                                            className="flex items-center p-4 flex-col bg-gradient-to-br from-tertiary 0% to-primary 100% rounded-lg w-[120px] h-[120px] md:w-[150px] md:h-[150px] shadow-lg"
                                        >
                                            <h3 className="text-dimWhite font-bold text-lg">
                                                Established
                                            </h3>
                                            <p className="translate-y-2/4 font-black text-dimWhite text-3xl">
                                                {section.established}
                                            </p>
                                        </AnimatedDiv>
                                        <AnimatedDiv
                                            delay={0.9}
                                            className="flex items-center p-4 flex-col bg-gradient-to-br from-tertiary 0% to-primary 100% rounded-lg w-[120px] h-[120px] md:w-[150px] md:h-[150px] shadow-lg"
                                        >
                                            <h3 className="text-dimWhite font-bold text-lg">
                                                Capacity
                                            </h3>
                                            <p className="translate-y-2/4 font-black text-dimWhite text-3xl">
                                                {section.capacity}
                                            </p>
                                        </AnimatedDiv>
                                    </div>
                                    <AnimatedDiv
                                        delay={1.2}
                                        className="flex items-center p-4 bg-gradient-to-br from-tertiary 0% to-primary 100% rounded-lg w-full h-[120px] md:h-[150px] shadow-lg gap-x-4"
                                    >
                                        <h3 className="flex-center text-darkGray font-bold text-lg bg-dimWhite h-full w-[120px] md:w-[120px] rounded-lg p-4">
                                            Buildings
                                        </h3>
                                        <div className="w-full h-full flex flex-col justify-between gap-y-2">
                                            {section.buildings.map((building, key) => (
                                                <p className="text-darkGray font-semibold text-md bg-dimWhite w-full h-full flex-center rounded-md">
                                                    {building}
                                                </p>
                                            ))}
                                        </div>
                                    </AnimatedDiv>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full min-h-screen flex-center flex-col gap-y-8">
                        <AnimatedH1
                            delay={0.2}
                            className={`font-black text-darkGray text-3xl md:text-4xl lg:text-5xl text-center`}
                        >
                            Facilities
                        </AnimatedH1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-x-20 lg:gap-y-8">
                            {hostelData.sections[0].facilities.map((facility, key) => (
                                <div
                                    key={key}
                                    className="bg-lightGray4 rounded-xl w-[140px] h-[140px] md:w-[170px] md:h-[170px] flex-center flex-col p-2 md:p-4 gap-y-4 shadow-lg"
                                >
                                    {facility.icon}
                                    <p className="font-light text-sm text-center">
                                        {facility.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
