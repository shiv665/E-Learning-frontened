import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronDown, ChevronRight, Clock, CheckCircle, PlayCircle, Book, User, Star, SkipBack, SkipForward, Settings, Loader } from 'lucide-react';
import { apiConnector } from '../../../../services/apiConnector';
import { coursesAPI } from '../../../../services/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { useParams, useNavigate, Link } from 'react-router-dom';

const CourseVideoPlayer = () => {

  // all the state variables for the video player declared when they are needed
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [expandedSections, setExpandedSections] = useState(new Set([0]));
  const [sidebarOpen, setSidebarOpen] = useState(false);
 // useRef are used to hold references to DOM elements or values that persist across renders without causing re-renders when changed.
  const videoRef = useRef(null); //doesn't need to be initialized with a value, it will be assigned later
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const params = useParams();
    const courseId  = useParams().id;
  const navigate = useNavigate();
  const {user}= useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  const [courseData, setCoursedata] = useState({});
   const getCourseDetails = async () => {
      try {
        const bodyData = { courseId, token };
        const result = await apiConnector("POST", coursesAPI.GET_COURSE_API, bodyData);
  
        setCoursedata(result?.data?.courseDetails || {});
        console.log("Course Details:", result?.data?.courseDetails?.courseName);
        toast.success("Courses fetched successfully");
      } catch (err) {
        console.error(err?.response?.data?.message || "Failed to fetch course");
      }
    };
  
    useEffect(() => {
      getCourseDetails();
    }, []);
  

 // this I have used to set the first video as the default video
  useEffect(() => {
    const firstVideo = courseData?.courseContent?.[0]?.subSections?.[0];
    if (firstVideo && !currentVideo) {
      setCurrentVideo(firstVideo);
    }
  }, [courseData, currentVideo]);

  // this handle time updates, duration updates, loading states, and video end events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      markAsComplete(currentVideo._id);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentVideo]);

  // handling the play and pause button
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleSeek = (newTime) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackRate = (rate) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const selectVideo = (subSection) => {
    setCurrentVideo(subSection);
    // Auto-play the new video
    if(videoRef.current) {
        videoRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(err => {
            console.error("Autoplay was prevented: ", err);
            setIsPlaying(false);
        })
    }
  };

  const markAsComplete = (videoId) => {
    const newCompleted = new Set(completedVideos);
    newCompleted.add(videoId);
    setCompletedVideos(newCompleted);
  };

  const getTotalDuration = () => {
    let totalMinutes = 0;
    courseData?.courseContent?.forEach(section => {
      section?.subSections?.forEach(sub => {
        const [minutes, seconds] = sub?.timeDuration.split(':');
        totalMinutes += parseInt(minutes) + parseInt(seconds) / 60;
      });
    });
    if (totalMinutes === 0) return '0h 0m';
    return `${Math.floor(totalMinutes / 60)}h ${Math.floor(totalMinutes % 60)}m`;
  };

  const getCompletionPercentage = () => {
    const totalVideos = courseData?.courseContent?.reduce((acc, section) => acc + section.subSections.length, 0) || 1; // Prevent division by zero
    return Math.round((completedVideos.size / totalVideos) * 100);
  };

  const totalLessons = courseData?.courseContent?.reduce((acc, section) => acc + section.subSections.length, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Book onClick={() => setSidebarOpen(true)} className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold">{courseData?.courseName}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{courseData?.Instructor?.firstName} {courseData?.Instructor?.lastName}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <span>{getCompletionPercentage()}% Complete</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-3">
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
            <span className="text-sm text-gray-400">{completedVideos.size} of {totalLessons} lessons</span>
          </div>
        </div>
      </header>

      <div className={`flex`}>
        {/* Sidebar - Course Content */}
        <div className= {`w-80 bg-gray-800 border-r border-gray-700 h-[calc(100vh-81px)] overflow-y-auto ${sidebarOpen ? 'block' : 'hidden'} `}>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between lg:justify-start lg:space-x-0">
              <div>
                <h2 className="text-lg font-semibold mb-2">Course Content</h2>
                <p className="text-sm text-gray-400">{courseData?.courseContent?.length || 0} sections • {totalLessons} lectures</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:pl-20 p-2 hover:bg-gray-700 rounded-lg"
              >
                <svg  className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-2">
            {courseData?.courseContent?.map((section, sectionIndex) => (
              <div key={section._id} className="mb-2">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    {expandedSections.has(sectionIndex) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                    <span className="font-medium text-sm text-left">{section.sectionName}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{section.subSections.length} videos</span>
                </button>

                {/* Subsections */}
                {expandedSections.has(sectionIndex) && (
                  <div className="mt-2 space-y-1">
                    {section.subSections.map((subSection) => (
                      <div
                        key={subSection._id}
                        onClick={() => {
                          selectVideo(subSection);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          currentVideo?._id === subSection._id 
                            ? 'bg-blue-600 border border-blue-500' 
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            {completedVideos.has(subSection._id) ? 
                              <CheckCircle className="w-5 h-5 text-green-400" /> :
                              <PlayCircle className="w-5 h-5 text-gray-400" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm mb-1">{subSection.title}</h4>
                            <p className="text-xs text-gray-400 mb-2">{subSection.description}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{subSection.timeDuration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Video Player */}
        <div className="flex-1 flex flex-col min-w-0">
          {currentVideo ? (
            <>
              {/* Video Player */}
              <div 
                ref={playerRef}
                className="relative bg-black w-full group"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                <div className="aspect-video w-full">
                  <video
                    ref={videoRef}
                    key={currentVideo.videoURL} // Add key to force re-render on source change
                    src={currentVideo.videoURL}
                    className="w-full h-full object-contain"
                    onClick={togglePlay}
                    onDoubleClick={toggleFullscreen}
                    autoPlay
                  />

                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader className="w-12 h-12 text-white animate-spin" />
                    </div>
                  )}

                  {!isPlaying && !isLoading && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                      onClick={togglePlay}
                    >
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover/play:bg-white/30 transition-colors">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                    </div>
                  )}

                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                    showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="px-4 pb-2">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(currentTime / duration) * 100}%, #6B7280 ${(currentTime / duration) * 100}%, #6B7280 100%)`
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between px-4 pb-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={togglePlay}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          {isPlaying ? 
                            <Pause className="w-6 h-6 text-white" /> : 
                            <Play className="w-6 h-6 text-white ml-0.5" />
                          }
                        </button>

                        <button
                          onClick={() => skip(-10)}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <SkipBack className="w-5 h-5 text-white" />
                        </button>

                        <button
                          onClick={() => skip(10)}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          <SkipForward className="w-5 h-5 text-white" />
                        </button>

                        <div className="flex items-center space-x-2 group">
                          <button
                            onClick={toggleMute}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                          >
                            {isMuted || volume === 0 ? 
                              <VolumeX className="w-5 h-5 text-white" /> : 
                              <Volume2 className="w-5 h-5 text-white" />
                            }
                          </button>
                          
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>

                        <span className="text-white text-sm font-mono">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <Settings className="w-5 h-5 text-white" />
                          </button>
                          
                          {showSettings && (
                            <div className="absolute bottom-12 right-0 bg-gray-800 rounded-lg p-3 min-w-[150px] shadow-xl">
                              <div className="text-white text-sm font-medium mb-2">Playback Speed</div>
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                                <button
                                  key={rate}
                                  onClick={() => changePlaybackRate(rate)}
                                  className={`block w-full text-left px-3 py-1 text-sm rounded hover:bg-gray-700 transition-colors ${
                                    playbackRate === rate ? 'text-blue-400 bg-gray-700' : 'text-white'
                                  }`}
                                >
                                  {rate}x {rate === 1 ? '(Normal)' : ''}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={toggleFullscreen}
                          className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                          {isFullscreen ? 
                            <Minimize className="w-5 h-5 text-white" /> : 
                            <Maximize className="w-5 h-5 text-white" />
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">{currentVideo.title}</h2>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">{currentVideo.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(duration) || currentVideo.timeDuration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Speed: {playbackRate}x</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => markAsComplete(currentVideo._id)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      completedVideos.has(currentVideo._id)
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={completedVideos.has(currentVideo._id)}
                  >
                    {completedVideos.has(currentVideo._id) ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gray-800 flex-1">
                <h3 className="text-lg font-semibold mb-4">About this Course</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-medium mb-2">What you'll learn</h4>
                    <p className="text-gray-300 text-sm sm:text-base">{courseData?.WhatUWillLearn}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Course Description</h4>
                    <p className="text-gray-300 text-sm sm:text-base">{courseData?.courseDescription}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <Book className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Select a lesson to start learning</h2>
                <p className="text-gray-400 text-sm sm:text-base">Choose any video from the course content sidebar</p>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Browse Lessons
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          margin-top: -7px; /* Center thumb on track */
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default CourseVideoPlayer;