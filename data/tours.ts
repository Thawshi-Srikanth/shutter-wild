export type Tour = {
  id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  maxPhotographers: number;
  price: string;
  duration: string;
  overview: string;
  focusSpecies: string[];
  itinerary: { day: string; title: string; description: string }[];
  included: string[];
  notIncluded: string[];
  equipment: string[];
  image: string;
  gallery?: string[];
  nonRefundableDeposit: number;
  availableSlots?: number;
};

export const tours: Tour[] = [
  {
    "id": "norway-winter-raptors-2027",
    "title": "Norway Winter Raptors Expedition",
    "slug": "norway-winter-raptors",
    "date": "15–20 February 2027",
    "location": "Norway",
    "maxPhotographers": 3,
    "price": "£1,750 per person",
    "duration": "6 Days | 5 Nights",
    "overview": "Winter strips the landscape back to its purest form. Snow absorbs sound. Light becomes softer. Movement becomes deliberate. In this quiet Scandinavian wilderness, Golden Eagles and Northern Goshawks descend through the trees with power and precision. This expedition is exclusively limited to three photographers to ensure freedom of movement inside the hide, cleaner shooting angles, reduced disturbance, and personal guidance.",
    "focusSpecies": [
      "Golden Eagle",
      "Northern Goshawk",
      "Ravens",
      "White-throated Dipper",
      "Winter woodland species"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "15 February | Arrival",
        "description": "Arrival and welcome briefing. Detailed logistics provided upon booking."
      },
      {
        "day": "Days 2-5",
        "title": "16–19 February | Hide Days",
        "description": "Four full days of hide-based raptor photography in two carefully positioned hides."
      },
      {
        "day": "Day 6",
        "title": "20 February | Departure",
        "description": "Morning woodland exploration for White-throated Dippers. Afternoon departures."
      }
    ],
    "included": [
      "Five nights accommodation",
      "All meals (Dinner Day 1 – Breakfast Day 6)",
      "Four full days hide access",
      "All local ground transport during workshop",
      "Airport transfers",
      "Photographer-led guidance",
      "Pre-departure preparation pack"
    ],
    "notIncluded": [
      "International flights",
      "Travel insurance (mandatory)",
      "Personal equipment",
      "Alcoholic beverages",
      "Personal expenses",
      "Single room supplement"
    ],
    "equipment": [
      "300–600mm telephoto lens",
      "Fast autofocus camera body",
      "Tripod or gimbal head",
      "Proper winter clothing and footwear"
    ],
    "nonRefundableDeposit": 500,
    "image": "https://3avvur93ovh41qil.public.blob.vercel-storage.com/28d2250f-b463-4ce7-9049-d4756afea6f9.webp",
    "gallery": [
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ad583db7-456b-4f27-ad60-15b17d96de96.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/fd9e05de-ec7a-4445-b67d-0119918f3ba7.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/8c1b3abb-aaef-4f76-a86f-dd15e9672a71.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/7ae832b3-b59e-452c-88e1-c0d335c7a772.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e22555c6-cbd9-4de4-a4e6-8ed42cde7050.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/2cc14c74-f34a-4a10-bb74-333c828e322f.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/d9a91436-f7ae-412f-94d1-9d882d16a5f8.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/f9801ff2-74a0-4fcd-88b3-3ee4f9d6c674.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/51253666-333e-4ef7-8b1a-0345767b40c0.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/a0b1641c-6a8a-4074-a781-16f13ebc9615.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/5859c43a-7ac1-4a38-9a90-a8fcaaf85447.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/a86341fb-6d21-4909-bdba-21c4fd934815.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e2624e32-923e-4fe3-91b8-d7c88d5e89d4.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/72d2c61e-5d4a-4f81-a7e2-556a3a1624a7.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/71205e3b-9162-4a98-af8f-57ddf543d78e.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/c29f39e2-3698-4aa7-9853-f5a4db02ff63.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/0301bf82-4926-4650-b666-a7e9bb7e0528.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/87cf9acc-f44a-4d85-aec6-70d78bc33ab0.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/fca0491b-23aa-4f9d-b8e1-7e9bc29ad161.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ba85ccd8-755e-4614-8aa8-9bd9f0c46264.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/baf63e70-38a7-45a4-a225-8f5a37f5bd33.webp"
    ]
  },
  {
    "id": "autumn-raptors-norway-2026",
    "title": "Autumn Norway",
    "slug": "autumn-raptors-norway",
    "date": "14th – 18th October 2026",
    "location": "Norway",
    "maxPhotographers": 5,
    "price": "£1,500 per person",
    "duration": "5 Days | 4 Nights",
    "overview": "Join ShutterWild Expedition Ltd for an immersive autumn wildlife photography expedition in the forests of southern Norway. This small-group experience is designed for photographers who want dramatic raptor action, rich seasonal colour, and meaningful time in the field. October transforms southern Norway into a stunning tapestry of gold, amber, and crimson.",
    "focusSpecies": [
      "Woodland raptors",
      "Jays and other passerines",
      "Ravens",
      "Woodpeckers",
      "Tits and finches"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "14th October | Arrival",
        "description": "Evening arrival at Kristiansand Airport. Transfer to accommodation, welcome dinner, and gear preparation."
      },
      {
        "day": "Day 2",
        "title": "15th October | Full Hide Day",
        "description": "Early morning transfer to woodland hide. Full-day wildlife photography session. Packed lunch provided."
      },
      {
        "day": "Day 3",
        "title": "16th October | Full Hide Day",
        "description": "Early start to maximise activity. Focus on flight technique and behavioural anticipation."
      },
      {
        "day": "Day 4",
        "title": "17th October | Full Hide Day",
        "description": "Third complete day in the hide. Continued action opportunities and final group dinner."
      },
      {
        "day": "Day 5",
        "title": "18th October | Departure",
        "description": "Morning hide session. Transfer to airport for afternoon flights."
      }
    ],
    "included": [
      "4 nights accommodation",
      "All meals",
      "Daily hide access (3 full days + 1 morning)",
      "Airport transfers",
      "Field-based photographic guidance"
    ],
    "notIncluded": [
      "International flights",
      "Travel insurance",
      "Alcoholic beverages",
      "Personal expenses"
    ],
    "equipment": [
      "300–600mm telephoto lens",
      "Fast autofocus camera body",
      "Tripod or gimbal head",
      "Spare batteries and memory cards",
      "Warm, waterproof autumn clothing"
    ],
    "nonRefundableDeposit": 400,
    "image": "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ad825d8a-35d9-4191-b97f-cab2912f7744.webp",
    "gallery": [
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/2ea0ed93-b08b-41b6-92b6-af4444cf5d09.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/be27779e-b36c-43fd-8b4b-670dc5004941.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/7038e4ae-e350-43aa-aa36-d8aeb770a871.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/9d459d6e-e511-4fa0-8d4b-bd53d3d5f9e0.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/48ff64c1-48eb-4950-9ef2-9f93c9b918ba.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/229987a2-3e4e-4acf-a031-62fdc2096a31.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/410c4460-1220-497d-a607-ad04dcd27521.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/abead15d-7dcf-435d-8256-cb3bd165d6ec.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/dbff5623-c241-42c7-b298-02ad629db486.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/fb5ba6f8-736c-400c-aadb-d014c1a8e0cd.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/cd6642ec-4d18-4190-abe0-cb38eaf81645.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/54066d14-a9c8-4998-a08a-c87de734c416.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/f3effb56-fef6-427e-94de-0fad8cb77141.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/5b3980e5-24d1-4656-b918-fb731eb90a50.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/3a1e73a0-fa70-4520-b262-1a9d5d934d62.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/88bf886a-8ade-4fea-a273-56a4cf14a60e.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/00d4ef38-2e08-4eaf-ae89-526162a3307c.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/bbc44ec3-bbd0-432d-852a-5477476d19a3.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/f5f8e8a0-62af-4203-ac2c-bde30f70d7bb.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/9ebb74dd-3284-4e47-aaa1-62cf7f02b8ad.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/4e2d5573-e0b5-45b3-9e25-8f44456997b9.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/249c981f-7227-43ad-85f4-1fd815bc365f.webp"
    ]
  },
  {
    "id": "sri-lanka-leopard-2027",
    "title": "Sri Lanka Leopard Intensive",
    "slug": "sri-lanka-leopard",
    "date": "8–17 March 2027",
    "location": "Sri Lanka",
    "maxPhotographers": 4,
    "price": "£3,200 per person",
    "duration": "10 Days | 9 Nights",
    "overview": "This immersive 9-night wildlife photography expedition has been carefully designed to maximise time in the field across Sri Lanka’s most productive leopard habitats. With only four guests and one private safari vehicle, this expedition offers flexibility, space, and strategic positioning across Wilpattu, Udawalawe, and Yala National Parks.",
    "focusSpecies": [
      "Leopards",
      "Sloth Bears",
      "Elephants",
      "Jungle Cats",
      "Diverse birdlife"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival & Transfer",
        "description": "Arrival and transfer to Wilpattu National Park."
      },
      {
        "day": "Days 2-4",
        "title": "Wilpattu National Park",
        "description": "Three full days of morning and afternoon safaris focused on Leopards, Sloth Bears, and Jungle Cats."
      },
      {
        "day": "Day 5",
        "title": "Transfer South",
        "description": "Morning safari in Wilpattu. Scenic transfer to Udawalawe region."
      },
      {
        "day": "Day 6",
        "title": "Udawalawe National Park",
        "description": "Morning safari focused on elephants and open-country species."
      },
      {
        "day": "Day 7",
        "title": "Transfer to Yala",
        "description": "Transfer to Yala National Park for an afternoon safari."
      },
      {
        "day": "Days 8-9",
        "title": "Yala National Park",
        "description": "Three full safari days dedicated to leopard photography."
      },
      {
        "day": "Days 10-11",
        "title": "Return & Departure",
        "description": "Transfer to Negombo for farewell evening. Departure on Day 11."
      }
    ],
    "included": [
      "9 nights boutique accommodation",
      "Full board in safari locations",
      "Private ground transport",
      "One private safari jeep for entire group",
      "All national park entrance fees",
      "Professional wildlife photography guidance"
    ],
    "notIncluded": [
      "International flights",
      "Travel insurance",
      "Alcoholic beverages",
      "Personal expenses",
      "Single supplement (£600)"
    ],
    "equipment": [
      "300–600mm telephoto lens",
      "Fast autofocus camera body",
      "Bean bag or monopod for vehicle",
      "Tropical weather clothing"
    ],
    "nonRefundableDeposit": 1000,
    "image": "https://3avvur93ovh41qil.public.blob.vercel-storage.com/d7521962-fa33-418b-85f8-065d423173c0.webp",
    "gallery": [
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/dc600616-435b-4112-b63c-14fb45add8cc.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/b745e84f-cd1c-494a-9d42-6888ab30134b.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/45f7928e-7388-461b-aad1-a158ec093af0.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/7f588e12-5413-4beb-bf07-94d1f2b7f979.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/23c5ab6b-e816-4610-b9c2-39145ed2181f.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/dd061561-5176-4d26-8a08-baafffc410e5.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/f5414b97-e869-4eb8-bc4a-35e46b34efba.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/9ce0ba66-a769-44a9-9b58-99e145e6f2ea.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/4ef9132e-0082-4a0f-8231-07ad07e9f9ac.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/da3435c9-2fbc-4ea5-84c2-aab2af32a9cb.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/6625859e-d0ee-40d8-a5c1-45e4d406539e.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/623fa90e-10b4-41d3-8eb4-d54c5bfa0e58.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/d1262a98-c185-4544-b12a-a080d9b7db21.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/17efe56f-8b44-4a21-bfb6-36b15f8c5d20.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/6a374d94-307b-43d6-a506-a9c7147e1f60.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/b4954194-bdb4-4c9a-abcd-8c9fd6917bc7.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/407ffd82-c16c-4b2a-afc5-08f027d86c43.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/82effd93-29df-4db1-8ca0-ed3190bd1795.webp"
    ]
  },
  {
    "id": "warmia-elite-poland",
    "title": "Warmia Elite Wildlife Photography",
    "slug": "warmia-elite",
    "date": "To Be Announced",
    "location": "Lidzbark Warmiński, Poland",
    "maxPhotographers": 3,
    "price": "£1,800 per person",
    "duration": "5 Days | 4 Full Photo Days",
    "overview": "Join ShutterWild Expedition Ltd for an exclusive wildlife photography expedition in the untouched landscapes of Warmia, Eastern Poland. This is a highly personalised, small-group experience focused on ethical encounters with raptors and woodland mammals in pristine forests and wetlands.",
    "focusSpecies": [
      "Lesser Spotted Eagle",
      "Red/Black Kite",
      "Marsh Harrier",
      "Red Fox",
      "Badger",
      "Roe/Red Deer"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival",
        "description": "Airport pickup, check-in, welcome briefing, and evening sunset photography session."
      },
      {
        "day": "Days 2-5",
        "title": "4 Full Photography Days",
        "description": "Sunrise hide session, midday rest and mentoring, evening golden light session. Optional night photography."
      },
      {
        "day": "Day 6",
        "title": "Departure",
        "description": "Breakfast and transfer to airport."
      }
    ],
    "included": [
      "4 full days of guided wildlife photography",
      "Professional photography tuition",
      "Accommodation and daily breakfast/dinner",
      "Ground transportation",
      "Airport transfers",
      "Hide access"
    ],
    "notIncluded": [
      "International flights",
      "Travel insurance",
      "Lunches and personal snacks",
      "Alcoholic beverages"
    ],
    "equipment": [
      "DSLR or mirrorless camera",
      "300–600mm telephoto lens",
      "Teleconverters",
      "Tripod or monopod",
      "Waterproof clothing and boots"
    ],
    "nonRefundableDeposit": 500,
    "image": "https://3avvur93ovh41qil.public.blob.vercel-storage.com/b6e1707b-d038-4123-a057-42d446f2100a.webp",
    "gallery": [
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ed3d5c27-8577-4ba1-9479-ffc62a31294a.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/bbf885c7-d5fc-46f2-b4b3-0f97cc54efee.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/bd3ea91c-a47e-4bc2-a131-12aa64f9fd4a.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ec1fa705-e93e-4c17-ba90-59a5e7ca95c6.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/c1a86c67-2fc3-41bd-9af9-5c5e3f98913a.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/52030af3-3aa0-4b11-9955-cc83f95402f2.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/2f1a1287-7268-4e8a-81e3-8aec4ae09216.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/796ba655-5368-4398-b115-4f065639b7d2.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/60b83d92-7a22-4196-b671-7abb09166bc6.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/06123a42-5450-47f5-92a2-874acf7d3c09.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/0d3d8996-f2ad-491b-8d33-5edef4ef92df.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/0d6dda68-508a-4bb0-8a73-fcc975da232d.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/4c97f7d6-2e37-4ec3-baf3-8439361d0e49.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/f6a77209-bdb9-4e64-b1ff-bbf9f6449ec9.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/2281d739-be0f-40dd-8044-23c323a8c1b1.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/4340cb1b-af68-41ca-b886-0147fad51f2d.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/fe962678-3010-4c83-80a0-660765860faa.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ea173d2c-3a30-4855-b170-35267d955faf.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/fd4febd2-3619-49c9-9875-b50837cb7128.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/adea4d24-beab-4d64-b152-f12971199aaa.webp"
    ]
  },
  {
    "id": "india-tiger-2027",
    "title": "Panna & Bandhavgarh Tiger Expedition",
    "slug": "india-tiger",
    "date": "20 – 26 April 2027",
    "location": "India",
    "maxPhotographers": 7,
    "price": "£2,900 per person",
    "duration": "7 Days | 6 Nights",
    "overview": "Experience the raw intensity of India’s tiger heartland. This carefully designed expedition combines two of India’s most productive tiger reserves — Panna and Bandhavgarh. With 11 safari drives and 2 exclusive jeeps per session, this expedition prioritises opportunity, positioning and consistency.",
    "focusSpecies": [
      "Bengal Tiger",
      "Leopard",
      "Sloth Bear",
      "Dhole (Indian Wild Dog)",
      "Jungle Cat"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "20 April | Arrival",
        "description": "Arrival at Jabalpur. Transfer to Panna for check-in and briefing."
      },
      {
        "day": "Days 2-3",
        "title": "Panna National Park",
        "description": "5 Jeep Safaris with 2 exclusive jeeps. Transfer to Bandhavgarh on Day 3."
      },
      {
        "day": "Days 4-6",
        "title": "Bandhavgarh National Park",
        "description": "6 Jeep Safaris focused on dedicated photographic positioning for tigers."
      },
      {
        "day": "Day 7",
        "title": "26 April | Departure",
        "description": "Breakfast and transfer to airport for departure."
      }
    ],
    "included": [
      "6 Nights accommodation",
      "All meals (Breakfast, Lunch, Dinner)",
      "11 Jeep safaris (2 exclusive jeeps)",
      "Chosen driver and vehicle consistency",
      "Professional local guides and park permits",
      "All local transportation and transfers"
    ],
    "notIncluded": [
      "International flights",
      "Indian visa fees",
      "Travel insurance",
      "Gratuities and tips",
      "Camera charges (subject to park policy)"
    ],
    "equipment": [
      "DSLR or mirrorless camera with fast autofocus",
      "400–600mm telephoto lens",
      "Secondary camera body",
      "Bean bag for vehicle support",
      "Dust protection for equipment"
    ],
    "nonRefundableDeposit": 600,
    "image": "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e644b370-7fa9-4044-ae78-59dc13499b2a.webp",
    "gallery": [
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/7736a514-8b62-4c5f-9e13-1861763fe159.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e2f15e8e-a794-40be-a423-79ff8e9f341f.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/1ced3038-2e62-41ca-89fa-c2f79e2feea2.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/b8d4ade1-1193-4941-8877-e510475c6e7b.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/c9e4569a-2c91-4df8-8d80-13e89e83dd6c.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e491f572-6cd2-45dc-816c-942d80699f37.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/36daf5c8-6594-4bf0-9a63-8eb41b18b5fd.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e2edbcd7-f388-4366-b562-ac247698322d.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ceb4e7db-4fc9-495d-bfe6-dd6254d2e648.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/035c2085-f2a4-4942-ac63-0ef8b07ad26c.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/eadd5833-0daa-4541-87ef-9129a560b06d.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e896e098-e65a-467b-ac00-159a871c4801.webp"
    ]
  },
  {
    "id": "poland-eagle",
    "title": "White-tailed Eagle Expedition",
    "slug": "poland-eagle",
    "date": "To Be Announced",
    "location": "Poland",
    "maxPhotographers": 3,
    "price": "£1,600 per person",
    "duration": "4 Days | 3 Full Photo Days",
    "overview": "Join ShutterWild Expedition Ltd for an intensive White-tailed Eagle photography expedition in Poland — one of Europe’s strongest populations of this magnificent raptor. Each day is spent inside professional wildlife hides from sunrise to sunset.",
    "focusSpecies": [
      "White-tailed Eagle",
      "Common Buzzard",
      "Rough-legged Buzzard",
      "Red Kite",
      "Raven",
      "Red Fox"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival",
        "description": "Airport pickup, check-in, and welcome briefing."
      },
      {
        "day": "Days 2-4",
        "title": "Hide Photography",
        "description": "3 full days of sunrise-to-sunset hide photography with packed lunches provided."
      },
      {
        "day": "Day 5",
        "title": "Departure",
        "description": "Breakfast and transfer to airport."
      }
    ],
    "included": [
      "3 full days of guided wildlife photography",
      "Professional photography tuition",
      "Accommodation and daily breakfast/dinner",
      "Daily packed lunch",
      "Ground transportation and airport transfers",
      "Hide access with mounted plate system"
    ],
    "notIncluded": [
      "International flights",
      "Travel insurance",
      "Alcoholic beverages",
      "Personal expenses"
    ],
    "equipment": [
      "Camera with fast burst rate",
      "400–600mm telephoto lens",
      "Tripod head or gimbal head (hide plate provided)",
      "Warm clothing"
    ],
    "nonRefundableDeposit": 500,
    "image": "https://3avvur93ovh41qil.public.blob.vercel-storage.com/c8796b65-7309-41c3-abb9-72996a531b81.webp",
    "gallery": [
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ec09e5fc-25d7-4982-8f1e-318db6fbe2dd.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ca722770-3ae5-4b9e-ae3e-81a303d9adc8.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/436c0185-da6e-49eb-b829-62a6824583d9.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/5ff9743e-b86e-4b23-9d96-c3b8ffad246e.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/8969aff3-9dd8-4de0-acf9-14fe3a9da618.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/a5c24112-4ae4-444c-ab5f-8efd0b5f0db4.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/7106c649-dbfe-4ef3-8518-c0567dc04d9d.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/7ceefb32-e7fd-48c0-8e29-7ead3f9fe5cb.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/b8bdba41-1648-4134-83aa-fc307c758edb.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e35ba4b0-afd2-4eed-8add-da51c6b26492.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e372bdf2-d91f-4a67-b722-39efed7033d0.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ec9a3b58-6f04-4a4d-a001-014cff2224aa.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/f275fa7f-3560-4df3-b7dc-bd2304d69ab4.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/c925b4e6-3933-42db-aacc-5f915463ba02.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/d62a4f11-7203-4abd-9a64-56aa33411e19.webp"
    ]
  },
  {
    "id": "pantanal-jaguar-2027",
    "title": "Pantanal Jaguar Expedition",
    "slug": "pantanal-jaguar",
    "date": "23 August 2027",
    "location": "Porto Jofre, Brazil",
    "maxPhotographers": 5,
    "price": "£4,800 per person",
    "duration": "7 Days | 6 Nights",
    "overview": "This is a focused, high-intensity wildlife expedition designed for photographers who want real time in the field. Operating during the prime dry season, this trip focuses on the Cuiabá River for exceptional jaguar visibility, hunting sequences, and swimming jaguars.",
    "focusSpecies": [
      "Jaguar",
      "Hyacinth Macaw",
      "Jabiru Stork",
      "Caiman",
      "Capybara"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival & Transfer",
        "description": "Arrival into Cuiabá (CGB). Private transfer to Porto Jofre via the Transpantaneira with wildlife stops."
      },
      {
        "day": "Days 2-6",
        "title": "Full Jaguar Focus",
        "description": "Dedicated river safaris from sunrise to sunset prioritising prime river territories and clean background compositions."
      },
      {
        "day": "Day 7",
        "title": "Departure",
        "description": "Breakfast and transfer back to Cuiabá Airport."
      }
    ],
    "included": [
      "6 nights lodge accommodation",
      "All meals",
      "Daily sunrise–sunset river safaris",
      "Professional bilingual wildlife guide",
      "Experienced boat pilot",
      "Cuiabá airport transfers"
    ],
    "notIncluded": [
      "International/Domestic flights",
      "Travel insurance (mandatory)",
      "Alcoholic drinks",
      "Gratuities"
    ],
    "equipment": [
      "Fast autofocus camera",
      "300-600mm telephoto lens",
      "Sun protection and tropical clothing",
      "Waterproof bags for boat"
    ],
    "nonRefundableDeposit": 1500,
    "image": "https://3avvur93ovh41qil.public.blob.vercel-storage.com/08690ea8-3bc7-4765-9c2a-8f117db7bd8b.webp",
    "gallery": [
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/b4fe4a17-eafc-44cd-8cc7-b3cb4de13a4a.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/3b360987-1e27-4b8e-8623-c73700dcd94d.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/28ff0e2a-68ed-4795-8bfc-97a84aa721d7.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/bb34f4b2-cbf5-48e0-9564-d2b3d8a5590f.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/903dd3cc-b014-4fde-ba21-8c456617f30b.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/404a4d91-68ff-4551-92f6-72dd9b442d19.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/8fe6bfa9-250d-438f-8667-9b8fada5b808.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/af7dc202-cf0f-4705-b9a1-a17902889644.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/52c60038-8320-4166-9564-e655f200deac.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/0927d4bf-c573-42ce-8277-6cb9010a52a9.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e81b327d-f8a4-422a-ad7e-8aef6fbd4c3f.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/a244bdb6-00be-4e27-b54d-b5423f06af9c.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/8ce85b0c-b121-40cf-a81e-5e057e7f13ab.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/4d3d5f00-f4bb-4519-9603-4b7ddd4d4fcc.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/ba4f5dfc-f2ea-4a12-9872-15008eaa816f.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/a0a7b2cd-e151-4f1b-b6d2-c4f9f43475e8.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/4a0a996e-60cc-4e61-b228-bab71910d49e.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/29d545b4-3ab0-4394-92c3-bf36274da42e.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/c6d6e3f1-14a7-4953-9207-9ec525c6cd72.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/006c7579-e765-4bbd-97b3-2225982d98c3.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/e57c6427-3bd8-4d45-9b90-df58cfd9abef.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/0a230a44-e1a8-4ae2-8dd2-25e842761875.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/12e4e467-f580-4837-8e4f-191699ee5012.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/0504094c-a447-4683-aee0-826f48ac3890.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/37245621-75c4-4b54-9424-04401b9146fe.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/df1b3275-f248-4818-87df-661ead42b8aa.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/b92b9fc2-e256-4c39-a247-96ba8d60c09a.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/410e43f2-4aa0-4817-8c35-f073578f8e39.webp",
      "https://3avvur93ovh41qil.public.blob.vercel-storage.com/5eb6ea2f-57b8-43d3-8b2c-692040560e18.webp"
    ]
  }
];
