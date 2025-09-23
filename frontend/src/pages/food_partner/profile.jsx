import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import '../../styles/profile.css';

const Profile = () => {
  const { partnerId } = useParams();
  const [partnerData, setPartnerData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get(`/api/food-partner/${partnerId}`);
        setPartnerData(response.data.foodPartner || {
          name: "Restaurant Name",
          address: "Address",
          foodItems: []
        });
      } catch (error) {
        console.error('Error fetching partner details:', error);
      }
    };

    fetchPartnerDetails();
  }, [partnerId]);

  const handleVideoClick = (videoId) => {
    if (selectedVideo === videoId) {
      setSelectedVideo(null);
      videoRefs.current[videoId]?.pause();
    } else {
      // Pause previous video if any
      if (selectedVideo) {
        videoRefs.current[selectedVideo]?.pause();
      }
      setSelectedVideo(videoId);
      videoRefs.current[videoId]?.play();
    }
  };

  if (!partnerData) {
    return <div className="loading">Loading...</div>;
  }

  const totalMeals = partnerData.foodItems?.length || 0;
  const customersServed = "15K+"; // Static data for now

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-image">
            <img src="/icons/chef-icon.png" alt="food-partner-logo" />
          </div>
          <div className="profile-details">
            <h1 className="business-name">{partnerData.name}</h1>
            <p className="business-address">{partnerData.address}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <p className="stat-value">{totalMeals}</p>
            <p className="stat-label">Total Meals</p>
          </div>
          <div className="stat-item">
            <p className="stat-value">{customersServed}</p>
            <p className="stat-label">Customers Served</p>
          </div>
        </div>
      </div>

      <div className="videos-grid">
        {partnerData.foodItems?.map((food) => (
          <div 
            key={food._id} 
            className={`video-thumbnail ${selectedVideo === food._id ? 'playing' : ''}`}
            onClick={() => handleVideoClick(food._id)}
          >
            <video
              ref={el => videoRefs.current[food._id] = el}
              src={food.video}
              loop
              muted
              playsInline
            />
            <div className="video-info">
              <h3>{food.name}</h3>
              <p>{food.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
