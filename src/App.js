import React, { useState } from 'react';
import { MapPin, Clock, Star, Users, Car, DollarSign, Navigation, Phone, Calendar, Utensils, TreePine, Wine, Heart, Camera, Route, Search, X, Eye, PhoneCall, Plus, Sparkles } from 'lucide-react';

const RioNidoLodgeApp = () => {
  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    tripDuration: 1,
    interests: [],
    travelStyle: 'moderate',
    budget: 'moderate',
    allowAlternateDestinations: true
  });

  const [generatedItinerary, setGeneratedItinerary] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [showSignatureExperiences, setShowSignatureExperiences] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSignatureSearchModal, setShowSignatureSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [signatureSearchQuery, setSignatureSearchQuery] = useState('');
  const [selectedAnchorExperience, setSelectedAnchorExperience] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [signatureSearchResults, setSignatureSearchResults] = useState([]);
  const [selectedExperienceModal, setSelectedExperienceModal] = useState(null);

  const businesses = {
    food: [
      {
        name: "Farmhouse Inn Restaurant",
        type: "Fine Dining",
        description: "James Beard Award-winning restaurant with Michelin star, featuring hyperlocal ingredients",
        rating: 4.9,
        budget: "splurge",
        hours: "5:00 PM - 9:00 PM",
        location: "7871 River Rd, Forestville, CA",
        phone: "(707) 887-3300",
        website: "farmhouseinn.com",
        specialties: "Michelin star, hyperlocal cuisine, wine pairings"
      },
      {
        name: "Backyard",
        type: "Wine Country Bistro", 
        description: "Chef-driven neighborhood gem with garden-to-table cuisine",
        rating: 4.8,
        budget: "moderate",
        hours: "5:00 PM - 9:00 PM",
        location: "6566 Front St, Forestville, CA",
        phone: "(707) 820-8445",
        website: "backyardforestville.com",
        specialties: "Garden-to-table, local wines, seasonal menu"
      },
      {
        name: "El Barrio",
        type: "Mexican Kitchen",
        description: "Fresh Mexican flavors with local ingredients and craft cocktails",
        rating: 4.6,
        budget: "budget",
        hours: "11:00 AM - 9:00 PM", 
        location: "16632 River Rd, Guerneville, CA",
        phone: "(707) 604-7601",
        website: "elbarrioguerneville.com",
        specialties: "Fresh Mexican, craft cocktails, local ingredients"
      },
      {
        name: "Big Bottom Market",
        type: "Gourmet Market",
        description: "Famous for artisanal biscuits and gourmet provisions",
        rating: 4.7,
        budget: "moderate",
        hours: "8:00 AM - 5:00 PM",
        location: "16228 Main St, Guerneville, CA",
        phone: "(707) 604-7295", 
        website: "bigbottommarket.com",
        specialties: "Famous biscuits, gourmet provisions, local wines"
      }
    ],
    wine: [
      {
        name: "Williams Selyem",
        type: "Boutique Winery",
        description: "Cult-status Pinot Noir producer with limited production wines",
        rating: 4.9,
        budget: "splurge",
        hours: "11:00 AM - 4:00 PM",
        location: "7227 Westside Rd, Healdsburg, CA",
        phone: "(707) 433-6425",
        website: "williamsselyem.com",
        specialties: "Cult-status Pinot Noir, limited production, exclusive tastings"
      },
      {
        name: "Gary Farrell Winery", 
        type: "Hilltop Tasting Room",
        description: "Panoramic vineyard views with exceptional Russian River Valley wines",
        rating: 4.8,
        budget: "moderate",
        hours: "10:30 AM - 4:30 PM",
        location: "10701 Westside Rd, Healdsburg, CA",
        phone: "(707) 473-2900",
        website: "garyfarrellwinery.com",
        specialties: "Panoramic views, Russian River Valley wines, educational tastings"
      },
      {
        name: "Iron Horse Vineyards",
        type: "Sparkling Wine Specialist",
        description: "Historic estate known for sparkling wines served at White House dinners",
        rating: 4.8,
        budget: "moderate",
        hours: "10:00 AM - 4:30 PM",
        location: "9786 Ross Station Rd, Sebastopol, CA",
        phone: "(707) 887-1507",
        website: "ironhorsevineyards.com",
        specialties: "Sparkling wines, historic estate, White House wines"
      }
    ],
    nature: [
      {
        name: "Armstrong Redwoods State Natural Reserve",
        type: "State Park",
        description: "Ancient coastal redwood grove with peaceful hiking trails",
        rating: 4.8,
        budget: "budget", 
        hours: "8:00 AM - One hour after sunset",
        location: "17000 Armstrong Woods Rd, Guerneville, CA",
        phone: "(707) 869-2015",
        website: "parks.ca.gov",
        specialties: "Ancient redwoods, hiking trails, 1000-year-old trees"
      },
      {
        name: "Russian River",
        type: "River Recreation",
        description: "Kayaking, canoeing, swimming, and riverside relaxation",
        rating: 4.7,
        budget: "budget",
        hours: "Dawn to Dusk",
        location: "Multiple access points in Guerneville",
        phone: "Various outfitters",
        website: "visitrussianriver.com",
        specialties: "Kayaking, canoeing, swimming, riverside relaxation"
      },
      {
        name: "Goat Rock Beach",
        type: "Coastal Beach",
        description: "Rugged coastline where Russian River meets the Pacific",
        rating: 4.5,
        budget: "budget",
        hours: "Dawn to Dusk",
        location: "End of Goat Rock Rd, Jenner, CA",
        phone: "(707) 875-3483",
        website: "parks.ca.gov",
        specialties: "Rugged coastline, harbor seals, Russian River meeting Pacific"
      }
    ],
    wellness: [
      {
        name: "Osmosis Day Spa Sanctuary",
        type: "Japanese-Style Spa",
        description: "Cedar enzyme baths and meditation gardens in forest setting",
        rating: 4.8,
        budget: "splurge",
        hours: "9:00 AM - 6:00 PM",
        location: "209 Bohemian Hwy, Freestone, CA",
        phone: "(707) 823-8231",
        website: "osmosis.com", 
        specialties: "Cedar enzyme baths, meditation gardens, forest setting"
      },
      {
        name: "Yoga in the Redwoods",
        type: "Outdoor Yoga",
        description: "Morning yoga classes among ancient redwood trees",
        rating: 4.7,
        budget: "budget",
        hours: "8:00 AM - 10:00 AM",
        location: "Armstrong Redwoods, Guerneville, CA",
        phone: "(707) 869-9232",
        website: "yogainredwoods.com",
        specialties: "Outdoor yoga, redwood trees, morning classes"
      }
    ],
    culture: [
      {
        name: "Monte Rio Theater",
        type: "Historic Cinema",
        description: "1920s movie palace showing first-run films",
        rating: 4.6,
        budget: "budget",
        hours: "Showtimes vary",
        location: "20396 Bohemian Hwy, Monte Rio, CA",
        phone: "(707) 865-0913",
        website: "monteriotheatre.com",
        specialties: "1920s movie palace, first-run films, vintage setting"
      }
    ]
  };

  const signatureExperiences = [
    {
      id: "hot-air-balloon",
      name: "Russian River Hot Air Balloon",
      description: "Dawn hot air balloon flight over Russian River Valley with champagne toast",
      duration: "4 hours",
      budget: "splurge", 
      exclusivity: "Maximum 8 guests",
      bookingRequired: "1 week advance notice",
      location: "Launch from local field",
      phone: "(707) 869-0821",
      price: "275 per person",
      includes: "Hot air balloon flight, champagne toast, gourmet breakfast",
      specialties: "hot air balloon, dawn flight, champagne, Russian River Valley"
    },
    {
      id: "secret-cellar",
      name: "Secret Cellar Wine Experience",
      description: "Behind-the-scenes access to boutique winery private reserve cellar",
      duration: "3 hours",
      budget: "splurge",
      exclusivity: "Rio Nido Lodge guests only", 
      bookingRequired: "72 hours advance notice",
      location: "Private boutique winery",
      phone: "(707) 869-0821",
      price: "200 per person",
      includes: "Private cellar tour, library wines, charcuterie",
      specialties: "wine tasting, exclusive access, library wines, private cellar"
    },
    {
      id: "mushroom-foraging",
      name: "Wild Mushroom Foraging & Chef Dinner",
      description: "Guided foraging expedition followed by multi-course dinner by Michelin-trained chef",
      duration: "6 hours",
      budget: "splurge",
      exclusivity: "Maximum 6 guests",
      bookingRequired: "5 days advance notice",
      location: "Private forested area",
      phone: "(707) 869-0821",
      price: "300 per person",
      includes: "Guided foraging, chef dinner, wine pairings",
      specialties: "foraging, Michelin chef, wild mushrooms, wine pairings"
    },
    {
      id: "redwood-meditation",
      name: "Private Redwood Grove Meditation",
      description: "Dawn meditation session in secluded ancient redwood grove with coffee service",
      duration: "2 hours",
      budget: "moderate",
      exclusivity: "Maximum 8 guests",
      bookingRequired: "48 hours advance notice",
      location: "Private grove near Armstrong Redwoods",
      phone: "(707) 869-0821",
      price: "75 per person",
      includes: "Guided meditation, coffee service, pastries",
      specialties: "meditation, redwoods, dawn experience, coffee service"
    }
  ];

  const alternateDestinations = {
    "10-minute": [
      { name: "Forestville", description: "Charming downtown with antique shops", distance: "8 minutes" },
      { name: "Rio Nido", description: "Quiet riverfront community", distance: "5 minutes" }
    ],
    "20-minute": [
      { name: "Sebastopol", description: "Arts district and farmers market", distance: "18 minutes" },
      { name: "Monte Rio", description: "Historic theater and riverside dining", distance: "15 minutes" }
    ],
    "30-minute": [
      { name: "Healdsburg", description: "Wine country sophistication", distance: "25 minutes" },
      { name: "Occidental", description: "Victorian village in the redwoods", distance: "22 minutes" }
    ],
    "60-minute": [
      { name: "Jenner", description: "Dramatic coastline and sea lions", distance: "35 minutes" },
      { name: "Bodega Bay", description: "Fishing village and whale watching", distance: "45 minutes" }
    ]
  };

  const contact = {
    phone: "(707) 869-0821",
    email: "concierge@rionidolodge.com", 
    hours: "24/7 Concierge Service Available"
  };

  const interestOptions = [
    { id: 'food', label: 'Culinary Adventures', icon: Utensils, color: 'bg-orange-100 text-orange-800' },
    { id: 'wine', label: 'Wine Experiences', icon: Wine, color: 'bg-purple-100 text-purple-800' },
    { id: 'nature', label: 'Nature & Outdoors', icon: TreePine, color: 'bg-green-100 text-green-800' },
    { id: 'wellness', label: 'Wellness & Spa', icon: Heart, color: 'bg-pink-100 text-pink-800' },
    { id: 'culture', label: 'Arts & Culture', icon: Camera, color: 'bg-blue-100 text-blue-800' }
  ];

  const budgetLabels = {
    budget: { label: "Budget-Friendly", color: "text-green-600", icon: "💰" },
    moderate: { label: "Moderate", color: "text-blue-600", icon: "💰💰" },
    splurge: { label: "Luxury", color: "text-purple-600", icon: "💰💰💰" }
  };

  const getAllExperiences = () => {
    const allBusinesses = Object.values(businesses).flat();
    return [...allBusinesses, ...signatureExperiences];
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const allExperiences = getAllExperiences();
    const filtered = allExperiences.filter(item => {
      const searchTerm = query.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        (item.type && item.type.toLowerCase().includes(searchTerm)) ||
        (item.specialties && item.specialties.toLowerCase().includes(searchTerm)) ||
        (item.includes && item.includes.toLowerCase().includes(searchTerm))
      );
    });

    const budgetFiltered = filtered.filter(item => {
      if (guestData.budget === 'budget') return item.budget === 'budget';
      if (guestData.budget === 'moderate') return ['budget', 'moderate'].includes(item.budget);
      return true;
    });

    setSearchResults(budgetFiltered);
  };

  const handleSignatureSearch = (query) => {
    setSignatureSearchQuery(query);
    if (!query.trim()) {
      setSignatureSearchResults([]);
      return;
    }

    const filtered = signatureExperiences.filter(item => {
      const searchTerm = query.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        (item.specialties && item.specialties.toLowerCase().includes(searchTerm)) ||
        (item.includes && item.includes.toLowerCase().includes(searchTerm))
      );
    });

    const budgetFiltered = filtered.filter(item => {
      if (guestData.budget === 'budget') return item.budget === 'budget';
      if (guestData.budget === 'moderate') return ['budget', 'moderate'].includes(item.budget);
      return true;
    });

    setSignatureSearchResults(budgetFiltered);
  };

  const handleInterestToggle = (interestId) => {
    setGuestData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generateItinerary = () => {
    if (guestData.interests.length === 0 && !selectedAnchorExperience) {
      alert('Please select at least one interest or anchor experience to generate your itinerary.');
      return;
    }

    const days = [];
    const usedBusinesses = new Set();

    for (let day = 1; day <= guestData.tripDuration; day++) {
      const dayActivities = [];
      const activitiesPerDay = guestData.travelStyle === 'relaxed' ? 2 :
                              guestData.travelStyle === 'moderate' ? 3 : 4;

      if (day === 1 && selectedAnchorExperience) {
        dayActivities.push({
          ...selectedAnchorExperience,
          time: "Morning",
          category: "signature",
          isAnchor: true,
          alternates: guestData.allowAlternateDestinations 
            ? alternateDestinations["30-minute"] || [] 
            : []
        });
        usedBusinesses.add(selectedAnchorExperience.name);
      }

      const remainingSlots = activitiesPerDay - dayActivities.length;
      const dayInterests = [...guestData.interests];
      
      if (guestData.tripDuration > 1) {
        const rotation = (day - 1) % dayInterests.length;
        dayInterests.push(...dayInterests.splice(0, rotation));
      }

      for (let i = 0; i < remainingSlots && dayActivities.length < activitiesPerDay; i++) {
        const interest = dayInterests[i % dayInterests.length];
        const categoryBusinesses = businesses[interest] || [];
        
        const budgetFilteredBusinesses = categoryBusinesses.filter(business => {
          if (guestData.budget === 'budget') return business.budget === 'budget';
          if (guestData.budget === 'moderate') return ['budget', 'moderate'].includes(business.budget);
          return true;
        });

        const availableBusinesses = budgetFilteredBusinesses.filter(business => 
          !usedBusinesses.has(business.name)
        );

        if (availableBusinesses.length > 0) {
          const selectedBusiness = availableBusinesses[Math.floor(Math.random() * availableBusinesses.length)];
          
          const timeSlot = dayActivities.length === 0 ? "Morning" : 
                          dayActivities.length === 1 ? "Afternoon" : 
                          dayActivities.length === 2 ? "Evening" : "Late Evening";

          let alternates = [];
          if (guestData.allowAlternateDestinations) {
            alternates = alternateDestinations["30-minute"] || [];
          }

          dayActivities.push({
            ...selectedBusiness,
            time: timeSlot,
            category: interest,
            alternates: alternates.slice(0, 2)
          });
          
          usedBusinesses.add(selectedBusiness.name);
        }
      }

      days.push({
        day: day,
        activities: dayActivities
      });
    }

    setGeneratedItinerary(days);
    setCurrentDay(1);
  };

  const handlePlanAroundExperience = (experience) => {
    setSelectedAnchorExperience(experience);
    setShowSearchModal(false);
    setShowSignatureSearchModal(false);
    setSelectedExperienceModal(null);
  };

  const getBudgetIcon = (budget) => {
    return budgetLabels[budget]?.icon || "💰";
  };

  const getBudgetColor = (budget) => {
    return budgetLabels[budget]?.color || "text-gray-600";
  };

  const getGenerateButtonText = () => {
    if (selectedAnchorExperience) {
      return `Plan Day Around ${selectedAnchorExperience.name}`;
    }
    return "Create My Perfect Itinerary";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-red-50 to-orange-50 min-h-screen">
      <div className="text-center mb-8">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mr-4 shadow-lg relative">
              <div className="text-white font-bold text-xl">RN</div>
              <div className="absolute -top-1 -right-1 text-yellow-400 text-xs">★</div>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent mb-1">
                Rio Nido Lodge
              </h1>
              <p className="text-red-700 text-sm font-medium tracking-wide uppercase">
                Curated Experiences
              </p>
            </div>
          </div>
          
          <div className="h-1 w-32 bg-gradient-to-r from-red-800 to-yellow-400 mx-auto rounded-full mb-6"></div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Hyperlocal Itinerary Builder
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover authentic Russian River Valley experiences, curated exclusively for our guests. 
            From hidden gems to signature adventures, we'll craft your perfect getaway.
          </p>
        </div>

        <button
          onClick={() => setShowSearchModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 border border-blue-300"
        >
          <Search className="inline-block w-5 h-5 mr-2" />
          Search All Experiences
        </button>
      </div>

      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <Search className="w-6 h-6 mr-2 text-blue-500" />
                Search All Experiences
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by name, type, or description (e.g. 'hot air balloon', 'wine tasting', 'spa')"
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
              </div>

              <div className="max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="grid gap-4">
                    {searchResults.map((experience, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">{experience.name}</h4>
                            <p className="text-gray-600 text-sm mb-2">{experience.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className={`font-medium ${getBudgetColor(experience.budget)}`}>
                                {getBudgetIcon(experience.budget)} {budgetLabels[experience.budget]?.label}
                              </span>
                              {experience.rating && (
                                <span className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                  {experience.rating}
                                </span>
                              )}
                              {experience.duration && (
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {experience.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedExperienceModal(experience)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Learn More
                          </button>
                          <button
                            onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <PhoneCall className="w-4 h-4 mr-1" />
                            Call to Book
                          </button>
                          <button
                            onClick={() => handlePlanAroundExperience(experience)}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Plan Day Around This
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <p className="text-gray-500 text-center py-8">No experiences found matching "{searchQuery}"</p>
                ) : (
                  <p className="text-gray-500 text-center py-8">Start typing to search all experiences...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedExperienceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">{selectedExperienceModal.name}</h3>
              <button
                onClick={() => setSelectedExperienceModal(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4 leading-relaxed">{selectedExperienceModal.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  {selectedExperienceModal.duration && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{selectedExperienceModal.duration}</span>
                    </div>
                  )}
                  {selectedExperienceModal.price && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span>${selectedExperienceModal.price}</span>
                    </div>
                  )}
                  {selectedExperienceModal.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{selectedExperienceModal.location}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {selectedExperienceModal.exclusivity && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2" />
                      <span>{selectedExperienceModal.exclusivity}</span>
                    </div>
                  )}
                  {selectedExperienceModal.bookingRequired && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{selectedExperienceModal.bookingRequired}</span>
                    </div>
                  )}
                  {selectedExperienceModal.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{selectedExperienceModal.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedExperienceModal.includes && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Includes:</h4>
                  <p className="text-gray-600">{selectedExperienceModal.includes}</p>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={() => window.open(`tel:${selectedExperienceModal.phone || contact.phone}`, '_self')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Call to Book
                </button>
                <button
                  onClick={() => handlePlanAroundExperience(selectedExperienceModal)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Plan Day Around This
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSignatureExperiences && (
        <div className="bg-white rounded-xl shadow-xl border border-yellow-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
              Signature Experiences
            </h3>
            <button
              onClick={() => setShowSignatureExperiences(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {signatureExperiences.map((experience, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{experience.name}</h4>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">{experience.description}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{experience.exclusivity}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{experience.bookingRequired}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${getBudgetColor(experience.budget)}`}>
                      {getBudgetIcon(experience.budget)} {budgetLabels[experience.budget]?.label}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedExperienceModal(experience)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Learn More
                  </button>
                  <button
                    onClick={() => handlePlanAroundExperience(experience)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Plan Around This
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              All signature experiences require advance booking through our concierge team
            </p>
            <button
              onClick={() => setShowContact(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      )}

      {selectedAnchorExperience && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-amber-800">Day 1 Anchor Experience Selected</h4>
                <p className="text-amber-700">{selectedAnchorExperience.name}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedAnchorExperience(null)}
              className="text-amber-600 hover:text-amber-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {!generatedItinerary.length ? (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-red-600" />
              Tell Us About Your Perfect Getaway
            </h3>
            
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guest Name</label>
                <input
                  type="text"
                  value={guestData.name}
                  onChange={(e) => setGuestData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={guestData.email}
                  onChange={(e) => setGuestData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trip Duration</label>
                <select
                  value={guestData.tripDuration}
                  onChange={(e) => setGuestData(prev => ({ ...prev, tripDuration: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value={1}>1 Day</option>
                  <option value={2}>2 Days</option>
                  <option value={3}>3 Days</option>
                  <option value={4}>4 Days</option>
                </select>
              </div>
            </div>

            {/* Budget Preference - Button Style */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Budget Preference</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setGuestData(prev => ({ ...prev, budget: 'budget' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    guestData.budget === 'budget'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800">Budget-Friendly</div>
                  <div className="text-sm text-gray-600">$50-150 per activity</div>
                  {guestData.budget === 'budget' && (
                    <div className="text-green-600 text-sm font-medium mt-2">✓ Selected</div>
                  )}
                </button>

                <button
                  onClick={() => setGuestData(prev => ({ ...prev, budget: 'moderate' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    guestData.budget === 'moderate'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800">Moderate</div>
                  <div className="text-sm text-gray-600">$150-300 per activity</div>
                  {guestData.budget === 'moderate' && (
                    <div className="text-blue-600 text-sm font-medium mt-2">✓ Selected</div>
                  )}
                </button>

                <button
                  onClick={() => setGuestData(prev => ({ ...prev, budget: 'splurge' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    guestData.budget === 'splurge'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800">Luxury</div>
                  <div className="text-sm text-gray-600">$300+ per activity</div>
                  {guestData.budget === 'splurge' && (
                    <div className="text-purple-600 text-sm font-medium mt-2">✓ Selected</div>
                  )}
                </button>
              </div>
            </div>

            {/* Travel Style - Button Style */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Travel Style</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setGuestData(prev => ({ ...prev, travelStyle: 'relaxed' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    guestData.travelStyle === 'relaxed'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="font-semibold text-gray-800">Relaxed Pace</div>
                  <div className="text-sm text-gray-600">2 activities per day</div>
                  {guestData.travelStyle === 'relaxed' && (
                    <div className="text-green-600 text-sm font-medium mt-2">✓ Selected</div>
                  )}
                </button>

                <button
                  onClick={() => setGuestData(prev => ({ ...prev, travelStyle: 'moderate' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    guestData.travelStyle === 'moderate'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="font-semibold text-gray-800">Moderate</div>
                  <div className="text-sm text-gray-600">3 activities per day</div>
                  {guestData.travelStyle === 'moderate' && (
                    <div className="text-blue-600 text-sm font-medium mt-2">✓ Selected</div>
                  )}
                </button>

                <button
                  onClick={() => setGuestData(prev => ({ ...prev, travelStyle: 'fast-paced' }))}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    guestData.travelStyle === 'fast-paced'
                      ? 'border-red-500 bg-red-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="font-semibold text-gray-800">Fast Paced</div>
                  <div className="text-sm text-gray-600">4 activities per day</div>
                  {guestData.travelStyle === 'fast-paced' && (
                    <div className="text-red-600 text-sm font-medium mt-2">✓ Selected</div>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="alternateDestinations"
                  checked={guestData.allowAlternateDestinations}
                  onChange={(e) => setGuestData(prev => ({ ...prev, allowAlternateDestinations: e.target.checked }))}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="alternateDestinations" className="ml-2 text-sm font-medium text-gray-700">
                  Include alternate destination options along the way
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-600" />
              What Interests You Most?
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {interestOptions.map((interest) => {
                const IconComponent = interest.icon;
                const isSelected = guestData.interests.includes(interest.id);
                
                return (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                      isSelected 
                        ? 'border-red-500 bg-red-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${interest.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">{interest.label}</span>
                        {isSelected && (
                          <div className="text-red-600 text-sm font-medium mt-1">✓ Selected</div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={generateItinerary}
              disabled={guestData.interests.length === 0 && !selectedAnchorExperience}
              className={`py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 ${
                (guestData.interests.length === 0 && !selectedAnchorExperience)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              <Route className="inline-block w-6 h-6 mr-2" />
              {getGenerateButtonText()}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Your Personalized {guestData.tripDuration}-Day Itinerary
              </h3>
              <button
                onClick={() => {
                  setGeneratedItinerary([]);
                  setSelectedAnchorExperience(null);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg transition-colors"
              >
                Start Over
              </button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {guestData.name}
              </span>
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {budgetLabels[guestData.budget]?.label}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {guestData.travelStyle}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-red-100 p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {generatedItinerary.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setCurrentDay(day.day)}
                  className={`flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentDay === day.day
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Day {day.day}
                  {day.activities.some(a => a.isAnchor) && (
                    <span className="ml-2 text-xs">🎯</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {generatedItinerary.find(day => day.day === currentDay) && (
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Day {currentDay} Activities
                {generatedItinerary.find(day => day.day === currentDay).activities.some(a => a.isAnchor) && (
                  <span className="ml-2 text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    🎯 Your Choice
                  </span>
                )}
              </h4>
              
              {generatedItinerary.find(day => day.day === currentDay).activities.map((activity, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow ${
                  activity.isAnchor ? 'border-amber-300 bg-amber-50' : 'border-red-100'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activity.isAnchor ? 'bg-amber-200 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {activity.time}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          interestOptions.find(opt => opt.id === activity.category)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.category === 'signature' ? 'Signature Experience' : 
                           interestOptions.find(opt => opt.id === activity.category)?.label}
                        </span>
                        <span className={`text-sm font-medium ${getBudgetColor(activity.budget)}`}>
                          {getBudgetIcon(activity.budget)}
                        </span>
                        {activity.isAnchor && (
                          <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                            ✨ Anchor Experience
                          </span>
                        )}
                      </div>
                      
                      <h5 className="text-xl font-bold text-gray-800 mb-2">{activity.name}</h5>
                      <p className="text-gray-600 mb-3">{activity.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-2">
                          {activity.rating && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-2 text-yellow-500" />
                              <span>{activity.rating} stars</span>
                            </div>
                          )}
                          {activity.hours && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{activity.hours}</span>
                            </div>
                          )}
                          {activity.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{activity.location}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          {activity.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2" />
                              <span>{activity.phone}</span>
                            </div>
                          )}
                          {activity.website && (
                            <div className="flex items-center">
                              <Navigation className="w-4 h-4 mr-2" />
                              <a href={`https://${activity.website}`} target="_blank" rel="noopener noreferrer" 
                                 className="text-red-600 hover:text-red-800">
                                {activity.website}
                              </a>
                            </div>
                          )}
                          {activity.price && (
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-2" />
                              <span>${activity.price}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {activity.alternates && activity.alternates.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h6 className="font-medium text-gray-800 mb-2">Alternative Destinations Along the Way:</h6>
                      <div className="grid md:grid-cols-2 gap-3">
                        {activity.alternates.map((alternate, altIndex) => (
                          <div
                            key={altIndex}
                            className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:border-red-300 transition-colors"
                          >
                            <div className="font-medium text-gray-800">{alternate.name}</div>
                            <div className="text-sm text-gray-600">{alternate.description}</div>
                            <div className="text-xs text-gray-500 mt-1">{alternate.distance} away</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Signature Experiences Section - At Bottom */}
      <div className="bg-white rounded-xl shadow-xl border border-yellow-200 p-6 mt-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
            Exclusive Signature Experiences
          </h3>
          <p className="text-gray-600 mt-2">
            Discover unique adventures available only to Rio Nido Lodge guests
          </p>
        </div>

        {/* Search Button for Signature Experiences */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowSignatureSearchModal(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 border border-yellow-300"
          >
            <Search className="inline-block w-5 h-5 mr-2" />
            Search Signature Experiences
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {signatureExperiences.slice(0, 3).map((experience, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg text-gray-800 mb-2">{experience.name}</h4>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">{experience.description}</p>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>${experience.price}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${getBudgetColor(experience.budget)}`}>
                    {getBudgetIcon(experience.budget)} {budgetLabels[experience.budget]?.label}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedExperienceModal(experience)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Learn More
                </button>
                <button
                  onClick={() => handlePlanAroundExperience(experience)}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Plan Day Around This
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            All signature experiences require advance booking
          </p>
        </div>
      </div>

      {/* Signature Experience Search Modal */}
      {showSignatureSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
                Search Signature Experiences
              </h3>
              <button
                onClick={() => setShowSignatureSearchModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative mb-6">
                <input
                  type="text"
                  value={signatureSearchQuery}
                  onChange={(e) => handleSignatureSearch(e.target.value)}
                  placeholder="Search signature experiences (e.g. 'hot air balloon', 'wine cellar', 'meditation')"
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <Search className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
              </div>

              <div className="max-h-96 overflow-y-auto">
                {signatureSearchResults.length > 0 ? (
                  <div className="grid gap-4">
                    {signatureSearchResults.map((experience, index) => (
                      <div key={index} className="border border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-yellow-50 to-orange-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">{experience.name}</h4>
                            <p className="text-gray-600 text-sm mb-2">{experience.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className={`font-medium ${getBudgetColor(experience.budget)}`}>
                                {getBudgetIcon(experience.budget)} {budgetLabels[experience.budget]?.label}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {experience.duration}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                ${experience.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedExperienceModal(experience)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Learn More
                          </button>
                          <button
                            onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <PhoneCall className="w-4 h-4 mr-1" />
                            Call to Book
                          </button>
                          <button
                            onClick={() => handlePlanAroundExperience(experience)}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Plan Day Around This
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : signatureSearchQuery ? (
                  <p className="text-gray-500 text-center py-8">No signature experiences found matching "{signatureSearchQuery}"</p>
                ) : (
                  <div className="grid gap-4">
                    <p className="text-gray-500 text-center py-4">Browse all signature experiences:</p>
                    {signatureExperiences.map((experience, index) => (
                      <div key={index} className="border border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-yellow-50 to-orange-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-800 mb-1">{experience.name}</h4>
                            <p className="text-gray-600 text-sm mb-2">{experience.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className={`font-medium ${getBudgetColor(experience.budget)}`}>
                                {getBudgetIcon(experience.budget)} {budgetLabels[experience.budget]?.label}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {experience.duration}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                ${experience.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedExperienceModal(experience)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Learn More
                          </button>
                          <button
                            onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <PhoneCall className="w-4 h-4 mr-1" />
                            Call to Book
                          </button>
                          <button
                            onClick={() => handlePlanAroundExperience(experience)}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Plan Day Around This
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
              <button
                onClick={() => setShowContact(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-bold text-red-900 mb-2">Rio Nido Lodge</h4>
                <p className="text-red-800 text-sm mb-4">
                  Contact us to book signature experiences and customize your itinerary.
                </p>
                
                <div className="space-y-3">
                  <p className="flex items-center justify-center gap-3 text-lg">
                    <Phone className="w-5 h-5" />
                    {contact.phone}
                  </p>
                  <p className="flex items-center justify-center gap-3 text-lg">
                    <span>✉️</span> {contact.email}
                  </p>
                  <p className="flex items-center justify-center gap-3 text-lg">
                    <Clock className="w-5 h-5" />
                    {contact.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RioNidoLodgeApp;
