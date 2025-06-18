import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coursetemplate from './coursetemplate';
import Quizes from './quizes';
import { motion } from 'framer-motion';

const Course = () => {
  const [data, setData] = useState([]);
  const [batchName, setBatchName] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [showQuizzes, setShowQuizzes] = useState(false);

  const courseimage = 'https://www.hurix.com/wp-content/uploads/2019/12/Picture2.png';

  useEffect(() => {
    const userid = localStorage.getItem('userName');

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/coursedata?name=${userid}`);
        setData(response.data.courses);
        setBatchName(response.data.batchName.batchName);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }

      try {
        const quizResponse = await axios.get(`http://localhost:8080/studentquizes?name=${userid}`);
        setQuizzes(quizResponse.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 mt-12 bg-white rounded-2xl">
      {/* Left Panel */}
      <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 text-black">
        <Coursetemplate
          coursedata={data}
          batchName={batchName}
          courseimage={courseimage}
        />
      </div>

      {/* Right Panel */}
      <div className="flex-[1.2] bg-white rounded-2xl p-6 shadow-lg transition-all duration-300">
        {/* Quiz Header */}
        <div
          className="w-52 cursor-pointer"
          onClick={() => setShowQuizzes(!showQuizzes)}
        >
          <img
            src="../../Images/Upcoming Quize.jpg"
            alt="Upcoming Quizzes"
            className="w-full h-[220px] object-cover rounded-xl mb-4 transition-transform duration-300 hover:scale-105"
          />
          <h4 className="text-center text-gray-700 text-lg font-semibold">Upcoming Quizzes</h4>
        </div>

        {/* Quiz Section */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: showQuizzes ? 'auto' : 0, opacity: showQuizzes ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden"
        >
          {showQuizzes && <Quizes quizdata={quizzes} />}
        </motion.div>
      </div>
    </div>
  );
};

export default Course;