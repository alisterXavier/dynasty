'use client';
import { StaggerPara, StaggerText } from '@/src/components/textStagger';
import { supabase } from '@/utils/supabase';
import gsap from 'gsap';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { GetIntouch } from '../contact/page';
import parse from 'html-react-parser';

const Hero = ({ title, images, location }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      setInterval(() => {
        handleNext();
      }, 5000);
    } else setLoaded(true);
  }, [loaded]);

  const handleNext = () => {
    var curr = document.querySelector('.property-hero-images .z-10');
    var next = curr.nextSibling;
    if (!next) {
      next = document.querySelectorAll('.property-hero-images figure')[0];
    }
    curr.classList.toggle('z-10');
    next.classList.toggle('z-10');
  };

  const handlePrev = () => {
    var curr = document.querySelector('.property-hero-images .z-10');
    var prev = curr.previousSibling;
    if (!prev) {
      const elems = document.querySelectorAll('.property-hero-images figure');
      prev = elems[elems.length - 1];
    }
    curr.classList.toggle('z-10');
    prev.classList.toggle('z-10');
  };

  return (
    <div className="property-hero">
      <div className="property-hero-inner w-screen h-screen relative bg-darkButNotBlack flex items-center justify-center">
        <div className="property-hero-images w-full h-full">
          {images?.map((image, i) => {
            return (
              <figure
                key={i}
                className={`absolute ${
                  i === 0 ? 'z-10' : ''
                } top-0 fade-img w-full h-full bg-darkButNotBlack`}
              >
                <Image src={image} fill alt="" objectFit="contain" />
              </figure>
            );
          })}
        </div>
        <div className="absolute z-10 bottom-0 md:bottom-5 left-5 text-offwhite overflow-hidden my-20">
          <StaggerText
            text={title}
            parent={'.property-hero'}
            className="stagger-text revamp-font-optima text-2xl md:text-7xl"
          />
          <StaggerText
            text={location?.city}
            parent={'.property-hero'}
            className="stagger-text revamp-font-optima text-xl md:text-3xl"
          />
        </div>
        <div className="btns absolute w-[100px] z-[100] bottom-10 right-10 flex justify-between">
          <div className="cursor-pointer" onClick={handlePrev}>
            <IconArrowLeft size={30} color="white" />
          </div>
          <div className="cursor-pointer" onClick={handleNext}>
            <IconArrowRight size={30} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Details = ({
  consultant,
  location,
  title,
  price,
  bedrooms,
  bathrooms,
  description,
  image,
  status,
  size,
  type,
  map,
  flooring_images,
  flooring_description,
  amenities,
}) => {
  return (
    <div className="property-details">
      <div className="my-5 ">
        <p className="revamp-font-optima text-lg md:text-4xl">{title}</p>
        <p className="revamp-font-optima text-lg md:text-2xl">
          {location?.address}, {location.city}
        </p>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex flex-wrap md:flex-nowrap md:flex-row w-full md:w-[60%]">
          <div className="w-[200px] my-2 md:my-0 md:w-[300px]">
            <h2 className="revamp-font-titi text-sm md:text-md my-2">Price</h2>
            <p className="revamp-font-optima text-xl md:text-xl">{price} AED</p>
          </div>
          <div className="w-[200px] my-2 md:my-0 md:w-[300px]">
            <h2 className="revamp-font-titi text-sm md:text-md my-2">Size</h2>
            <p className="revamp-font-optima text-xl md:text-xl">
              {size} sq<span className="text-sm align-super">ft</span>
            </p>
          </div>
          <div className="w-[200px] my-2 md:my-0 md:w-[300px]">
            <h2 className="revamp-font-titi text-sm md:text-md my-2">
              Bedrooms
            </h2>
            <p className="revamp-font-optima text-xl md:text-xl">{bedrooms}</p>
          </div>
          <div className="w-[200px] my-2 md:my-0 md:w-[300px]">
            <h2 className="revamp-font-titi text-sm md:text-md my-2">
              Bathrooms
            </h2>
            <p className="revamp-font-optima text-xl md:text-xl">{bathrooms}</p>
          </div>
        </div>
        <div
          className="w-full mt-5 md:mt-0 md:w-[35%] bg-darkButNotBlack p-5 flex justify-between items-center cursor-pointer"
          onClick={() => {
            document
              .querySelector(`.property-contact`)
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div>
            <p className="revamp-font-optima text-white">{consultant.name}</p>
            <p className="revamp-font-optima text-white text-xs">
              {consultant.designation}
            </p>
          </div>
          <p className="revamp-font-optima text-white text-xs hover:translate-x-1 transition-all">
            Send Message
          </p>
        </div>
      </div>

      <div className="my-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[60%]">
            <h2 className="revamp-font-titi text-md my-2">Description</h2>
            <p className="stagger-para revamp-font-optima text-lg">
              {description}
            </p>
          </div>

          <div className="mt-5 w-full md:w-[35%]">
            <div className="flex flex-wrap mb-5">
              <div className="w-[50%]">
                <p className="text-sm md:text-md revamp-font-titi my-2">Type</p>
                <p className="text-lg revamp-font-optima capitalize">{type}</p>
              </div>
              <div className="w-[50%]">
                <p className="text-sm md:text-md revamp-font-titi my-2">
                  Status
                </p>
                <p className="text-lg revamp-font-optima">{status}</p>
              </div>
            </div>
            {/* <div className="relative w-full h-full flex justify-center">
              <figure className="relative w-[100%] h-[321px] z-10">
                <Image src={image} alt="" fill objectFit="contain" />
              </figure>
            </div> */}
          </div>
        </div>
      </div>

      {flooring_images && flooring_description ? (
        <FloorPlans
          images={flooring_images}
          description={flooring_description}
        />
      ) : (
        <></>
      )}
      {amenities ? <Amenities amenities={amenities} /> : <></>}

      <div className="property-location mt-5 md:mt-10 h-[50vh]">
        <h2 className="text-md md:text-xl revamp-font-titi my-2">Location</h2>
        <div className="w-[200px] my-2 md:my-0 md:w-[300px]">
          <p className="revamp-font-optima text-lg">
            {location?.address ?? '-'}
          </p>
        </div>
        {map}
      </div>
    </div>
  );
};

const FloorPlans = ({ images, description }) => {
  return (
    <div className="floor-plans">
      <h2 className="text-md sm:text-xl revamp-font-titi my-2">Floor Plans</h2>
      <div className="flex flex-wrap">
        {images.map((image, i) => {
          return (
            <figure
              key={i}
              className="relative w-[100%] md:mr-5 md:w-[390px] h-[300px] flex justify-start"
            >
              <Image className="" src={image} alt="" fill objectFit="contain" />
            </figure>
          );
        })}
      </div>
      <div className="flooring-plan-description mt-2 overflow-hidden">
        <p className="stagger-para revamp-font-optima text-lg">{description}</p>
      </div>
    </div>
  );
};

const Amenities = ({ amenities }) => {
  return (
    <div className="property-amenities my-5">
      <h2 className="text-md md:text-xl revamp-font-titi my-2">Amenities</h2>
      <div className="flex flex-wrap">
        {amenities.map((amenity, index) => {
          return (
            <div
              key={index}
              className="w-[200px] my-2 md:my-0 md:w-[300px] border p-5 mr-5"
            >
              <h2 className="revamp-font-titi text-sm md:text-md my-2">
                {amenity.title}
              </h2>
              <p className="revamp-font-optima text-xl md:text-xl">
                {amenity.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Property = () => {
  const query = useSearchParams();
  const id = query.get('id');
  const [data, setData] = useState();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await supabase
        .from('Properties')
        .select()
        .eq('id', id)
        .single();
      setData(res.data);
    };
    getData();
    setUrl(window.location.origin + '' + window.location.pathname);
  }, [id]);

  return (
    <div className="dynasty-real-estate min-h-screen w-screen">
      {data && (
        <>
          <Hero
            images={data.images ?? ['/images/creek.webp']}
            title={data.title}
            location={data.location}
          />
          <div className="p-10 md:p-20">
            <Details
              price={data.price}
              bedrooms={data.bedrooms}
              bathrooms={data.bathrooms}
              title={data.title}
              location={data.location}
              consultant={{
                name: data.consultant.name,
                designation: data.consultant.designation,
              }}
              description={data.description}
              image={
                data.images
                  ? data.images[data.images.length - 2]
                  : ['/images/creek.webp']
              }
              type={data.type}
              status={data.status}
              map={parse(`${data.map}`)}
              size={data.size}
              flooring_images={
                data.flooring_images ?? [
                  '/images/creek.webp',
                  '/images/creek.webp',
                  '/images/creek.webp',
                ]
              }
              flooring_description={
                data.flooring_description ??
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              }
              amenities={data.amenities}
            />
            <div className="flex flex-col md:flex-row mt-[15vh]">
              <div className="w-full md:w-[40%] flex flex-col p-10 bg-darkButNotBlack">
                <div className="flex ">
                  <figure className="relative w-[150px] h-[150px]">
                    <Image
                      src="/images/team/edgar.png"
                      alt=""
                      fill
                      objectFit="contain"
                    />
                  </figure>
                  <div className="flex flex-col justify-end">
                    <h2 className="revamp-font-optima text-white text-lg md:text-4xl">
                      {data.consultant.name}
                    </h2>
                    <h2 className="revamp-font-optima text-white text-sm md:text-md">
                      {data.consultant.designation}
                    </h2>
                    {/* <p className="text-white ">{data.agentEmail}</p> */}
                  </div>
                </div>
                <div className="p-10">
                  <h2 className="revamp-font-optima text-white  text-2xl flex items-center group cursor-pointer">
                    Get in touch
                    <IconArrowRight
                      size={20}
                      className="group-hover:translate-x-[10px] transition-all"
                    />
                  </h2>
                </div>
              </div>
              <GetIntouch
                className="w-full md:w-[60%] property-contact md:p-0 shadow-none md:pl-10"
                placeholder={`Hey ${data.consultant.name},\nI'm interested in this property. Let's connect. ${url}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PropertyComp = () => (
  <Suspense>
    <Property />
  </Suspense>
);

export default PropertyComp;
