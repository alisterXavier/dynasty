'use client';
import { useEffect } from 'react';
import React from 'react';
import { Label } from '@/src/components/label';
import { Input, TextArea } from '@/src/components/input';
import { Tabs } from '@/src/components/tabs';
import { cn } from '@/utils/cn';
import { Footer, Navbar } from '../page';

export function TabsDemo() {
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
            referrerpolicy="no-referrer-when-downgrade"
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
            referrerpolicy="no-referrer-when-downgrade"
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

export function SignupFormDemo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };
  return (
    <div className="max-w-md w-full rounded-none p-4 md:p-8 shadow-input bg-darkButNotBlack">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Adolf" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Hitler" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="a.hitler@dynasty.ae" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Message</Label>
          <TextArea id="message" placeholder="Type" type="email" />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
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
  useEffect(() => {}, []);
  return (
    <div className="contact">
      <div className="min-h-screen">
        <div className="flex flex-wrap min-h-screen">
          <div className="w-full md:w-[50%] flex flex-col justify-end px-10 bg-darkButNotBlack">
            <h2 className="font-bold revamp-font-optima text-5xl text-offwhite">
              Contact Us
            </h2>
            <SignupFormDemo />
          </div>
          <div className="w-full my-10 md:my-0 md:w-[50%] flex items-end">
            <TabsDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
