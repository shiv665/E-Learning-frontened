import React from 'react';
import { useParams } from 'react-router-dom';

const AboutUs = () => {
  const  {userId}  = useParams();
  console.log("User ID from URL:", userId);
  
  const stats = [
    { number: '5K', label: 'Active Students' },
    { number: '10+', label: 'Mentors' },
    { number: '200+', label: 'Courses' },
    { number: '50+', label: 'Awards' }
  ];

  const features = [
    {
      title: 'Curriculum Based on Industry Needs',
      description: 'Save time and money! The BitSolar curriculum is made to be easier to understand and in line with industry needs.',
      icon: '📚'
    },
    {
      title: 'Our Learning Methods',
      description: 'The learning process uses the namely online and offline.',
      icon: '🎯'
    },
    {
      title: 'Certification',
      description: 'You will get a certificate that can be used as a certification during job hunting.',
      icon: '🏆'
    },
    {
      title: 'Rating "Auto-grading"',
      description: 'You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.',
      icon: '⭐'
    },
    {
      title: 'Ready to Work',
      description: 'Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.',
      icon: '💼'
    }
  ];

  const learningImages = [
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Student learning online"
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Professional working on laptop"
    },
    {
      src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      alt: "Student taking notes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Driving Innovation in Online Education for a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Brighter Future
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
            E Learning is at the forefront of driving innovation in online education. We're passionate about creating a
            brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a
            vibrant learning community.
          </p>

          {/* Hero Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {learningImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl shadow-2xl group">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
            <blockquote className="text-2xl md:text-3xl font-light italic">
              "We are passionate about revolutionizing the way we learn. Our innovative platform{' '}
              <span className="text-cyan-400 font-semibold">combines technology</span>,{' '}
              <span className="text-orange-400 font-semibold">expertise</span>, and community to create an{' '}
              <span className="text-yellow-400 font-semibold">unparalleled educational experience</span>."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-pink-400">Our Founding Story</h2>
              <p className="text-gray-300 mb-6">
                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized the need for more accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-gray-300">
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Team collaboration"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
              <h3 className="text-3xl font-bold mb-6 text-orange-400">Our Vision</h3>
              <p className="text-gray-300">
                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.
                Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge
                technology with engaging content, fostering a dynamic and interactive learning experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
              <h3 className="text-3xl font-bold mb-6 text-cyan-400">Our Mission</h3>
              <p className="text-gray-300">
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment
                of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              World-Class Learning for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Anyone, Anywhere
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              E Learning partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to
              individuals and organizations worldwide.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:transform hover:scale-105">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black/40 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4 text-white">E Learning</div>
          <p className="text-gray-400">Empowering learners worldwide through innovative online education</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;