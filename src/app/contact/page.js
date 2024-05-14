'use client';
import { useEffect } from 'react';
import React from 'react';
import { Label } from '@/src/components/label';
import { Input, TextArea } from '@/src/components/input';
import { Tabs } from '@/src/components/tabs';
import { cn } from '@/utils/cn';

export function Map() {
  const tabs = [
    {
      title: 'Moto City',
      value: 'Moto City',
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl py-10 text-xl md:text-4xl font-bold text-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27191.40689947541!2d55.25960431855135!3d25.180295883508556!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f696f4b13e041%3A0xad9e6b0f66c4925c!2sDynasty%20Real%20Estate!5e0!3m2!1sen!2sbh!4v1715448722039!5m2!1sen!2sbh"
            className="absolute w-[500px] h-[200px] md:w-[600px] md:h-[450px]"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ),
    },
    {
      title: 'Business Bay',
      value: 'Business Bay',
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl py-10 text-xl md:text-4xl font-bold text-white">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2438.099928568994!2d55.233107089480676!3d25.04570172382452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6f4b2c854bfd%3A0x2d15d47e501eb972!2sKojak%20Building!5e0!3m2!1sen!2sbh!4v1715448983679!5m2!1sen!2sbh"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            className="absolute w-[500px] h-[200px] md:w-[600px] md:h-[450px]"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] px-10 md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
      <Tabs tabs={tabs} />
    </div>
  );
}

export function GetIntouch({ className, isDark, placeholder }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  return (
    <div
      className={cn(
        `rounded-none p-4 md:p-8 shadow-input ${
          isDark && 'bg-darkButNotBlack'
        }`,
        className
      )}
    >
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" isDark={isDark}>
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="John"
              type="text"
              isDark={isDark}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" isDark={isDark}>
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Doe"
              type="text"
              isDark={isDark}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" isDark={isDark}>
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="johnDoe@dynasty.ae"
            type="email"
            isDark={isDark}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" isDark={isDark}>
            Message
          </Label>
          <TextArea
            id="message"
            placeholder={placeholder ? placeholder : 'Type'}
            type="email"
            isDark={isDark}
          />
        </LabelInputContainer>
        <button
          className={` ${
            isDark
              ? 'text-white bg-zinc-800 bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900'
              : 'text-darkButNotBlack bg-offwhite'
          } block w-full rounded-sm h-10 font-medium`}
          type="submit"
        >
          Send &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

const Contact = () => {

  return (
    <div className="contact">
      <div className="min-h-screen">
        <div className="flex flex-wrap min-h-screen">
          <div className="w-full md:w-[50%] flex flex-col justify-end px-10 bg-darkButNotBlack">
            <h2 className="font-bold revamp-font-optima text-5xl text-offwhite">
              Contact Us
            </h2>
            <GetIntouch className={'max-w-md w-full'} isDark={true} />
          </div>
          <div className="w-full my-10 md:my-0 md:w-[50%] flex items-end">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
