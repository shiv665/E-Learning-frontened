import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { apiConnector } from '../../services/apiConnector';
import { coursesAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

const AddEditSection = () => {
  const { id: courseId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [sectionName, setSectionName] = useState('');
  const [sectionDetails, setSectionDetails] = useState([]);
  const [expandedSectionId, setExpandedSectionId] = useState(null);

  const navigate = useNavigate();

  const fetchSectionDetails = async () => {
    try {
      const result = await apiConnector(
        'POST',
        coursesAPI.GET_SECTION_API,
        { courseId, token }
      );
      setSectionDetails(result?.data?.sectionDetails?.courseContent || []);
    } catch (error) {
      console.error('Error fetching section details:', error);
    }
  };

  useEffect(() => {
    fetchSectionDetails();
  }, [courseId]);

  const handleSubSection = (subsectionID) => {
    navigate(`/subsection/${subsectionID}`);
  };

  const handleClick = async () => {
    const bodyData = {
      sectionName,
      courseId,
      token
    };

    try {
      await apiConnector('POST', coursesAPI.SECTION_API, bodyData);
      toast.success('Section added/edited successfully!');
      setSectionName('');
      fetchSectionDetails();
    } catch (error) {
      console.error('Error adding/editing section:', error);
    }
  };

  const toggleSubSections = (section) => {
    setExpandedSectionId(expandedSectionId === section._id ? null : section._id);
  };





  // {handle these as they are not working} and delete this subsection in subsection component
  // const handleDeleteSubsection = async () => {
  //   try {
  //     const payload={

  //     }
  //     window.confirm('Are you sure you want to delete this subsection?');
  //     await apiConnector('DELETE', coursesAPI.DELETE_SUBSECTION_API, payload);
  //     toast.success('Subsection deleted successfully!');
  //     fetchSectionDetails();
  //   } catch (error) {
  //     console.error('Error deleting subsection:', error);
  //     toast.error('Failed to delete subsection.');
  //   }
  // };
  const handleSectionDelete = async (subsectionID) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        const payload = {
          sectionId: subsectionID,
          token
        };
        await apiConnector('DELETE', coursesAPI.SECTION_API_DELETE, payload);
        toast.success('Section deleted successfully!');
        fetchSectionDetails();
      } catch (error) {
        console.error('Error deleting section:', error);
        toast.error('Failed to delete section.');
      }
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        ✏️ Add / Edit Section
      </h2>

      {/* Section Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Section Name"
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-all"
        >
          Submit
        </button>
      </div>

      {/* Existing Sections */}
      {sectionDetails.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
            📂 Existing Sections
          </h3>
          <ul className="space-y-4">
            {sectionDetails.map((section) => (
              <li
                key={section._id}
                className="bg-gray-800 p-5 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">{section.sectionName}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSubSection(section._id)}
                      className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-lg text-white font-medium"
                    >
                      Set Subsection
                    </button>
                    <button
                      onClick={() => handleSectionDelete(section._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-white font-medium"
                    >
                      Delete Subsection
                    </button>
                    <button
                      onClick={() => toggleSubSections(section)}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded-lg text-white font-medium"
                    >
                      {expandedSectionId === section._id
                        ? 'Hide'
                        : 'Show'}{' '}
                      Subsections
                    </button>
                  </div>
                </div>

                {/* Subsections */}
                {expandedSectionId === section._id && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-700 space-y-3">
                    {section.subSections?.length > 0 ? (
                      section.subSections.map((subSection) => (
                        <div
                          key={subSection._id}
                          className="bg-gray-700 p-4 rounded-lg"
                        >
                          <p>
                            <strong>Title:</strong> {subSection.title}
                          </p>
                          <p>
                            <strong>Description:</strong>{' '}
                            {subSection.description}
                          </p>
                          <p>
                            <strong>Duration:</strong>{' '}
                            {subSection.timeDuration} mins
                          </p>
                          

                          {subSection.videoURL && (
                            <video
                              src={subSection.videoURL}
                              controls
                              className="mt-3 w-full rounded-lg shadow-md"
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">
                        No subsections available.
                      </p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-400 mt-4">No sections available.</p>
      )}
    </div>
  );
};

export default AddEditSection;
