import React, { useState } from 'react';

function App() {
  const [guestData, setGuestData] = useState({
    neighborhood: 'Rio Nido Lodge',
    tripDuration: 3,
    interests: ['wine', 'nature'],
    travelStyle: 'relaxed'
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rio Nido Lodge - Test 2</h1>
      <p>Trip Duration: {guestData.tripDuration} days</p>
      <p>Interests: {guestData.interests.join(', ')}</p>
      <button onClick={() => alert('State working!')}>
        Test State
      </button>
    </div>
  );
}

export default App;
