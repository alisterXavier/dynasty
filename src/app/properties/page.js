'use client';
import { BentoGridItem, BentoGrid } from '@/src/components/cards';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Suspense } from 'react';

const prop = [
  // Luxury
  {
    type: 'luxury',
    description: 'Beachfront Villa with Private Pool',
    title: 'Beachfront Villa with Private Pool',
    image: '/images/creek.webp',
    price: '10,000,000',
    location: 'Palm Jumeirah',
    developer: 'Sobha',
  },
  {
    type: 'luxury',
    description: 'Penthouse with Panoramic City View',
    title: 'Penthouse with Panoramic City View',
    image: '/images/creek.webp',
    price: '8,000,000',
    developer: 'Dubai Holdings',
    location: 'Abu Dhabi',
  },
  {
    type: 'luxury',
    description: 'Mansion on a Championship Golf Course',
    title: 'Mansion on a Championship Golf Course',
    image: '/images/creek.webp',
    price: '15,000,000',
    location: 'Dubai Hills',
    developer: 'CBRE',
  },
  {
    type: 'luxury',
    description: 'Mountain Retreat with Infinity Pool',
    title: 'Mountain Retreat with Infinity Pool',
    image: '/images/creek.webp',
    price: '7,000,000',
    location: 'Jebel Ali',
    developer: 'Deyaar',
  },
  // Apartments
  {
    type: 'apartments',
    description: 'Studio Apartment in Downtown Dubai',
    title: 'Studio Apartment in Downtown Dubai',
    image: '/images/creek.webp',
    price: '800,000',
    location: 'Burj Khalifa District (Dubai)',
    developer: 'Emaar',
  },
  {
    type: 'apartments',
    description: '2 Bedroom Apartment with Marina View',
    title: '2 Bedroom Apartment with Marina View',
    image: '/images/creek.webp',
    price: '1,500,000',
    location: 'Dubai Hills',
    developer: 'Cayan Group',
  },
  {
    type: 'apartments',
    description: 'Family Apartment with Shared Pool',
    title: 'Family Apartment with Shared Pool',
    image: '/images/creek.webp',
    price: '1,200,000',
    location: 'Dubai Sports City',
    developer: 'Emaar',
  },
  {
    type: 'apartments',
    description: 'Luxury Serviced Apartment',
    title: 'Luxury Serviced Apartment',
    image: '/images/creek.webp',
    price: '2,000,000',
    location: 'Business Bay',
    developer: 'Damaac',
  },
  // Off-plans
  {
    type: 'off-plans',
    description: 'Studio in Upcoming Marina Development',
    title: 'Studio in Upcoming Marina Development',
    image: '/images/creek.webp',
    price: '500,000', // Adjust price for off-plan
    location: 'Dubai Marina (Dubai) ',
    developer: 'Deyaar',
  },
  {
    type: 'off-plans',
    description: '',
    title: '2 Bedroom with Sea View (Under Construction)',
    image: '/images/creek.webp',
    price: '800,000', // Adjust price for off-plan
    location: 'Ajman Corniche (Ajman)',
    developer: 'Sobha',
  },
  {
    type: 'off-plans',
    description: '',
    title: 'Family Apartment in New Development (Completion 2025)',
    image: '/images/creek.webp',
    price: '1,000,000', // Adjust price for off-plan
    location: 'Yas Island (Abu Dhabi)',
    developer: 'Damaac',
  },
  {
    type: 'off-plans',
    description: '',
    title: 'Luxury Apartment with Hotel Services (Pre-Launch)',
    image: '/images/creek.webp',
    price: '1,800,000', // Adjust price for off-plan
    location: 'Dubai Water Canal (Dubai)',
    developer: 'Emaar',
  },
  // Villas
  {
    type: 'villas',
    description: 'Private Gated Community Villa',
    title: 'Private Gated Community Villa',
    image: '/images/creek.webp',
    price: '3,500,000',
    location: 'Jumeirah Village Triangle (Dubai)',
    developer: 'Meydan',
  },
  {
    type: 'villas',
    description: 'Beachfront Villa with Private Beach Access',
    title: 'Beachfront Villa with Private Beach Access',
    image: '/images/creek.webp',
    price: '2,800,000',
    location: 'Umm Al Quwain (Umm Al Quwain)',
    developer: 'Nakheel',
  },
  {
    type: 'villas',
    description: 'Spacious Family Villa in Gated Community',
    title: 'Spacious Family Villa in Gated Community',
    image: '/images/creek.webp',
    price: '4,000,000',
    location: 'Saadiyat Island (Abu Dhabi)',
    developer: 'Meraas',
  },
  {
    type: 'villas',
    description: 'Modern Villa with Rooftop Terrace',
    title: 'Modern Villa with Rooftop Terrace',
    image: '/images/creek.webp',
    price: '5,000,000',
    location: 'Dubai Hills Estate (Dubai)',
    developer: 'Emaar',
  },
];

const Properties = () => {
  const router = useSearchParams();
  const type = router.get('type');
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState('');

  useEffect(() => {
    const getData = () => {
      const p = prop.filter((item) => (!type ? item.type : item.type === type));
      const locationss = prop.map((t) => t.location);
      const developers = prop.map((t) => t.developer);
      const uniqueLocations = new Set(locationss);
      const uniqueDeveloeper = new Set(developers);
      setLocations([...uniqueLocations]);
      setDevelopers([...uniqueDeveloeper]);
      setData(p);
    };

    getData();
  }, [type]);

  useEffect(() => {
    var filtered = prop;
    if (selectedLocation) {
      filtered = filtered.filter((t) => t.location === selectedLocation);
      setData(filtered);
    }
    if (selectedDeveloper) {
      filtered = filtered.filter((t) => t.developer === selectedDeveloper);
      setData(filtered);
    }
    if (!selectedDeveloper && !selectedLocation) {
      filtered = prop.filter((item) =>
        !type ? item.type : item.type === type
      );
      setData(filtered);
    }
  }, [selectedDeveloper, selectedLocation, type]);

  return (
    <div className="bg-offwhite min-h-screen flex flex-col items-center py-[15vh]">
      <div className="w-[80%] my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-fit">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={locations}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              setSelectedLocation(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={developers}
            sx={{ width: 300 }}
            onChange={(event, newValue) => {
              setSelectedDeveloper(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Developers" />
            )}
          />
        </div>
      </div>
      <BentoGrid className=" w-[70%] md:w-[80%] mx-auto">
        {data?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={<p className="text-darkButNotBlack">{item.title}</p>}
            description={
              <p className="text-darkButNotBlack">{item.description}</p>
            }
            header={<p className="text-darkButNotBlack">{item.type}</p>}
            image={item.image}
            price={<p className="text-darkButNotBlack">{item.price}</p>}
            location={<p className="text-darkButNotBlack">{item.location}</p>}
            className={`${
              i === 4 || i === 9 ? 'md:col-span-2' : ''
            } !bg-white border border-gray-200`}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

const PropPage = () => (
  <Suspense>
    <Properties />
  </Suspense>
);

export default PropPage;
