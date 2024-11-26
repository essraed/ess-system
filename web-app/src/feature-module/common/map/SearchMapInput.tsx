import React, { useState } from 'react'
import { Button, Input } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { SearchIcon } from '../../icons/SearchIcon';

type Props = {
    onSearch: (lat: number, lng: number) => void
}

const SearchMapInput = ({ onSearch }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
      if (!searchTerm.trim()) return;
  
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            searchTerm
          )}&format=json&limit=1`
        );
        const data = await response.json();
  
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          onSearch(parseFloat(lat), parseFloat(lon));
        } else {
          toast.error("Location not found");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        toast.error("Error fetching location");
      }
    };
  
    return (
      <div className="flex ">
        <Input
          placeholder="Search location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          radius="none"
          className="w-full border"
          variant="bordered"
          startContent={<SearchIcon className="text-gray-500" />}
        />
        <Button onClick={handleSearch} radius='none' color='primary'>
          Search
        </Button>
      </div>
    );
}

export default SearchMapInput