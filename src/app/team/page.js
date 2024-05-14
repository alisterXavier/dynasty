'use client';
import { HoverEffect } from '@/src/components/cards';
import { StaggerText } from '@/src/components/textStagger';
import gsap from 'gsap';
import { useEffect } from 'react';

const team = [
  {
    name: 'Naveen Ayani',
    image: '/images/team/naveen.png',
    designation: 'Chief Executive Officer',
  },
  {
    name: 'Sachin Ayani',
    image: '/images/team/sachin.png',
    designation: 'Managing Director',
  },
  {
    name: 'Ricardo Agnazata III',
    image: '/images/team/ricardo.png',
    designation: 'Administrator',
  },
  {
    name: 'Edgar Dsouza',
    image: '/images/team/edgar.png',
    designation: 'Marketing Executive',
  },
  {
    name: 'Jitesh Laxman Das',
    image: '/images/team/jitesh.png',
    designation: 'Senior Property Consultant',
  },
  {
    name: 'Sahil Shaikh',
    image: '/images/team/sahil.png',
    designation: 'Senior Property Consultant',
  },
  {
    name: 'Alisha Ayyaz Shums',
    image: '/images/team/alisha.png',
    designation: 'Senior Property Consultant',
  },
  {
    name: 'Aida Kechiche Mokadem',
    image: '/images/team/aida.png',
    designation: 'Client Property Consultant',
  },
  {
    name: 'Harpreet Kaur',
    image: '/images/team/harpreet.png',
    designation: 'Property Consultant',
  },
  {
    name: 'Inga Tian',
    image: '/images/team/inga.png',
    designation: 'Property Consultant',
  },
  {
    name: 'Zenith Lasquites',
    image: '/images/team/zenith.png',
    designation: 'Property Consultant',
  },
  {
    name: 'Sadaf Jalilvand',
    image: '/images/team/sadaf.png',
    designation: 'Property Consultant',
  },
  {
    name: 'Wael Muwaffaq Al Jazaeri',
    image: '/images/team/wael.png',
    designation: 'Property Consultant',
  },
  {
    name: 'Saqlain Shaukat',
    image: '/images/team/saqlain.png',
    designation: 'Property Consultant',
  },
];

const Team = () => {
  useEffect(() => {
    gsap.fromTo(
      '.card-effect',
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
      }
    );
  }, []);
  return (
    <div className="dynasty-team min-h-screen px-10 py-[15vh] bg-offwhite">
      <div>
        <StaggerText
          text="Our Team"
          start="top 10%"
          parent={'.dynasty-team'}
          className="stagger-text text-4xl revamp-font-optima"
        />
      </div>
      <div className="w-[95%]">
        <HoverEffect items={team} className={'hover-cards'} />
      </div>
    </div>
  );
};

export default Team;
