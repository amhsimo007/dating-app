import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, User, MapPin, Clock } from 'lucide-react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';

interface Match {
  matchId: string;
  user: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      age: number;
      photos: string[];
    };
    lastActive: string;
  };
  matchedAt: string;
  unreadCount: number;
}

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { state } = useAuth();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getMatches();
      if (response.success) {
        setMatches(response.matches);
      }
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Matches</h1>
          <p className="text-gray-600">People you've matched with</p>
        </div>

        {matches.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-xl p-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No matches yet</h2>
            <p className="text-gray-600 mb-6">Start swiping to find your perfect match!</p>
            <Link
              to="/discover"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition"
            >
              <Heart className="w-5 h-5 mr-2" />
              Start Discovering
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <Link
                key={match.matchId}
                to={`/chat/${match.matchId}`}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition group"
              >
                {/* Profile Photo */}
                <div className="relative h-48 bg-gray-200">
                  {match.user.profile.photos.length > 0 ? (
                    <img
                      src={match.user.profile.photos[0]}
                      alt={`${match.user.profile.firstName}'s photo`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Unread Count Badge */}
                  {match.unreadCount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {match.unreadCount}
                    </div>
                  )}
                  
                  {/* Match Date Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center text-white text-sm">
                      <Heart className="w-4 h-4 mr-1" />
                      Matched {formatLastActive(match.matchedAt)}
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {match.user.profile.firstName}, {match.user.profile.age}
                    </h3>
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    Active {formatLastActive(match.user.lastActive)}
                  </div>

                  {match.unreadCount > 0 && (
                    <div className="mt-2 text-sm text-purple-600 font-medium">
                      {match.unreadCount} unread message{match.unreadCount > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
