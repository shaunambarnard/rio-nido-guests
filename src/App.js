import React, { useState } from 'react';

function App() {
  const [guestData, setGuestData] = useState({
    neighborhood: 'Rio Nido Lodge',
    tripDuration: 3,
    interests: ['wine', 'nature'],
    travelStyle: 'relaxed'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState([]);

  // Contact and location information
  const contact = {
    email: 'concierge@rionidolodge.com',
    phone: '(707) 869-0821',
    address: '14711 Canyon Two Road, Guerneville, CA 95446',
    website: 'https://rionidolodge.com',
    hours: 'Concierge available 8:00 AM - 8:00 PM daily'
  };

  // Hyperlocal businesses database
  const hyperlocalBusinesses = {
    'Rio Nido Lodge': {
      dining: [
        { 
          name: "Villa Grande Market", 
          type: "Local Market & Deli", 
          description: "Family-owned market with artisanal sandwiches, local wines, and gourmet picnic supplies. Perfect for river adventures.", 
          rating: 4.6, 
          priceRange: "$",
          localInsight: "Try their famous tri-tip sandwich - it's a local legend for over 30 years",
          driveTime: "3 min drive",
          contact: "(707) 869-0949",
          address: "16380 Canyon Two Rd, Guerneville, CA",
          category: "dining",
          cluster: "lodge",
          hours: { open: 7, close: 19, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Big Bottom Market", 
          type: "Gourmet Market & Cafe", 
          description: "Upscale market featuring local artisanal foods, wine, and their famous biscuits. A foodie destination since 2011.", 
          rating: 4.4, 
          priceRange: "$$",
          localInsight: "Their weekend brunch gets busy - arrive before 10 AM or after 2 PM for shorter waits",
          driveTime: "8 min drive",
          contact: "(707) 604-7295",
          address: "16228 Main St, Guerneville, CA",
          category: "dining",
          cluster: "guerneville",
          hours: { open: 8, close: 18, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "boon eat + drink", 
          type: "Farm-to-Table Restaurant", 
          description: "Rustic-chic restaurant serving California cuisine with ingredients from their own farm and local purveyors", 
          rating: 4.5, 
          priceRange: "$$$",
          localInsight: "Book ahead for dinner - their wood-fired dishes are worth the wait",
          driveTime: "8 min drive",
          contact: "(707) 869-0780",
          address: "16248 Main St, Guerneville, CA",
          category: "dining",
          cluster: "guerneville",
          hours: { open: 17, close: 22, timeAppropriate: ['evening'] }
        },
        { 
          name: "Seaside Metal", 
          type: "Coastal Gastropub", 
          description: "Industrial-chic eatery with Pacific Northwest influences and craft cocktails", 
          rating: 4.3, 
          priceRange: "$$",
          localInsight: "Their happy hour (4-6 PM) has excellent small plates and cocktail deals",
          driveTime: "9 min drive",
          contact: "(707) 604-7250",
          address: "16222 Main St, Guerneville, CA",
          category: "dining",
          cluster: "guerneville",
          hours: { open: 16, close: 22, timeAppropriate: ['afternoon', 'evening'] }
        },
        { 
          name: "River's End Restaurant", 
          type: "Oceanfront Fine Dining", 
          description: "Dramatic clifftop restaurant overlooking the Russian River mouth and Pacific Ocean. California cuisine with global influences", 
          rating: 4.2, 
          priceRange: "$$$",
          localInsight: "Reserve a window table for sunset - the view is unforgettable",
          driveTime: "25 min drive",
          contact: "(707) 865-2484",
          address: "11048 CA-1, Jenner, CA",
          category: "dining",
          cluster: "coastal",
          hours: { open: 17, close: 21, timeAppropriate: ['evening'] }
        }
      ],
      wine: [
        { 
          name: "Furthermore Wines", 
          type: "Boutique Winery & Tasting Room", 
          description: "Intimate tasting room in downtown Guerneville specializing in Russian River Valley Pinot Noir and Chardonnay. Dog-friendly patio.", 
          rating: 4.7, 
          priceRange: "$$",
          localInsight: "Ask winemaker Erin about their limited-production Syrah - it's exceptional but rarely advertised",
          driveTime: "12 min drive",
          contact: "(707) 869-0390",
          address: "16280 Main St, Guerneville, CA",
          category: "wine",
          cluster: "guerneville",
          hours: { open: 11, close: 18, timeAppropriate: ['afternoon', 'evening'] }
        },
        { 
          name: "Williams Selyem Winery", 
          type: "Prestigious Pinot Noir Producer", 
          description: "Legendary winery known for exceptional Russian River Valley and Sonoma Coast Pinot Noir. Appointment required", 
          rating: 4.8, 
          priceRange: "$$$",
          localInsight: "Book well in advance - their allocation list is highly coveted",
          driveTime: "12 min drive",
          contact: "(707) 433-6425",
          address: "7227 Westside Rd, Healdsburg, CA",
          category: "wine",
          cluster: "westside",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Rochioli Vineyards", 
          type: "Family Estate Winery", 
          description: "Fourth-generation family winery producing world-class Pinot Noir and Chardonnay from estate vineyards", 
          rating: 4.9, 
          priceRange: "$$$",
          localInsight: "Try their estate Pinot Noir - some say it rivals Burgundy's finest",
          driveTime: "15 min drive",
          contact: "(707) 433-2305",
          address: "6192 Westside Rd, Healdsburg, CA",
          category: "wine",
          cluster: "westside",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Iron Horse Vineyards", 
          type: "Sparkling Wine Specialists", 
          description: "Historic estate known for sparkling wines served at White House state dinners. Stunning hilltop views", 
          rating: 4.6, 
          priceRange: "$$",
          localInsight: "Their outdoor tastings on the terrace are magical at sunset",
          driveTime: "18 min drive",
          contact: "(707) 887-1507",
          address: "9786 Ross Station Rd, Sebastopol, CA",
          category: "wine",
          cluster: "sebastopol",
          hours: { open: 10, close: 16, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      nature: [
        { 
          name: "Armstrong Redwoods State Natural Reserve", 
          type: "Ancient Redwood Grove", 
          description: "Walk among 800-year-old coast redwoods in this cathedral-like grove. The Colonel Armstrong Tree is over 1,400 years old.", 
          rating: 4.8, 
          priceRange: "Free (parking $8)",
          localInsight: "Take the Pioneer Nature Trail early morning for magical light filtering through the canopy",
          driveTime: "8 min drive",
          contact: "(707) 869-2015",
          address: "17000 Armstrong Woods Rd, Guerneville, CA",
          category: "nature",
          cluster: "guerneville",
          hours: { open: 8, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Austin Creek State Recreation Area", 
          type: "Backcountry Wilderness", 
          description: "Rugged backcountry adjacent to Armstrong Redwoods with hiking trails, camping, and diverse ecosystems", 
          rating: 4.5, 
          priceRange: "Free (parking $8)",
          localInsight: "The Gilliam Creek Trail leads to a hidden swimming hole - perfect for hot days",
          driveTime: "12 min drive",
          contact: "(707) 869-2015",
          address: "17000 Armstrong Woods Rd, Guerneville, CA",
          category: "nature",
          cluster: "guerneville",
          hours: { open: 8, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Russian River", 
          type: "River Recreation", 
          description: "Gentle river perfect for kayaking, canoeing, swimming, and beach lounging. Multiple access points", 
          rating: 4.6, 
          priceRange: "Free",
          localInsight: "Monte Rio Beach is less crowded than Guerneville's main beach",
          driveTime: "5 min walk",
          contact: "Various outfitters",
          address: "Multiple access points near lodge",
          category: "nature",
          cluster: "lodge",
          hours: { open: 6, close: 20, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        },
        { 
          name: "Goat Rock Beach", 
          type: "Dramatic Coastal Beach", 
          description: "Stunning Pacific coastline where the Russian River meets the ocean. Harbor seal pupping ground", 
          rating: 4.7, 
          priceRange: "Free",
          localInsight: "Visit during pupping season (March-August) to see harbor seals, but keep your distance",
          driveTime: "25 min drive",
          contact: "(707) 875-3483",
          address: "Goat Rock Rd, Jenner, CA",
          category: "nature",
          cluster: "coastal",
          hours: { open: 6, close: 20, timeAppropriate: ['morning', 'afternoon', 'evening'] }
        }
      ],
      wellness: [
        { 
          name: "Osmosis Day Spa Sanctuary", 
          type: "Japanese-Inspired Spa", 
          description: "Unique spa featuring enzyme baths, massage, and meditation gardens in a tranquil forest setting", 
          rating: 4.4, 
          priceRange: "$$$",
          localInsight: "Book the cedar enzyme bath - it's their signature treatment and deeply detoxifying",
          driveTime: "20 min drive",
          contact: "(707) 823-8231",
          address: "209 Bohemian Hwy, Freestone, CA",
          category: "wellness",
          cluster: "freestone",
          hours: { open: 9, close: 18, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Salt Point Yoga", 
          type: "Ocean View Yoga", 
          description: "Outdoor yoga classes on bluffs overlooking the Pacific Ocean. Multiple class styles offered", 
          rating: 4.6, 
          priceRange: "$$",
          localInsight: "The sunset classes are transformative - bring layers as it gets windy",
          driveTime: "45 min drive",
          contact: "(707) 847-3570",
          address: "25050 CA-1, Jenner, CA",
          category: "wellness",
          cluster: "coastal",
          hours: { open: 7, close: 19, timeAppropriate: ['morning', 'evening'] }
        },
        { 
          name: "Sonoma County Regional Parks", 
          type: "Forest Bathing & Hiking", 
          description: "Multiple parks offering forest bathing experiences and meditative hikes among redwoods and oaks", 
          rating: 4.5, 
          priceRange: "Free-$",
          localInsight: "Stillwater Cove has easy trails perfect for mindful walking",
          driveTime: "15-30 min drive",
          contact: "(707) 565-2041",
          address: "Various locations",
          category: "wellness",
          cluster: "regional",
          hours: { open: 8, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      adventure: [
        { 
          name: "Russian River Adventures", 
          type: "Kayak & Canoe Outfitter", 
          description: "Full-service outfitter offering kayak and canoe rentals, guided trips, and river shuttles", 
          rating: 4.5, 
          priceRange: "$$",
          localInsight: "The half-day trip from Forestville to Guerneville is perfect for beginners",
          driveTime: "8 min drive",
          contact: "(707) 869-9009",
          address: "20 Healdsburg Ave, Guerneville, CA",
          category: "adventure",
          cluster: "guerneville",
          hours: { open: 9, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Sonoma Canopy Tours", 
          type: "Zipline Adventure", 
          description: "Thrilling zipline tours through redwood and Douglas fir canopy with educational naturalist guides", 
          rating: 4.7, 
          priceRange: "$$$",
          localInsight: "Book the first tour of the day for the best wildlife viewing opportunities",
          driveTime: "25 min drive",
          contact: "(707) 849-1130",
          address: "6250 Bohemian Hwy, Occidental, CA",
          category: "adventure",
          cluster: "occidental",
          hours: { open: 9, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Bodega Bay Sportfishing", 
          type: "Ocean Fishing Charters", 
          description: "Deep-sea fishing charters for salmon, rockfish, and Dungeness crab. Equipment and licenses included", 
          rating: 4.3, 
          priceRange: "$$$",
          localInsight: "Salmon season (May-October) offers the best action - book early morning trips",
          driveTime: "35 min drive",
          contact: "(707) 875-3344",
          address: "1275 Bay Flat Rd, Bodega Bay, CA",
          category: "adventure",
          cluster: "coastal",
          hours: { open: 5, close: 18, timeAppropriate: ['morning', 'afternoon'] }
        }
      ],
      shopping: [
        { 
          name: "Guerneville 5 & 10", 
          type: "Vintage Five & Dime", 
          description: "Charming old-fashioned five and dime store with vintage goods, local crafts, and nostalgic finds", 
          rating: 4.4, 
          priceRange: "$",
          localInsight: "They still have penny candy and vintage postcards - great for unique souvenirs",
          driveTime: "8 min drive",
          contact: "(707) 869-0632",
          address: "16290 Main St, Guerneville, CA",
          category: "shopping",
          cluster: "guerneville",
          hours: { open: 10, close: 18, timeAppropriate: ['morning', 'afternoon'] }
        },
        { 
          name: "Nimble & Finn's Garden Center", 
          type: "Artisanal Garden & Home", 
          description: "Curated garden center and home goods store featuring local artisans, plants, and unique gifts", 
          rating: 4.6, 
          priceRange: "$$",
          localInsight: "Their succulent arrangements make perfect gifts that travel well",
          driveTime: "15 min drive",
          contact: "(707) 823-0417",
          address: "3555 Gravenstein Hwy N, Sebastopol, CA",
          category: "shopping",
          cluster: "sebastopol",
          hours: { open: 9, close: 17, timeAppropriate: ['morning', 'afternoon'] }
        }
      ]
    }
  };

  // Create balanced daily mixes to avoid category clustering
  const createBalancedDailyMix = (dayNumber, interests) => {
    const interestRotations = {
      1: interests.length >= 3 ? [interests[0], interests[1], interests[2]] : 
         interests.length >= 2 ? [interests[0], interests[1], interests[0]] : 
         [interests[0], interests[0], interests[0]],
      2: interests.length >= 3 ? [interests[1], interests[2], interests[0]] : 
         interests.length >= 2 ? [interests[1], interests[0], interests[1]] : 
         [interests[0], interests[0], interests[0]],
      3: interests.length >= 3 ? [interests[2], interests[0], interests[1]] : 
         interests.length >= 2 ? [interests[0], interests[1], interests[0]] : 
         [interests[0], interests[0], interests[0]]
    };
    
    // Rotate interests for days beyond 3
    const rotationKey = ((dayNumber - 1) % 3) + 1;
    return interestRotations[rotationKey];
  };

  // Get best business for specific time slot and interest with geographic efficiency
  const getBestBusinessForSlot = (timeSlot, interest, usedBusinesses, dayNumber) => {
    const neighborhoodBusinesses = hyperlocalBusinesses[guestData.neighborhood] || {};
    
    // Define appropriate business categories for each time slot
    const timeSlotMapping = {
      'morning': ['wine', 'nature', 'wellness', 'shopping', 'adventure'],
      'lunch': ['dining'],
      'afternoon': ['wine', 'nature', 'adventure', 'shopping', 'wellness'],
      'evening': ['dining', 'wine', 'wellness']
    };
    
    // For lunch, always use dining
    const targetCategory = timeSlot === 'lunch' ? 'dining' : interest;
    const validCategories = timeSlot === 'lunch' ? ['dining'] : timeSlotMapping[timeSlot] || [];
    
    if (!validCategories.includes(targetCategory)) {
      return null;
    }
    
    const businessPool = neighborhoodBusinesses[targetCategory] || [];
    
    // Filter by business hours and usage
    const availableBusinesses = businessPool.filter(business => {
      if (usedBusinesses.has(business.name)) return false;
      
      // Check if business is open during time slot
      const hours = business.hours;
      if (!hours) return true; // Assume open if no hours specified
      
      const timeSlotHours = {
        'morning': 9,
        'lunch': 12,
        'afternoon': 14,
        'evening': 17
      };
      
      const slotHour = timeSlotHours[timeSlot];
      return slotHour >= hours.open && slotHour < hours.close;
    });
    
    // Enhanced error handling and fallback logic
    if (availableBusinesses.length === 0) {
      // Intelligent fallback system
      console.log(`No businesses found for ${targetCategory} at ${timeSlot}, trying fallback options...`);
      
      // Fallback 1: Try any business in valid categories for this time slot
      const validCategories = timeSlotMapping[timeSlot] || [];
      const fallbackBusinesses = validCategories.flatMap(cat => 
        (neighborhoodBusinesses[cat] || []).filter(b => !usedBusinesses.has(b.name))
      );
      
      if (fallbackBusinesses.length > 0) {
        console.log(`Found fallback business: ${fallbackBusinesses[0].name}`);
        return fallbackBusinesses[0];
      }
      
      // Fallback 2: Try any available business regardless of time slot
      const anyAvailableBusiness = Object.values(neighborhoodBusinesses)
        .flat()
        .find(b => !usedBusinesses.has(b.name));
      
      if (anyAvailableBusiness) {
        console.log(`Using emergency fallback: ${anyAvailableBusiness.name}`);
        return anyAvailableBusiness;
      }
      
      console.log(`No businesses available for day slot`);
      return null;
    }
    
    // Prioritize based on geographic efficiency for multi-day trips
    if (guestData.tripDuration > 1) {
      // Day 1: Stay local (lodge/guerneville area)
      // Day 2: Wine region or nearby attractions  
      // Day 3: Coastal adventure (if travel style allows)
      
      if (dayNumber === 1) {
        // Prefer businesses closer to lodge
        const localBusinesses = availableBusinesses.filter(b => 
          b.driveTime && (b.driveTime.includes('walk') || parseInt(b.driveTime) <= 10)
        );
        if (localBusinesses.length > 0) {
          return localBusinesses[Math.floor(Math.random() * localBusinesses.length)];
        }
      } else if (dayNumber === 2 && targetCategory === 'wine') {
        // Prefer wine businesses with moderate drive times
        const wineBusinesses = availableBusinesses.filter(b => 
          b.driveTime && parseInt(b.driveTime) >= 8 && parseInt(b.driveTime) <= 15
        );
        if (wineBusinesses.length > 0) {
          return wineBusinesses[Math.floor(Math.random() * wineBusinesses.length)];
        }
      } else if (dayNumber === 3 && guestData.travelStyle === 'day-trips') {
        // Allow coastal businesses for adventurous travelers
        const coastalBusinesses = availableBusinesses.filter(b => 
          b.cluster === 'coastal' || (b.driveTime && parseInt(b.driveTime) >= 15)
        );
        if (coastalBusinesses.length > 0) {
          return coastalBusinesses[Math.floor(Math.random() * coastalBusinesses.length)];
        }
      }
    }
    
    // Default: random selection from available businesses
    return availableBusinesses[Math.floor(Math.random() * availableBusinesses.length)];
  };

  // Enhanced UI with better feedback and loading states
  const generateItinerary = () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const days = [];
      const usedBusinesses = new Set();
      
      // Validate that we have enough businesses for the trip
      const neighborhoodBusinesses = hyperlocalBusinesses[guestData.neighborhood] || {};
      const totalAvailableBusinesses = Object.values(neighborhoodBusinesses)
        .flat().length;
      
      const requiredBusinesses = guestData.tripDuration * 3; // 3 activities per day
      
      if (totalAvailableBusinesses < requiredBusinesses) {
        console.warn(`Limited business pool: ${totalAvailableBusinesses} available for ${requiredBusinesses} needed`);
      }
      
      // Create balanced daily schedules with variety
      for (let day = 1; day <= guestData.tripDuration; day++) {
        const dayActivities = [];
        
        // Create a balanced mix of interests for each day
        const dailyInterestMix = createBalancedDailyMix(day, guestData.interests);
        
        console.log(`Planning Day ${day} with mix: ${dailyInterestMix.join(', ')}`);
        
        // Morning activity (9:00-11:00 AM)
        const morningActivity = getBestBusinessForSlot('morning', dailyInterestMix[0], usedBusinesses, day);
        if (morningActivity) {
          dayActivities.push({
            time: '9:00 AM',
            activity: morningActivity,
            type: dailyInterestMix[0]
          });
          usedBusinesses.add(morningActivity.name);
        }
        
        // Lunch break (11:30 AM - 1:00 PM)
        const lunchActivity = getBestBusinessForSlot('lunch', 'dining', usedBusinesses, day);
        if (lunchActivity) {
          dayActivities.push({
            time: '12:00 PM',
            activity: lunchActivity,
            type: 'dining'
          });
          usedBusinesses.add(lunchActivity.name);
        }
        
        // Afternoon activity (2:00-4:00 PM)
        const afternoonActivity = getBestBusinessForSlot('afternoon', dailyInterestMix[1], usedBusinesses, day);
        if (afternoonActivity) {
          dayActivities.push({
            time: '2:00 PM',
            activity: afternoonActivity,
            type: dailyInterestMix[1]
          });
          usedBusinesses.add(afternoonActivity.name);
        }
        
        // Evening activity (5:00-7:00 PM)  
        const eveningActivity = getBestBusinessForSlot('evening', dailyInterestMix[2], usedBusinesses, day);
        if (eveningActivity) {
          dayActivities.push({
            time: '5:30 PM',
            activity: eveningActivity,
            type: dailyInterestMix[2]
          });
          usedBusinesses.add(eveningActivity.name);
        }
        
        // Ensure day has at least one activity
        if (dayActivities.length === 0) {
          setError(`Unable to generate activities for Day ${day}. Please try different preferences or contact our concierge.`);
          setIsGenerating(false);
          return;
        }
        
        days.push({
          day: day,
          activities: dayActivities
        });
      }
      
      setItinerary(days);
      console.log(`Successfully generated ${days.length}-day itinerary with ${days.reduce((sum, day) => sum + day.activities.length, 0)} total activities`);
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setError('Unable to generate your itinerary. Please try again or contact our concierge for assistance.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInterestChange = (interest) => {
    setGuestData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-2">
            🏨 Rio Nido Lodge
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Curated Russian River Valley Experiences
          </p>
          <p className="text-sm text-gray-500">
            {contact.address} • {contact.phone}
          </p>
        </div>

        {/* Guest Preferences Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Tell Us About Your Perfect Trip
          </h2>

          {/* Trip Duration */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many days will you be staying?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(days => (
                <button
                  key={days}
                  onClick={() => setGuestData(prev => ({ ...prev, tripDuration: days }))}
                  className={`px-4 py-2 rounded-lg border-2 transition duration-200 ${
                    guestData.tripDuration === days
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {days} day{days > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What interests you most? (Select multiple)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { id: 'wine', label: '🍷 Wine Tasting', desc: 'Boutique wineries & tastings' },
                { id: 'nature', label: '🌲 Nature', desc: 'Redwoods, rivers & trails' },
                { id: 'wellness', label: '🧘 Wellness', desc: 'Spas, yoga & relaxation' },
                { id: 'dining', label: '🍽️ Dining', desc: 'Farm-to-table & local cuisine' },
                { id: 'adventure', label: '🚣 Adventure', desc: 'Kayaking, hiking & outdoor fun' },
                { id: 'shopping', label: '🛍️ Shopping', desc: 'Local crafts & unique finds' }
              ].map(interest => (
                <div
                  key={interest.id}
                  onClick={() => handleInterestChange(interest.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
                    guestData.interests.includes(interest.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-medium text-gray-800">{interest.label}</div>
                  <div className="text-sm text-gray-600">{interest.desc}</div>
