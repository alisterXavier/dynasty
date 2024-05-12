'use client';
import Image from 'next/image';
import staff from '@/public/images/staff-group-photo-enhanced.webp';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { BentoGridItem } from '../components/cards';
import {
  IconChevronLeft,
  IconChevronRight,
  IconLocation,
  IconPhone,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { HoveredLink, Menu, MenuItem, ProductItem } from '../components/navbar';
import canal from '@/public/images/bg/IMG-20240505-WA0005.jpg';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { CldImage } from 'next-cloudinary';

const adv = [
  {
    title: 'Fully Engaged',
    para: 'Our team is fully engaged in creating innovative solutions for your home buying journey, ensuring every step is seamless and rewarding.',
  },
  {
    title: 'Enhanced Opportunities',
    para: 'Experience the future of home living with our cutting-edge technology integrated into every aspect of our developments, ensuring efficiency, comfort, and sustainability.',
  },
  {
    title: 'Discover Your Home',
    para: 'Explore our diverse range of properties and discover the perfect home that resonates with your lifestyle and aspirations.',
  },
  {
    title: 'Cutting-edge Technology',
    para: 'Unlock enhanced opportunities for investment and growth with our dynamic real estate offerings, tailored to maximize your returns and potential.',
  },
];
const testimonials = [
  {
    name: 'Typewriter',
    para: "Working with Dynasty has been an absolute pleasure. Their team's dedication, professionalism, and expertise made our home buying experience seamless and stress-free. From understanding our needs to finding the perfect property and guiding us through the entire process, they provided exceptional service every step of the way. Their attention to detail, market knowledge, and commitment to client satisfaction truly set them apart. We couldn't be happier with our decision to trust Dynasty with our real estate needs and highly recommend them to anyone in search of their dream home.",
  },
  {
    name: 'Typewriter',
    para: "Working with Dynasty has been an absolute pleasure. Their team's dedication, professionalism, and expertise made our home buying experience seamless and stress-free. From understanding our needs to finding the perfect property and guiding us through the entire process, they provided exceptional service every step of the way. Their attention to detail, market knowledge, and commitment to client satisfaction truly set them apart. We couldn't be happier with our decision to trust Dynasty with our real estate needs and highly recommend them to anyone in search of their dream home.",
  },
  {
    name: 'Typewriter',
    para: "Working with Dynasty has been an absolute pleasure. Their team's dedication, professionalism, and expertise made our home buying experience seamless and stress-free. From understanding our needs to finding the perfect property and guiding us through the entire process, they provided exceptional service every step of the way. Their attention to detail, market knowledge, and commitment to client satisfaction truly set them apart. We couldn't be happier with our decision to trust Dynasty with our real estate needs and highly recommend them to anyone in search of their dream home.",
  },
];
const partners = [
  '/images/deyaar.png',
  '/images/damac.png',
  '/images/dubai-holding.png',
  '/images/emaar.png',
  '/images/meraas.png',
  '/images/meydan.png',
  '/images/nakheel.png',
  '/images/sobha.png',
];

const defaultAnimtion = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.5,
    },
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const vids = [
  'https://res.cloudinary.com/dboza0n1a/video/upload/v1715441303/aerial-view-of-dubai-expo-2020-united-arab-emirat-2022-08-10-11-55-18-utc_2_mija1p.mp4',
  'https://res.cloudinary.com/dboza0n1a/video/upload/v1715440849/aerial-view-of-sheikh-zayed-road-dubai-united-ar-2022-08-10-10-11-31-utc_1_patftm.mp4',
  'https://res.cloudinary.com/dboza0n1a/video/upload/v1715440842/cityscape_i4jpse.mp4',
  'https://res.cloudinary.com/dboza0n1a/video/upload/v1715440839/aerial-view-of-dubai-frame-landmark-during-the-sun-2022-08-04-10-57-29-utc_2_tstge9.mp4',
  'https://res.cloudinary.com/dboza0n1a/video/upload/v1715440830/aerial-hyperlapse-of-dubai-skyscrapers-during-scen-2022-08-04-10-57-54-utc_1_ccdl8q.mp4',
];

