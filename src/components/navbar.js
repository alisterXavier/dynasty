import logo from '@/public/images/logo/DYNASTY_WHITE.png';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from './navbar-components';
import { useIsAdmin, useSmallDeviceSize } from '@/utils/customHooks';
import gsap from 'gsap';

const NavbarSmall = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);
  const [isPropertiesActive, setIsPropertiesActive] = useState(false);

  const handleClick = () => {
    setIsActive(false);
  };
  const handleAbout = () => {
    setIsAboutActive(!isAboutActive);
  };
  const handleProperties = () => {
    setIsPropertiesActive(!isPropertiesActive);
  };

  return (
    <>
      <div className="fixed top-5 left-5 z-[100]">
        <input
          id="checkbox2"
          className="relative z-[100]"
          type="checkbox"
          onChange={() => {
            setIsActive(!isActive);
          }}
          checked={isActive}
        />
        <label className="toggle toggle2" htmlFor="checkbox2">
          <div id="bar4" className="bars"></div>
          <div id="bar5" className="bars"></div>
          <div id="bar6" className="bars"></div>
        </label>
      </div>
      <nav
        className={`fixed top-0 left-0 flex items-center z-[99] bg-darkButNotBlack overflow-hidden h-screen transition-all duration-300  ${
          isActive ? 'w-screen' : 'w-[0px]'
        }`}
      >
        <div className={`flex flex-col p-10 mt-20 w-screen h-screen`}>
          <div className="revamp-text-titi text-2xl my-5 text-offwhite">
            <Link href="/" onClick={handleClick}>
              Home
            </Link>
          </div>
          <div className="revamp-text-titi text-2xl my-5 text-offwhite">
            <div>
              <p onClick={handleAbout} className="">
                About
              </p>
              <div
                className={`flex flex-col ${
                  isAboutActive ? 'h-[80px]' : 'h-[0px]'
                } overflow-hidden transition-all`}
              >
                <Link
                  href="/team"
                  onClick={handleClick}
                  className="my-2 mx-5 text-lg"
                >
                  Our Team
                </Link>
                <Link
                  href="/contact"
                  onClick={handleClick}
                  className="my-2 mx-5 text-lg"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="revamp-text-titi text-2xl my-5 text-offwhite">
            <div>
              <p onClick={handleProperties} className="">
                Properties
              </p>
              <div
                className={`flex flex-col ${
                  isPropertiesActive ? 'h-[200px]' : 'h-[0px]'
                } overflow-hidden transition-all`}
              >
                <Link
                  href="/properties?type=luxury"
                  onClick={handleClick}
                  className="my-2 mx-5 text-lg"
                >
                  Luxury
                </Link>
                <Link
                  href="/properties?type=off-plans"
                  onClick={handleClick}
                  className="my-2 mx-5 text-lg"
                >
                  Off-sale
                </Link>
                <Link
                  href="/properties?type=villas"
                  onClick={handleClick}
                  className="my-2 mx-5 text-lg"
                >
                  Villas
                </Link>
                <Link
                  href="/properties?type=apartments"
                  onClick={handleClick}
                  className="my-2 mx-5 text-lg"
                >
                  Apartments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavbarLarge = ({ className }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      '.nav-large-bg',
      {
        filter: 'blur(10px)',
      },
      {
        filter: 'blur(0px)',
        background: '#13131a',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top 10%',
          scrub: true,
        },
      }
    );
  }, []);
  return (
    <div
      className={cn(
        'fixed top-0 inset-x-0 max-w-full ml-auto z-50 nav-large',
        className
      )}
    >
      <span className="nav-large-bg absolute w-screen h-[100%] top-0 left-0" />

      <Menu setActive={setActive}>
        <div className="relative w-[50px] h-[50px]">
          <HoveredLink href="/">
            <figure className="absolute w-[50px] h-[50px]">
              <Image alt="" fill src={logo} />
            </figure>
          </HoveredLink>
        </div>
        <Link className="text-offwhite p-4" href={'/'}>
          <p className="revamp-font-optima">Home</p>
        </Link>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm revamp-font-optima">
            <HoveredLink href="/team">Our Team</HoveredLink>
            <HoveredLink href="/contact">Contact</HoveredLink>
            {/* <HoveredLink href="/about">About Us</HoveredLink> */}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Properties">
          <div className="  text-sm grid grid-cols-2 gap-5 p-4">
            <ProductItem
              title="Luxury"
              href="/properties?type=luxury"
              src="/images/properties/luxury.jpg"
              description="Indulge in Spacious Apartments & Private Villas."
            />
            <ProductItem
              title="Apartments"
              href="/properties?type=apartments"
              src="/images/properties/apartment.jpeg"
              description="Own Your Dream Home Before It's Built."
            />
            <ProductItem
              title="Villas"
              href="/properties?type=villas"
              src="/images/properties/villa.jpg"
              description="Unwind in Luxury with Ample Room."
            />
            <ProductItem
              title="Off-Plans"
              href="/properties?type=off-plans"
              src="/images/properties/off-plan.jpg"
              description="Experience Ultimate Luxury & Exclusivity."
            />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

const Navbar = () => {
  const isSmallScreen = useSmallDeviceSize();
  const isAdmin = useIsAdmin();
  return isSmallScreen || isAdmin ? <NavbarSmall /> : <NavbarLarge />;
};

export default Navbar;
