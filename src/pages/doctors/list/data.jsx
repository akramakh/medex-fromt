import React from 'react'

import DocAvatar_01 from '../../../assets/img/doctors/doctor-01.jpg';
import DocAvatar_02 from '../../../assets/img/doctors/doctor-02.jpg';
import DocAvatar_03 from '../../../assets/img/doctors/doctor-03.jpg';
import DocAvatar_04 from '../../../assets/img/doctors/doctor-04.jpg';
import DocAvatar_05 from '../../../assets/img/doctors/doctor-05.jpg';
import DocAvatar_06 from '../../../assets/img/doctors/doctor-06.jpg';
import DocAvatar_07 from '../../../assets/img/doctors/doctor-07.jpg';
import DocAvatar_08 from '../../../assets/img/doctors/doctor-08.jpg';
import { FaClock, FaMapMarkerAlt, FaMoneyBillAlt, FaInfoCircle } from 'react-icons/fa';


export const doctors = [
    {
        id: 1,
        username: "rubyperrin",
        firstname: "Ruby",
        lastname: "Perrin",
        avatar: DocAvatar_01,
        verified: true,
        specialityDescription: "MDS - Periodontology and Oral Implantology, BDS",
        rate: {
            avarage:3.5,
            numOfRaters: 17
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "Florida, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$300 - $1000",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
    {
        id: 2,
        username: "darren_elder",
        firstname: "Darren",
        lastname: "Elder",
        avatar: DocAvatar_02,
        verified: false,
        specialityDescription: "BDS, MDS - Oral & Maxillofacial Surgery",
        rate: {
            avarage:3.5,
            numOfRaters: 35
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "Newyork, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$50 - $300",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
    {
        id: 3,
        username: "deborah_angel",
        firstname: "Deborah",
        lastname: "Angel",
        avatar: DocAvatar_03,
        verified: true,
        specialityDescription: "MBBS, MD - General Medicine, DNB - Cardiology",
        rate: {
            avarage:4,
            numOfRaters: 27
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "Georgia, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$100 - $400",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
    {
        id: 4,
        username: "sofia_brient",
        firstname: "Sofia",
        lastname: "Brient",
        avatar: DocAvatar_04,
        verified: true,
        specialityDescription: "MBBS, MS - General Surgery, MCh - Urology",
        rate: {
            avarage:4,
            numOfRaters: 4
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "Louisiana, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$150 - $250",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
    {
        id: 5,
        username: "marvin_campbell",
        firstname: "Marvin",
        lastname: "Campbell",
        avatar: DocAvatar_05,
        verified: false,
        specialityDescription: "MBBS, MD - Ophthalmology, DNB - Ophthalmology",
        rate: {
            avarage:4,
            numOfRaters: 66
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "Michigan, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$50 - $700",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
    {
        id: 6,
        username: "katharine_berthold",
        firstname: "Katharine",
        lastname: "Berthold",
        avatar: DocAvatar_06,
        verified: true,
        specialityDescription: "MS - Orthopaedics, MBBS, M.Ch - Orthopaedics",
        rate: {
            avarage:4,
            numOfRaters: 52
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "Texas, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$100 - $500",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
    {
        id: 7,
        username: "linda_tobin",
        firstname: "Linda",
        lastname: "Tobin",
        avatar: DocAvatar_07,
        specialityDescription: "MBBS, MD - General Medicine, DM - Neurology",
        rate: {
            avarage:3.5,
            numOfRaters: 43
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "Kansas, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$100 - $1000",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
    {
        id: 8,
        username: "paul_richard",
        firstname: "Paul",
        lastname: "Richard",
        avatar: DocAvatar_08,
        verified: true,
        specialityDescription: "MBBS, MD - Dermatology , Venereology & Lepros",
        rate: {
            avarage:3.5,
            numOfRaters: 49
        },
        info: [
            {   
                codename: "location",
                icon: <FaMapMarkerAlt />,
                text: "California, USA"
            },
            {   
                codename: "available-date",
                icon: <FaClock />,
                text: "Fri, 22 Mar"
            },
            {   
                codename: "price-range",
                icon: <FaMoneyBillAlt />,
                text: "$100 - $400",
                moreInfo: {   
                    icon: <FaInfoCircle />,
                    text: "Put your text here"
                }
            },
        ]
    },
];