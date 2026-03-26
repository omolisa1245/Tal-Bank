import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const countries = [
  { name: "Nigeria", code: "+234", flag: "https://flagcdn.com/w40/ng.png" },
  { name: "United States", code: "+1", flag: "https://flagcdn.com/w40/us.png" },
  { name: "United Kingdom", code: "+44", flag: "https://flagcdn.com/w40/gb.png" },
  { name: "India", code: "+91", flag: "https://flagcdn.com/w40/in.png" },
  { name: "Ghana", code: "+233", flag: "https://flagcdn.com/w40/gh.png" },
];

const PhoneInput = ({ value, onChange }) => {

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [open, setOpen] = useState(false);

  const handlePhoneChange = (e) => {

    const number = e.target.value;

    // send full phone number to parent
    onChange(selectedCountry.code + number);

  };

  return (
    <div className="w-full relative">

      <div className="flex items-center bg-gray-100 rounded-xl px-3 py-3">

        {/* Country selector */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer border-r pr-3"
        >
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="w-6 h-4 object-cover rounded-sm"
          />
          <span className="text-sm">{selectedCountry.code}</span>
          <IoChevronDown className="text-gray-500" />
        </div>

        {/* Phone Input */}
        <input
          type="tel"
          placeholder="Enter phone number"
          value={value.replace(selectedCountry.code, "")}
          onChange={handlePhoneChange}
          className="flex-1 ml-3 bg-transparent outline-none"
        />

      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full bg-white shadow-lg rounded-xl mt-2 max-h-60 overflow-y-auto z-50">

          {countries.map((country, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCountry(country);
                setOpen(false);
              }}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >

              <div className="flex items-center gap-3">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-6 h-4 object-cover rounded-sm"
                />
                <span>{country.name}</span>
              </div>

              <span className="text-gray-500">{country.code}</span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default PhoneInput;