/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
  export  const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Bhopal, for 3 Days for group of friends with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Hotel Ashoka\",\n      \"hotelAddress\": \"10, New Market, Near M.P. Nagar, Bhopal, Madhya Pradesh 462011\",\n      \"price\": \"₹1000 - ₹2000\",\n      \"hotelImageUrl\": \"https://www.oyorooms.com/hotels/hotel-ashoka-bhopal-44570/\",\n      \"geoCoordinates\": \"23.2599° N, 77.4126° E\",\n      \"rating\": 3.5,\n      \"description\": \"A budget-friendly hotel with clean rooms and basic amenities.\"\n    },\n    {\n      \"hotelName\": \"Hotel Rajhans\",\n      \"hotelAddress\": \"11, Kolar Road, Near Habibganj Railway Station, Bhopal, Madhya Pradesh 462016\",\n      \"price\": \"₹1500 - ₹3000\",\n      \"hotelImageUrl\": \"https://www.tripadvisor.com/Hotel_Review-g304551-d11634259-Reviews-Hotel_Rajhans-Bhopal_Madhya_Pradesh.html\",\n      \"geoCoordinates\": \"23.2494° N, 77.4084° E\",\n      \"rating\": 4.0,\n      \"description\": \"A comfortable hotel with a restaurant and good location.\"\n    },\n    {\n      \"hotelName\": \"Hotel The Residency\",\n      \"hotelAddress\": \"1, Hoshangabad Road, Near Van Vihar National Park, Bhopal, Madhya Pradesh 462003\",\n      \"price\": \"₹2000 - ₹4000\",\n      \"hotelImageUrl\": \"https://www.booking.com/hotel/in/the-residency-bhopal.en-gb.html\",\n      \"geoCoordinates\": \"23.2468° N, 77.4091° E\",\n      \"rating\": 4.5,\n      \"description\": \"A good option for a comfortable stay with swimming pool and other facilities.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Bharat Bhavan\",\n          \"placeDetails\": \"A cultural center showcasing Indian art, crafts, and performances.\",\n          \"placeImageUrl\": \"https://www.bharatbhavan.org/\",\n          \"geoCoordinates\": \"23.2583° N, 77.4150° E\",\n          \"ticketPricing\": \"₹20 per person\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"1 hour\",\n          \"bestTime\": \"Morning (9:00 AM - 12:00 PM)\"\n        },\n        {\n          \"placeName\": \"Upper Lake\",\n          \"placeDetails\": \"A scenic lake offering boating and views of the city.\",\n          \"placeImageUrl\": \"https://www.holidify.com/pages/upper-lake-bhopal-sightseeing-410.html\",\n          \"geoCoordinates\": \"23.2647° N, 77.4147° E\",\n          \"ticketPricing\": \"₹10 - ₹20 per person\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"1.5 hours\",\n          \"bestTime\": \"Evening (4:00 PM - 7:00 PM)\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Van Vihar National Park\",\n          \"placeDetails\": \"A zoo and a wildlife sanctuary home to various animals.\",\n          \"placeImageUrl\": \"https://www.vanvihar.org/\",\n          \"geoCoordinates\": \"23.2496° N, 77.4128° E\",\n          \"ticketPricing\": \"₹20 per person\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"2 hours\",\n          \"bestTime\": \"Morning (9:00 AM - 12:00 PM)\"\n        },\n        {\n          \"placeName\": \"Birla Mandir\",\n          \"placeDetails\": \"A beautiful white marble temple dedicated to Lord Vishnu.\",\n          \"placeImageUrl\": \"https://www.tripadvisor.com/Attraction_Review-g304551-d1129682-Reviews-Birla_Mandir-Bhopal_Madhya_Pradesh.html\",\n          \"geoCoordinates\": \"23.2576° N, 77.4101° E\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"1 hour\",\n          \"bestTime\": \"Evening (5:00 PM - 7:00 PM)\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"State Museum of Madhya Pradesh\",\n          \"placeDetails\": \"A museum showcasing the history and culture of Madhya Pradesh.\",\n          \"placeImageUrl\": \"https://www.mptourism.com/places-to-visit/bhopal/state-museum-of-madhya-pradesh.html\",\n          \"geoCoordinates\": \"23.2586° N, 77.4138° E\",\n          \"ticketPricing\": \"₹10 per person\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"2 hours\",\n          \"bestTime\": \"Morning (10:00 AM - 1:00 PM)\"\n        },\n        {\n          \"placeName\": \"Rani Kamalapati Railway Station\",\n          \"placeDetails\": \"A beautiful and modern railway station with stunning architecture.\",\n          \"placeImageUrl\": \"https://www.indianrailways.gov.in/railway-station/71/\",\n          \"geoCoordinates\": \"23.2489° N, 77.4071° E\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"1 hour\",\n          \"bestTime\": \"Afternoon (2:00 PM - 4:00 PM)\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation:**\n\n* **hotelOptions:** This section provides details of three budget-friendly hotels in Bhopal. Each entry includes the hotel's name, address, price range, image URL, geographic coordinates, rating, and a brief description. \n* **itinerary:** This section outlines a 3-day itinerary for exploring Bhopal. Each day's plan includes:\n    * **placeName:** The name of the attraction.\n    * **placeDetails:** A brief description of the attraction.\n    * **placeImageUrl:** A URL linking to an image of the attraction.\n    * **geoCoordinates:** The geographic coordinates of the attraction.\n    * **ticketPricing:** The cost of entry to the attraction.\n    * **rating:** A rating out of 5 for the attraction.\n    * **timeTravel:** Estimated time needed to visit the attraction.\n    * **bestTime:** The recommended time of day to visit the attraction.\n\nThis JSON format provides a structured and comprehensive travel plan for a group of friends visiting Bhopal on a cheap budget. You can easily access and use the information to plan your trip. \n"},
          ],
        },
      ],
    });
  