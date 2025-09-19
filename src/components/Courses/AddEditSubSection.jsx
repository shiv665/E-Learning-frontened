import React, { useState } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { coursesAPI } from '../../services/api';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddEditSubSection = () => {
  const [title, setTitle] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const { id: sectionId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    if (!title || !timeDuration || !description || !videoFile) {
      toast.error('Please fill in all fields and upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('timeDuration', timeDuration);
    formData.append('description', description);
    formData.append('sectionId', sectionId);
    formData.append('videoFile', videoFile);
    formData.append('token', token);

    try {
      await apiConnector('POST', coursesAPI.SUBSECTION_API, formData);
      toast.success('Subsection added successfully!');
      setTitle('');
      setTimeDuration('');
      setDescription('');
      setVideoFile(null);
      setPreviewUrl(null);
      navigate(-1);
    } catch (error) {
      console.error('Error adding subsection:', error);
      toast.error('Failed to add subsection.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        🎬 Add / Edit Subsection
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-gray-300">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
          placeholder="Enter subsection title"
        />
      </div>

      {/* Time Duration */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-gray-300">
          Time Duration (in minutes)
        </label>
        <input
          type="text"
          value={timeDuration}
          onChange={(e) => setTimeDuration(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
          placeholder="e.g. 15"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-gray-300">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 h-24 focus:outline-none focus:border-yellow-400"
          placeholder="Enter a brief description"
        />
      </div>

      {/* Upload Video */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-gray-300">Upload Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="w-full text-gray-300"
        />
        {previewUrl && (
          <video
            controls
            className="mt-3 w-full rounded-lg shadow-md border border-gray-700"
          >
            <source src={previewUrl} type={videoFile?.type} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition-all"
      >
        Submit
      </button>
    </div>
  );
};

export default AddEditSubSection;
