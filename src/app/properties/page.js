'use client';
import { BentoGridItem, BentoGrid } from '@/src/components/cards';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Suspense } from 'react';
import { supabase } from '@/utils/supabase';
import { ListItemSecondaryAction } from '@mui/material';

const Properties = () => {
  const query = useSearchParams();
  const router = useRouter();
  const type = query.get('type');
  const [properties, setProperties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        var data, error;
        const getData = async () => {
          const { data, error } = await supabase.from('Properties').select('*');
          return { data, error };
        };
        const getDataWithType = async () => {
          const { data, error } = await supabase
            .from('Properties')
            .select('*')
            .eq('type', type);
          return { data, error };
        };

        if (!type) {
          ({ data, error } = await getData());
        } else {
          // Fetch properties with a specific type
          ({ data, error } = await getDataWithType(type));
        }
        const uniqueLocations = [...new Set(data.map((item) => item.location.city))];
        const uniqueDevelopers = [
          ...new Set(data.map((item) => item.developer)),
        ];
        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          setProperties(data);
          setLocations(uniqueLocations);
          setDevelopers(uniqueDevelopers);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchProperties();
  }, [type]);

  useEffect(() => {
    let filteredProperties = properties;

    if (selectedLocation) {
      filteredProperties = filteredProperties.filter(
        (property) => property.location.city === selectedLocation
      );
    }

    if (selectedDeveloper) {
      filteredProperties = filteredProperties.filter(
        (property) => property.developer === selectedDeveloper
      );
    }
    setFiltered(filteredProperties);
  }, [properties, selectedDeveloper, selectedLocation]);

  const renderAutocomplete = (options, label, onChangeHandler) => (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      onChange={onChangeHandler}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );

  return (
    <div className="bg-offwhite min-h-screen flex flex-col items-center py-[15vh]">
      <div className="w-[80%] my-5 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-fit">
          {renderAutocomplete(locations, 'Location', (event, newValue) =>
            setSelectedLocation(newValue)
          )}
          {renderAutocomplete(developers, 'Developers', (event, newValue) =>
            setSelectedDeveloper(newValue)
          )}
        </div>
      </div>
      <BentoGrid className="w-[60%] md:w-[80%] mx-auto">
        {filtered.map((item, i) => (
          <BentoGridItem
            key={i}
            title={
              <p className="text-darkButNotBlack whitespace-nowrap w-full text-ellipsis overflow-hidden">
                {item.title}
              </p>
            }
            description={
              <p className="text-darkButNotBlack h-[30px] overflow-hidden text-ellipsis">
                {item.description}
              </p>
            }
            header={<p className="text-darkButNotBlack">{item.type}</p>}
            image={item.images[0] ?? ''}
            price={<p className="text-darkButNotBlack">{item.price}</p>}
            location={
              <p className="text-darkButNotBlack">{item.location.city}</p>
            }
            className={`${
              i === 4 || i === 9 ? 'md:col-span-2 ' : ''
            }!bg-white border border-gray-200`}
            onClick={() => {
              router.push(`/property?id=${item.id}`);
            }}
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
