"use client";

import { Hash, Search } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Subreddit {
  name: string;
  members: number;
  description: string;
}

interface Account {
  username: string;
  karma: number;
  avatar: string;
}

interface SearchResult {
  subreddits: Subreddit[];
  accounts: Account[];
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult>({
    subreddits: [],
    accounts: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const mockSubreddits: Subreddit[] = [
    {
      name: "programming",
      members: 4200000,
      description: "Computer programming",
    },
    { name: "webdev", members: 1800000, description: "Web development" },
    {
      name: "reactjs",
      members: 850000,
      description: "React JavaScript library",
    },
    {
      name: "javascript",
      members: 2100000,
      description: "JavaScript programming language",
    },
    {
      name: "Python",
      members: 3900000,
      description: "Python programming language",
    },
    {
      name: "technology",
      members: 8500000,
      description: "Latest tech news and discussions",
    },
  ];

  const mockAccounts: Account[] = [
    { username: "techguru42", karma: 125000, avatar: "👨‍💻" },
    { username: "codemaster", karma: 89000, avatar: "🧑‍💼" },
    { username: "webdev_pro", karma: 156000, avatar: "👩‍💻" },
    { username: "pythonista", karma: 203000, avatar: "🐍" },
    { username: "jsexpert", karma: 112000, avatar: "⚡" },
    { username: "reactninja", karma: 94000, avatar: "⚛️" },
  ];

  const searchResults = (searchQuery: string): SearchResult => {
    if (!searchQuery.trim()) {
      return { subreddits: [], accounts: [] };
    }

    const filteredSubreddits = mockSubreddits
      .filter(
        (sub) =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 3);

    const filteredAccounts = mockAccounts
      .filter((account) =>
        account.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 3);

    return { subreddits: filteredSubreddits, accounts: filteredAccounts };
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1); // Reset selection when typing

    if (value.trim()) {
      setResults(searchResults(value));
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        // Simulate redirect to search page
        const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
        console.log("Redirecting to:", searchUrl);
        alert(`Would redirect to: ${searchUrl}`);
        setIsOpen(false);
      }
      return;
    }

    const totalItems =
      results.subreddits.length +
      results.accounts.length +
      (query.trim() ? 1 : 0);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % totalItems);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelection(selectedIndex);
        } else if (query.trim()) {
          // No selection, do search
          const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
          console.log("Redirecting to:", searchUrl);
          alert(`Would redirect to: ${searchUrl}`);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelection = (index: number) => {
    const subredditCount = results.subreddits.length;
    const accountCount = results.accounts.length;

    if (index < subredditCount) {
      // Selected a subreddit
      const subreddit = results.subreddits[index];
      handleSubredditClick(subreddit.name);
    } else if (index < subredditCount + accountCount) {
      // Selected an account
      const account = results.accounts[index - subredditCount];
      handleAccountClick(account.username);
    } else {
      // Selected search option
      const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
      console.log("Searching for:", searchUrl);
      alert(`Would search for: ${query.trim()}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleSubredditClick = (subredditName: string) => {
    const url = `/r/${subredditName}`;
    console.log("Navigating to subreddit:", url);
    alert(`Would navigate to: ${url}`);
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleAccountClick = (username: string) => {
    const url = `/u/${username}`;
    console.log("Navigating to user:", url);
    alert(`Would navigate to: ${url}`);
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Reddit"
          className="w-full h-10 pl-10 pr-4 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen &&
        (query.trim() ||
          results.subreddits.length > 0 ||
          results.accounts.length > 0) && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md z-50 max-h-96 overflow-y-auto"
          >
            {/* Subreddits Section */}
            {results.subreddits.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Communities
                </div>
                {results.subreddits.map((subreddit, index) => (
                  <button
                    key={subreddit.name}
                    data-index={index}
                    onClick={() => handleSubredditClick(subreddit.name)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left ${
                      selectedIndex === index
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full text-white text-sm font-bold">
                      <Hash className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">
                        r/{subreddit.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {formatNumber(subreddit.members)} members •{" "}
                        {subreddit.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Accounts Section */}
            {results.accounts.length > 0 && (
              <div className="p-2 border-t border-border">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  People
                </div>
                {results.accounts.map((account, index) => {
                  const globalIndex = results.subreddits.length + index;
                  return (
                    <button
                      key={account.username}
                      data-index={globalIndex}
                      onClick={() => handleAccountClick(account.username)}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left ${
                        selectedIndex === globalIndex
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white text-sm">
                        {account.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          u/{account.username}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatNumber(account.karma)} karma
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Search Option */}
            {query.trim() && (
              <div className="p-2 border-t border-border">
                <button
                  data-index={
                    results.subreddits.length + results.accounts.length
                  }
                  onClick={() => {
                    const searchUrl = `/search?q=${encodeURIComponent(
                      query.trim()
                    )}`;
                    console.log("Searching for:", searchUrl);
                    alert(`Would search for: ${query.trim()}`);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left ${
                    selectedIndex ===
                    results.subreddits.length + results.accounts.length
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full text-white">
                    <Search className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">
                      Search for &quot;{query}&quot;
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Press Enter or click to search
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* No Results */}
            {query.trim() &&
              results.subreddits.length === 0 &&
              results.accounts.length === 0 && (
                <div className="p-4 text-center text-muted-foreground text-sm">
                  No communities or people found for &quot;{query}&quot;
                </div>
              )}
          </div>
        )}
    </div>
  );
};

export default SearchBar;
