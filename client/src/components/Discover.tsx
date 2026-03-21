import React, { useState, useEffect } from 'react';
import { Heart, X, MapPin, User, MessageCircle } from 'lucide-react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';

interface UserProfile {
  _id: string;
  username: string;
  profile: {
    firstName: string;
    lastName: string;
    age: number;
    bio?: string;
    photos: string[];
    location: {
      city?: string;
      country?: string;
    };
    interests?: string[];
  };
  distance?: number;
}

const Discover: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchData, setMatchData] = useState<any>(null);

  const { state } = useAuth();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getPotentialMatches({ limit: 20 });
      if (response.success) {
        setProfiles(response.matches);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInteraction = async (userId: string, action: 'like' | 'pass') => {
    if (actionLoading) return;
    
    setActionLoading(true);
    try {
      const response = await userService.interactWithUser(userId, { action });
      
      if (response.success && response.match) {
        setMatchData(response.matchData);
        setShowMatchModal(true);
      }
      
      // Move to next profile
      setCurrentIndex(prev => prev + 1);
      
      // Load more profiles if we're running low
      if (currentIndex >= profiles.length - 3) {
        loadProfiles();
      }
    } catch (error) {
      console.error('Error interacting with user:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const currentProfile = profiles[currentIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding amazing people...</p>
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No more profiles</h2>
          <p className="text-gray-600 mb-6">Check back later for more potential matches!</p>
          <button
            onClick={loadProfiles}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
          <p className="text-gray-600">Find people who match your interests</p>
        </div>

        {/* Profile Card */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Photo */}
          <div className="relative h-96 bg-gray-200">
            {currentProfile.profile.photos.length > 0 ? (
              <img
                src={currentProfile.profile.photos[0]}
                alt={`${currentProfile.profile.firstName}'s photo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <User className="w-24 h-24 text-gray-400" />
              </div>
            )}
            
            {/* Overlay with name and age */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-2xl font-bold text-white">
                {currentProfile.profile.firstName}, {currentProfile.profile.age}
              </h2>
              {currentProfile.distance && (
                <div className="flex items-center text-white/90 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentProfile.distance} km away
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            {currentProfile.profile.bio && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{currentProfile.profile.bio}</p>
              </div>
            )}

            {currentProfile.profile.interests && currentProfile.profile.interests.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentProfile.profile.location.city && (
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {currentProfile.profile.location.city}, {currentProfile.profile.location.country}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 p-6 bg-gray-50">
            <button
              onClick={() => handleInteraction(currentProfile._id, 'pass')}
              disabled={actionLoading}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition disabled:opacity-50"
            >
              <X className="w-8 h-8 text-red-500" />
            </button>
            
            <button
              onClick={() => handleInteraction(currentProfile._id, 'like')}
              disabled={actionLoading}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition disabled:opacity-50"
            >
              <Heart className="w-8 h-8 text-pink-500" />
            </button>
          </div>
        </div>

        {/* Profile Counter */}
        <div className="text-center mt-4 text-gray-600">
          {currentIndex + 1} / {profiles.length}
        </div>
      </div>

      {/* Match Modal */}
      {showMatchModal && matchData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">It's a Match!</h2>
              <p className="text-gray-600">
                You and {matchData.user1.profile.firstName} liked each other!
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowMatchModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Keep Swiping
              </button>
              <button
                onClick={() => {
                  setShowMatchModal(false);
                  window.location.href = '/matches';
                }}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
