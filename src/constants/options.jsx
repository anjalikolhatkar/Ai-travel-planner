import { FaUser, FaUsers, FaUserFriends, FaDollarSign, FaMoneyBillWave, } from 'react-icons/fa';

export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveller',
        icon: <FaUser style={{ color: '#BE2591' }} />,
        people: '1 person'
    },
    {
        id: 2,
        title: 'Family Trip',
        desc: 'Travelling with family',
        icon: <FaUsers style={{ color: 'green' }} />,
        people: '2-4 people'
    },
    {
        id: 3,
        title: 'Friends Trip',
        desc: 'Travelling with friends',
        icon: <FaUserFriends style={{ color: 'purple' }} />,
        people: '3-6 people'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: <FaDollarSign style={{ color: 'red' }} />
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balance between cost and comfort',
        icon: <FaMoneyBillWave style={{ color: 'orange' }} />
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'No expenses spared',
        icon: <FaDollarSign style={{ color: 'blue' }} />
    }
];

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {travellers} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'
