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
  useEffect(() => {
    gsap.fromTo(
      '.fade-img',
      {
        opacity: 0,
      },
      { opacity: 1, duration: 1.5 }
    );

    gsap.fromTo(
      '.property-hero-inner',
      {
        y: 0,
      },
      {
        y: '-50%',
        scrollTrigger: {
          trigger: '.dynasty-real-estate',
          start: 'top top',
          scrub: true,
        },
      }
    );
  }, []);

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
          <figure className="absolute z-10 top-0 fade-img w-full h-full">
            <Image
              src="/images/bg/IMG-20240505-WA0005.jpg"
              fill
              alt=""
              objectFit="contain"
            />
          </figure>
          <figure className="absolute top-0 fade-img w-full h-full">
            <Image
              src="/images/adv/SB10-01-01.jpg"
              fill
              alt=""
              objectFit="contain"
            />
          </figure>
          <figure className="absolute top-0 fade-img w-full h-full">
            <Image
              src="/images/bg/IMG-20240505-WA0005.jpg"
              fill
              alt=""
              objectFit="contain"
            />
          </figure>
          <figure className="absolute top-0 fade-img w-full h-full">
            <Image
              src="/images/bg/IMG-20240505-WA0005.jpg"
              fill
              alt=""
              objectFit="contain"
            />
          </figure>
        </div>
        <div className="absolute z-10 bottom-0 left-0 md:bottom-5 md:left-5 text-offwhite overflow-hidden">
          <StaggerText
            text={title}
            parent={'.property-hero'}
            className="stagger-text revamp-font-optima my-5 text-2xl md:text-7xl"
          />
          <StaggerText
            text={location}
            parent={'.property-hero'}
            className="stagger-text revamp-font-optima my-5 text-xl md:text-3xl"
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
  agent,
  location,
  title,
  price,
  bedrooms,
  bathrooms,
  description,
  image,
  status,
  type,
  map,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   if (isLoaded && map) {
  //     const loc = document.querySelector('.property-loaction iframe');
  //     loc.style.width = '100%';
  //     loc.style.height = '60vh';
  //   } else setIsLoaded(true);
  // }, [isLoaded, map]);

  return (
    <div className="property-details min-h-screen p-20">
      <div className="my-5 ">
        <p className="revamp-font-optima text-lg md:text-4xl">{title}</p>
        <p className="revamp-font-optima text-lg md:text-2xl">{location}</p>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex flex-col md:flex-row w-full md:w-[60%]">
          <div className="w-[100px] md:w-[300px]">
            <h2 className="revamp-font-titi text-sm md:text-md my-2">Price</h2>
            <p className="revamp-font-optima text-xl md:text-xl">{price} AED</p>
          </div>
          <div className="w-[100px] md:w-[300px]">
            <h2 className="revamp-font-titi text-sm md:text-md my-2">
              Bedrooms
            </h2>
            <p className="revamp-font-optima text-xl md:text-xl">{bedrooms}</p>
          </div>
          <div className="w-[100px] md:w-[300px]">
            <h2 className="revamp-font-titi text-sm md:text-md my-2">
              Bathrooms
            </h2>
            <p className="revamp-font-optima text-xl md:text-xl">{bathrooms}</p>
          </div>
        </div>
        <div
          className="w-full md:w-[35%] bg-darkButNotBlack p-5 flex justify-between items-center cursor-pointer"
          onClick={() => {
            document
              .querySelector(`.property-contact`)
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div>
            <p className="revamp-font-optima text-white">{agent.name}</p>
            <p className="revamp-font-optima text-white text-xs">
              {agent.designation}
            </p>
          </div>
          <p className="revamp-font-optima text-white text-xs hover:translate-x-1 transition-all">
            Send Message
          </p>
        </div>
      </div>

      <div className="my-20 ">
        <div className="flex justify-between">
          <div className="w-full md:w-[60%]">
            <h2 className="revamp-font-titi text-md text-md my-2">
              Description
            </h2>
            <StaggerPara
              text={description}
              className="stagger-para revamp-font-optima text-xl md:text-xl"
              parent={'.property-details'}
              start={'40% bottom'}
            />
          </div>

          <div className="w-[35%]">
            <div className="flex flex-wrap mb-5">
              <div className="w-full md:w-[50%]">
                <p className="text-sm md:text-md revamp-font-titi my-2">Type</p>
                <p className="text-lg md:text-xl revamp-font-optima capitalize">
                  {type}
                </p>
              </div>
              <div className="w-full md:w-[50%]">
                <p className="text-sm md:text-md revamp-font-titi my-2">
                  Status
                </p>
                <p className="text-lg md:text-xl revamp-font-optima">
                  {status}
                </p>
              </div>
            </div>
            <div className="relative w-full h-full flex justify-center">
              <figure className="relative w-[100%] h-[80%] z-10">
                <Image
                  src="/images/bg/IMG-20240505-WA0005.jpg"
                  alt=""
                  fill
                  objectFit="contain"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>

      <div className="property-loaction mt-10">{map}</div>
    </div>
  );
};

const Property = () => {
  const query = useSearchParams();
  const id = query.get('id');
  const [data, setData] = useState({});
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
          <Hero images={[]} title={data.title} location={data.location} />
          <Details
            price={data.price}
            bedrooms={data.bedrooms}
            bathrooms={data.bathrooms}
            title={data.title}
            location={data.location}
            agent={{
              name: data.agentName,
              designation: data.agentDesignation,
            }}
            description={data.description}
            image={data.images}
            type={data.type}
            status={data.status}
            map={parse(`${data.map}`)}
          />
          <div className="flex">
            <div className="w-[40%]"></div>
            <GetIntouch
              className="w-[50%] property-contact"
              placeholder={`Hey ${data.agentName},\nI'm interested in this property. Let's connect. ${url}`}
            />
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