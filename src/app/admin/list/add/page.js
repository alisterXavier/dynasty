'use client';
import { Input, TextArea } from '@/src/components/input';
import { LabelInputContainer } from '../../page';
import { Label } from '@/src/components/label';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';

const Add = () => {
  const [uploadedPropertyFiles, setPropertyFiles] = useState([]);
  const [uploadedFlooringFiles, setFlooringFiles] = useState([]);

  const handlePropertyFiles = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const uploaded = [...uploadedPropertyFiles];
    chosenFiles.some((file) => {
      uploaded.push(file);
    });
    setPropertyFiles(uploaded);
  };
  const handleFlooringFiles = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const uploaded = [...uploadedFlooringFiles];
    chosenFiles.some((file) => {
      uploaded.push(file);
    });
    setFlooringFiles(uploaded);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const property_title = event.target.querySelector('#title').value;
    const price = event.target.querySelector('#price').value;
    const type = event.target.querySelector('#type').value;
    const property_description =
      event.target.querySelector('#description').value;
    const flooring_description = event.target.querySelector(
      '#flooring_description'
    ).value;
    const bedrooms = event.target.querySelector('#bedrooms').value;
    const bathrooms = event.target.querySelector('#bathrooms').value;
    const size = event.target.querySelector('#size').value;
    const developer = event.target.querySelector('#developer').value;
    const map = modifyIframe(event.target.querySelector('#map').value);
    const property_images = [];
    const flooring_images = [];
    const city = event.target.querySelector('#city').value;
    const address = event.target.querySelector('#address').value;
    const consultant_name =
      event.target.querySelector('#consultant_name').value;
    const consultant_designation = event.target.querySelector(
      '#consultant_designation'
    ).value;

    const propertyUploadPromises = uploadedPropertyFiles.map(
      async (file, index) => {
        const { data, error } = await supabase.storage
          .from('Dynasty')
          .upload(file.name, file);
        if (!error) {
          return `https://ehjqzwcskxkavgobabsp.supabase.co/storage/v1/object/public/Dynasty/${file.name}`; // Return the URL to push into the array
        }
      }
    );

    const flooringUploadPromises = uploadedFlooringFiles.map(
      async (file, index) => {
        const { data, error } = await supabase.storage
          .from('Dynasty')
          .upload(file.name, file);
        if (!error) {
          return `https://ehjqzwcskxkavgobabsp.supabase.co/storage/v1/object/public/Dynasty/${file.name}`;
        }
      }
    );

    // Wait for all uploads to complete
    const propertyImages = await Promise.all(propertyUploadPromises);
    const flooringImages = await Promise.all(flooringUploadPromises);

    const tempData = {
      price: price,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      title: property_title,
      size: size,
      description: property_description,
      type: type.toLocaleLowercase(),
      map: map,
      images: propertyImages,
      developer: developer,
      flooring_images: flooringImages,
      flooring_description: flooring_description,
      location: {
        city: city,
        address: address,
      },
      consultant: {
        name: consultant_name,
        designation: consultant_designation,
      },
      //   status: status,

      //   amenities: [
      //     {
      //       title: 'string',
      //       text: 'string',
      //     },
      //   ],
    };
    console.log(tempData);
    try {
      const { error } = await supabase.from('Properties').insert(tempData);
      console.log(error);
    } catch (err) {
      console.log(err);
    }
  };

  const modifyIframe = (iframeString) => {
    // Remove the 'style' attribute
    let modifiedString = iframeString.replace(/style="[^"]*"/, '');

    // Change 'width' attribute to "100%"
    modifiedString = modifiedString.replace(/width="[^"]*"/, 'width="100%"');

    // Change 'height' attribute to "100%"
    modifiedString = modifiedString.replace(/height="[^"]*"/, 'height="100%"');

    return modifiedString;
  };

  return (
    <div className="min-h-screen flex justify-center pt-[10vh] bg-offwhite">
      <form className="w-full md:w-[60%] p-5 bg-white" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3">
          <LabelInputContainer className="mb-4 col-span-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="2 Apartments"
              type="text"
              className=""
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 col-span-1">
            <Label htmlFor="price">Price</Label>
            <Input id="price" placeholder="0" type="number" className="" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 col-span-1">
            <Label htmlFor="type">Type</Label>
            <Input id="type" placeholder="Luxury" type="text" className="" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 col-span-3">
            <Label htmlFor="description">Property Description</Label>
            <TextArea
              id="description"
              placeholder="Type"
              type="text"
              className=""
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 col-span-3">
            <Label htmlFor="flooring_description">Flooring Description</Label>
            <TextArea
              id="flooring_description"
              placeholder="Type"
              type="text"
              className=""
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" placeholder="0" type="number" className="" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" placeholder="0" type="number" className="" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="size">Size</Label>
            <Input id="size" placeholder="0" type="number" className="" />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="developer">Developer</Label>
            <Input
              id="developer"
              placeholder="Emaar"
              type="text"
              className=""
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="property_images">Property Images</Label>
            <Input
              multiple={true}
              id="property_images"
              placeholder="Images"
              type="file"
              className=""
              onChange={handlePropertyFiles}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 col-span-1">
            <Label htmlFor="flooring_images">Flooring Images</Label>
            <Input
              id="flooring_images"
              placeholder="Images"
              type="file"
              className=""
              multiple={true}
              onChange={handleFlooringFiles}
            />
          </LabelInputContainer>
        </div>
        <div className="">
          <h2 className="text-xl my-5">Location</h2>
          <div className="flex">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Dubai" type="text" className="" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Palm Jumeirah"
                type="text"
                className=""
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="map">Map</Label>
              <Input
                id="map"
                placeholder="Copy and paste the iframe from google maps"
                type="text"
                className=""
              />
            </LabelInputContainer>
          </div>
        </div>
        <div>
          <h2 className="text-xl my-5">Amenities</h2>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="amenities">Title</Label>
            <Input id="amenities" placeholder="Pool" type="text" className="" />
          </LabelInputContainer>
        </div>
        <div>
          <h2 className="text-xl my-5">Property Seller</h2>
          <div className="flex">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="consultant_name">Consultant Name</Label>
              <Input
                id="consultant_name"
                placeholder="Cactus"
                type="text"
                className=""
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="consultant_designation">
                Consultant Designation
              </Label>
              <Input
                id="consultant_designation"
                placeholder="Senior Property Consultant"
                type="text"
                className=""
              />
            </LabelInputContainer>
          </div>
        </div>
        <button
          className="bg-offwhite relative group/btn block  w-full text-darkButNotBlack h-10 font-medium "
          type="submit"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default Add;