export const Navbar = ({ className }) => {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(
        'fixed top-5 inset-x-0 max-w-2xl mx-auto z-50 backdrop-blur-sm',
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#">Home</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Properties">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem title="Type" href="#" src="" description="Type" />
            <ProductItem title="Writer" href="#" src="" description="Writer" />
            <ProductItem title="101" href="#" src="" description="101" />
            <ProductItem title="404" href="#" src="" description="404" />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#">Our Team</HoveredLink>
            <HoveredLink href="/contact">Contact</HoveredLink>
            <HoveredLink href="#">About Us</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

const HeroSection = () => {
  const ref = useRef();
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['start start', 'end start'],
  // });
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  // const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  // const translateX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [vid, setVid] = useState();

  useEffect(() => {
    setVid(vids[Math.round(Math.random() * 4)]);
    const tl = gsap.timeline();
    let movementFactor = 0.8; // controls how much the backgrounds move. It's a percentage of the section's height. This can be negative if you want to move in the other direction.

    tl.fromTo(
      '.hero-dynasty-title',
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.5,
        ease: 'none',
      }
    )
      .fromTo(
        '.hero-sub-title-cover',
        {
          x: -100,
        },
        {
          x: 100,
          duration: 1.5,
        },
        0.5
      )
      .fromTo(
        '.hero-dynasty-sub-title',
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        0.9
      );

    gsap.fromTo(
      '.hero-title-container',
      { opacity: 1, scale: 1 },
      {
        movementFactor: movementFactor,
        scale: 1.2,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-title-container',
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      '.hero-dynasty-video',
      {
        scale: 1,
      },
      {
        movementFactor: movementFactor,
        scale: 1.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-title-container',
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="relative w-screen h-screen z-[1] overflow-hidden" ref={ref}>
      <video
        autoPlay
        loop
        muted
        preload="none"
        className="object-cover hero-dynasty-video bg-black w-screen h-[110vh]"
      >
        {vid && <source src={vid}></source>}
      </video>
      <div className="overlay bg-[#1a1a1a6c] absolute top-0 w-screen h-[120vh] flex justify-center items-center">
        <div className="absolute top-[45%] right-[50%] translate-x-[50%] -translate-y-[50%]">
          <div className=" flex items-end hero-title-container">
            <h2 className="text-5xl md:text-7xl revamp-font text-white hero-dynasty-title opacity-0">
              DYNASTY
            </h2>
            <div className="relative w-fit overflow-hidden">
              <h2 className="hero-dynasty-sub-title w-fit whitespace-nowrap revamp-font-titi text-xs text-1xl text-white opacity-0">
                Real Estate
              </h2>
              <span className="hero-sub-title-cover absolute bg-white w-full h-full left-0 top-0 -translate-x-[100%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Properties = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    await fetch('/dummy/data.json')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  };
  const swiperRef = useRef();

  const ButtonGroup = () => {
    return (
      <div className="carousel-button-group w-[70px] absolute flex justify-between z-[1] right-[5%] top-[10%] cursor-pointer">
        <IconChevronLeft
          color="white"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <IconChevronRight
          color="white"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center z-[2] h-[80vh] bg-dark">
      <div className="bg-gradient-to-t from-[#13131a] from-[80%] absolute -top-20 left-0 right-0 bottom-[50%] z-1"></div>
      <h1 className="text-white revamp-font-titi text-[30px] mb-10">
        View Listings
      </h1>
      <Swiper
        mousewheel={true}
        autoplay={{
          delay: 1800,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Mousewheel, Autoplay, Navigation]}
        breakpoints={{
          200: {
            width: 300,
            slidesPerView: 1,
            spaceBetween: 10,
          },
          800: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1024: {
            width: 1350,
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        onMouseOver={() => swiperRef.current.autoplay.start()}
        onMouseLeave={() => swiperRef.current.autoplay.start()}
        className="mySwiper transition-all duration-75"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index} className="cursor-pointer">
              <BentoGridItem
                className="carousel-item w-[300px] h-[400px] rounded-md"
                title={item.title}
                description={item.address}
                image={item.image}
                details={item.details}
              ></BentoGridItem>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ButtonGroup />
      <div className="w-full flex">
        <Link href="" className="text-white ml-auto mr-[5%] hover:underline">
          See All Listings
        </Link>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef();
  const inView = useInView(ref, {
    amount: 0.7,
    once: true,
  });

  const Title = () => {
    return (
      <motion.h1
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="md:text-5xl text-2xl text-black revamp-font-optima flex overflow-hidden"
        transition={{
          staggerChildren: 0.03,
        }}
      >
        {'Discover Our Uniqueness'.split(' ').map((item, key) => {
          return (
            <span key={key} className="mr-3 flex">
              {item.split('').map((it, ke) => {
                return (
                  <motion.span
                    key={ke}
                    variants={defaultAnimtion}
                    className="inline-block"
                  >
                    {it}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </motion.h1>
    );
  };

  return (
    <div
      className="w-screen min-h-screen p-10 flex flex-wrap items-center bg-offwhite"
      ref={ref}
    >
      <div className="md:w-[50%] w-full h-[100%] flex items-center justify-center">
        <motion.figure
          className="relative w-full h-[200px] md:w-[600px] md:h-[400px]"
          initial={{
            translateX: '-100px',
            opacity: 0,
          }}
          whileInView={{
            translateX: 0,
            opacity: 1,
          }}
          transition={{
            type: 'tween',
          }}
          viewport={{
            amount: 0.7,
            once: true,
          }}
        >
          <Image src={staff} alt="sad" fill sizes="100%" />
        </motion.figure>
      </div>
      <div className="md:w-[50%] w-full flex justify-center items-center">
        <div className=" md:w-[80%] flex flex-col justify-center items-center">
          <div className="w-full">
            <Title></Title>
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="md:text-[16px] text-[13px] w-[100%] text-black revamp-font-titi">
              With a distinguished presence spanning over 5 years in the UAE
              Real Estate market, Dynasty Real Estate stands as a foremost
              brokerage firm in Dubai. Our esteemed standing is a testament to
              our unwavering dedication and the favorable results we
              consistently deliver to our clients, facilitated by a team of
              highly skilled, professional, and multilingual real estate agents.
              While initially excelling in the off-plan, resale, and rental
              sectors, Dynasty Real Estate has since evolved and broadened its
              scope.
            </p>
          </div>
          <div className="w-full my-5">
            <button className="md:text-[16px] text-[13px] px-8 py-2 bg-blue-500 text-white revamp-font-titi transition duration-200 hover:bg-white hover:text-black border-[1px] border-transparent hover:border-blue-500">
              Meet The Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AwardWinning = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      gsap.fromTo(
        '.dynasty-award figure',
        {
          y: -100,
        },
        {
          movementFactor: 1,
          y: 100,
          scrollTrigger: {
            trigger: '.dynasty-real-estate',
            start: 'top center',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
    setIsLoading(true);
  }, [isLoading]);

  return (
    <div className="dynasty-award relative overflow-hidden h-[40vh] flex items-center justify-center">
      <figure className="absolute -top-[100%] md:-top-[150%] -left-[50%] -right-[50%] md:left-0 md:right-0 -bottom-[100%] md:-bottom-[150%] flex items-center justify-center">
        <Image src={canal} alt="" fill objectFit="cover" />
      </figure>
      <div className="relative flex flex-col items-center justify-center z-1 backdrop-blur-[2px] p-5 rounded-md">
        <h1 className="md:text-5xl text-1xl revamp-font-optima text-white">
          Award Winning Real Estate Agency
        </h1>

        <p className="md:text-[16px] text-[13px] revamp-font-titi text-white">
          We Take Pride In Our Diversity
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="revamp-font-optima h-[70vh] bg-[#13131a] text-white flex flex-col items-center justify-center">
      <div className="my-5">
        <h1 className="revamp-font-optima md:text-5xl text-2xl">
          Testimonials
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Swiper
          mousewheel={true}
          autoplay={{
            delay: 1800,
          }}
          modules={[Mousewheel, Autoplay]}
          style={{
            '.swiperWrapper': {
              width: '100%',
            },
          }}
          className="mySwiper transition-all duration-75 !w-[90%] sm:!w-[80%]"
        >
          {testimonials.map((item, index) => {
            return (
              <SwiperSlide key={index} className="cursor-pointer !w-[100%] p-5">
                <div className="">
                  <p className="md:text-[16px] text-[13px]">{item.para}</p>
                  <div className="my-5">
                    <p className="md:text-[16px] text-[13px]">- {item.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

const Contact = () => {
  useEffect(() => {
    const contactEffect = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.dynasty-contact-container',
          start: '60% bottom',
        },
      });

      const ourText = new SplitType('.dynasty-contact-inside h1', {
        type: 'chars',
      });

      tl.fromTo(
        ourText.chars,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.01,
          duration: 1.5,
          ease: 'power4.out',
        },
        0.5
      );

      const ourPara = new SplitType('.dynasty-contact-para');

      tl.fromTo(
        ourPara.lines,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          duration: 0.7,
          ease: 'power4.out',
        },
        0.5
      );

      tl.fromTo(
        '.dynasty-contact-email',
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          duration: 0.7,
          ease: 'power4.out',
        },
        0.5
      ).fromTo(
        '.dynasty-contact-number',
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          duration: 0.7,
          ease: 'power4.out',
        },
        0.5
      );
    };

    const el1 = document.querySelectorAll('.first-row figure');
    const el2 = document.querySelectorAll('.second-row figure');
    const el3 = document.querySelectorAll('.third-row figure');

    for (let index = 0; index < el1.length; index++) {
      const element = el1[index];
      gsap.fromTo(
        element,
        {
          x: -800,
        },
        {
          x: 0,
          scrollTrigger: {
            trigger: '.dynasty-real-estate',
            start: 'top top',
            bottom: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    for (let index = 0; index < el2.length; index++) {
      const element = el2[index];
      gsap.fromTo(
        element,
        {
          x: 800,
        },
        {
          x: 0,
          scrollTrigger: {
            trigger: '.dynasty-real-estate',
            start: 'top top',
            bottom: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    for (let index = 0; index < el3.length; index++) {
      const element = el3[index];
      gsap.fromTo(
        element,
        {
          x: -800,
        },
        {
          x: 0,
          scrollTrigger: {
            trigger: '.dynasty-real-estate',
            start: 'top top',
            bottom: 'bottom top',
            scrub: true,
          },
        }
      );
    }
    contactEffect();
  }, []);
  return (
    <div className="dynasty-contact-container w-screen h-[100vh] md:h-auto bg-offwhite overflow-hidden flex justify-center items-center">
      <div className="dynasty-contact w-full h-full flex items-center justify-center z-[10]">
        <div className="dynasty-contact-inside relative h-[60%] w-[80%] bg-offwhite">
          <div className="m-5 h-full flex flex-col justify-center">
            <div>
              <h1 className="revamp-font-optima text-[25px] md:text-[30px] overflow-hidden">
                Ready To Find Your Dream Property?
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="revamp-font-titi dynasty-contact-para text-[10px] md:text-[15px]">
                Whether you&apos;re a first-time buyer seeking a seamless
                experience, looking for a family-friendly home in a vibrant
                community, or aiming to unlock smart investments with
                cutting-edge properties that maximize your returns, our team of
                experts is here to guide you every step of the way.
              </p>
              <p className="revamp-font-titi  dynasty-contact-email text-[10px] md:text-[15px]">
                Our Email -
                <span className="text-blue-500 text-[10px] md:text-[15px]">
                  hello@dynastyrealestate.ae
                </span>
              </p>

              <p className="revamp-font-titi dynasty-contact-number block text-[10px] md:text-[15px] pr-5">
                Direct Line -
                <span className="text-blue-500 text-[10px] md:text-[15px]">
                  58 599 3405 (Calls & WhatApp)
                </span>
              </p>
            </div>
            <div className="my-5">
              <button className="px-8 py-2 bg-blue-500 text-white revamp-font-titi transition duration-200 hover:bg-white hover:text-black border-[1px] border-transparent hover:border-blue-500 text-[10px] md:text-[20px]">
                Connect with Us
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="md:w-[40%] h-full w-full absolute md:relative overflow-hidden flex flex-col items-center justify-center"
        id="dynasty-advantages-wrapper"
      >
        <div className="flex justify-center overflow-hidden w-fit dynasty-advantages-images first-row">
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB10-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[300px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0001.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[300px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0002.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[300px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB11-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[300px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0006.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[300px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB12-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[300px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0004.jpg"
            />
          </figure>
        </div>

        <div className="flex justify-center overflow-hidden w-fit dynasty-advantages-images second-row">
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0002.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0001.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0004.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB10-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB11-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB12-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0006.jpg"
            />
          </figure>
        </div>

        <div className="flex justify-center overflow-hidden w-fit dynasty-advantages-images third-row">
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB10-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0001.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0002.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0006.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB12-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/SB11-01-01.jpg"
            />
          </figure>
          <figure className="dynasty-contact-image relative w-[350px] h-[200px]">
            <Image
              alt=""
              fill
              className="w-full h-full"
              src="/images/adv/IMG-20240505-WA0004.jpg"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

const Partners = () => {
  return (
    <div className="h-[30vh] md:h-[50vh] w-full flex flex-col items-center justify-center p-5 bg-offwhite">
      <div className="w-[80%] h-full flex flex-col items-center justify-center">
        <h1 className="revamp-font-optima md:text-5xl text-2xl">
          OUR PARTNERS
        </h1>
        <p className="revamp-font-titi md:text-[16px] text-[13px]">
          Collaborating with Excellence.
        </p>
      </div>
      <div className="flex w-full h-[200px]">
        <Swiper
          mousewheel={true}
          autoplay={{
            delay: 1800,
          }}
          modules={[Mousewheel, Autoplay]}
          breakpoints={{
            200: {
              width: 350,
              slidesPerView: 2,
              spaceBetween: 40,
            },
            800: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            1024: {
              width: 1350,
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className="mySwiper transition-all duration-75"
        >
          {partners.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <figure className="relative w-[200px] h-[100px]">
                  <Image
                    src={image}
                    alt=""
                    objectFit="contain"
                    fill
                    sizes="100%"
                    className="mix-blend-multiply"
                  />
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="min-h-[60vh] flex justify-center items-center md:p-0 py-[40px] bg-[var(--bg)]">
      <div className="w-[80%] md:h-[40%] h-full flex flex-wrap">
        <div className="flex flex-wrap md:w-[80%] w-full h-[100%]">
          <div className="md:w-[50%] w-full h-[100%] my-5">
            <h1 className="text-[20px] my-5 revamp-font-optima text-white">
              Head Office
            </h1>
            <div className="h-[90%] flex flex-col justify-evenly">
              <div className="flex my-3 items-center">
                <div className="p-5">
                  <IconLocation color="white" />
                </div>
                <div>
                  <p className="text-white revamp-font-optima">Address</p>
                  <p className="md:text-[16px] text-[13px] revamp-font-titi text-white">
                    The Burlington Tower Business Bay, Marasi Drive Dubai -UAE
                  </p>
                </div>
              </div>
              <div className="flex my-3 items-center">
                <div className="p-5">
                  <IconPhone color="white" />
                </div>
                <div>
                  <div>
                    <p className="text-white revamp-font-optima">Phone</p>
                    <p className="md:text-[16px] text-[13px] text-white revamp-font-titi">
                      04 584 6450
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-[50%] w-full h-[100%] my-5">
            <h1 className="text-[20px] revamp-font-optima text-white">
              Motor City Branch
            </h1>
            <div className="h-[90%] flex flex-col justify-evenly">
              <div className="flex my-3 items-center">
                <div className="p-5">
                  <IconLocation color="white" />
                </div>
                <div>
                  <p className="text-white revamp-font-optima">Address</p>
                  <p className="md:text-[16px] text-[13px] text-white revamp-font-titi">
                    Kojak Group Building, Moto City, Dubai-UAE
                  </p>
                </div>
              </div>
              <div className="flex my-3 items-center">
                <div className="p-5">
                  <IconPhone color="white" />
                </div>
                <div>
                  <div>
                    <p className="text-white revamp-font-optima">Phone</p>
                    <p className="md:text-[16px] text-[13px] text-white revamp-font-titi">
                      04 585 7158
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:my-0 my-5  md:w-[20%] h-[100%]">
          <div>
            <h1 className="text-[20px] text-white revamp-font-optima">
              Explore
            </h1>
          </div>
          <div className="flex flex-col">
            <motion.a
              href=""
              className="
              md:text-[16px] text-[13px]
                      block py-2 w-[200px] cursor-pointer hover:ml-2 transition-all
                      after:block after:content-[''] after:w-[0px] after:bg-white after:bottom-0 after:left-0 after:h-[1px] hover:after:w-[200px] after:transition-all
                      after:duration-200 text-white revamp-font-optima"
            >
              About
            </motion.a>
            <motion.a
              href=""
              className="
              md:text-[16px] text-[13px]
                      block py-2 w-[200px] cursor-pointer hover:ml-2 transition-all
                      after:block after:content-[''] after:w-[0px] after:bg-white after:bottom-0 after:left-0 after:h-[1px] hover:after:w-[200px] after:transition-all
                      after:duration-200 text-white revamp-font-optima text-sm"
            >
              Apartments
            </motion.a>
            <motion.a
              href=""
              className="
              md:text-[16px] text-[13px]
                      block py-2 w-[200px] cursor-pointer hover:ml-2 transition-all
                      after:block after:content-[''] after:w-[0px] after:bg-white after:bottom-0 after:left-0 after:h-[1px] hover:after:w-[200px] after:transition-all
                      after:duration-200 text-white revamp-font-optima text-sm"
            >
              Our Services
            </motion.a>
            <motion.a
              href=""
              className="
              md:text-[16px] text-[13px]
                      block py-2 w-[200px] cursor-pointer hover:ml-2 transition-all
                      after:block after:content-[''] after:w-[0px] after:bg-white after:bottom-0 after:left-0 after:h-[1px] hover:after:w-[200px] after:transition-all
                      after:duration-200 text-white revamp-font-optima text-sm"
            >
              Blog
            </motion.a>
            <motion.a
              href=""
              className="
              md:text-[16px] text-[13px]
                      block py-2 w-[200px] cursor-pointer hover:ml-2 transition-all
                      after:block after:content-[''] after:w-[0px] after:bg-white after:bottom-0 after:left-0 after:h-[1px] hover:after:w-[200px] after:transition-all
                      after:duration-200 text-white revamp-font-optima text-sm"
            >
              Team
            </motion.a>
            <motion.a
              href=""
              className="
              md:text-[16px] text-[13px]
                      block py-2 w-[200px] cursor-pointer hover:ml-2 transition-all
                      after:block after:content-[''] after:w-[0px] after:bg-white after:bottom-0 after:left-0 after:h-[1px] hover:after:w-[200px] after:transition-all
                      after:duration-200 text-white revamp-font-optima text-sm"
            >
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="dynasty-real-estate">
      {/* <Navbar /> */}
      <HeroSection />
      <Properties />
      <AboutSection />
      <AwardWinning />
      <Testimonials />
      <Contact />
      <Partners />
      <Footer />
      {/* <Advantages /> */}
    </main>
  );
}
