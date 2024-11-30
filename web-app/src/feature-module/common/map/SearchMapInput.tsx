import React, { useState, useEffect, useRef } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../icons/SearchIcon";
import { CloseIcon } from "../../icons/CloseIcon";

type Props = {
  onSearch: (lat: number, lng: number) => void;
};

const SearchMapInput = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            searchTerm
          )}&format=json&limit=5`
        );
        const data = await response.json();
        setSuggestions(data || []);
        setDropdownVisible(data && data.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300); // Debounce user input
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleSuggestionClick = (lat: string, lon: string, displayName: string) => {
    setSearchTerm(displayName);
    setSuggestions([]);
    setDropdownVisible(false);
    onSearch(parseFloat(lat), parseFloat(lon));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetSearchField = () => {
    setSearchTerm("");
    setSuggestions([]);
    setDropdownVisible(false);
  };

  return (
    <div className="relative flex">
      <Input
        placeholder="Search location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        radius="none"
        className="w-full border"
        variant="bordered"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            setDropdownVisible(false);
          }
        }}
        startContent={<SearchIcon className="text-gray-500" />}
        endContent={
          searchTerm && (
            <button
              type="button"
              onClick={resetSearchField}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <CloseIcon className="w-4 h-4" /> {/* Replace with your reset icon */}
            </button>
          )
        }
      />

      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-[1000] text-slate-700"
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleSuggestionClick(
                    suggestion.lat,
                    suggestion.lon,
                    suggestion.display_name
                  )
                }
              >
                {suggestion.display_name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMapInput;
