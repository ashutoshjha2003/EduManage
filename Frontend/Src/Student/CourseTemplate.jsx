import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Coursetemplate = ({ coursedata, batchName, courseimage }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {coursedata.map((item, index) => (
        <Link
          to={item.courseId}
          key={index}
          className="w-80 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
          <h1 className="text-xl font-bold text-blue-800 mb-3">{item.courseName}</h1>

          <img
            src={courseimage}
            loading="lazy"
            sizes="(max-width: 479px) 82vw, (max-width: 767px) 81vw, (max-width: 991px) 39vw, (max-width: 1439px) 23vw, 325px"
            srcSet={`
              ${courseimage}?w=500 500w,
              ${courseimage}?w=800 800w,
              ${courseimage} 820w
            `}
            alt={item.courseName}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="text-sm text-gray-600 font-medium">{item.courseId}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="text-sm text-gray-600 font-medium">{batchName}</div>
            </div>

            <div className="border-t mt-3 border-gray-200"></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

Coursetemplate.propTypes = {
  coursedata: PropTypes.arrayOf(
    PropTypes.shape({
      courseName: PropTypes.string.isRequired,
      courseId: PropTypes.string.isRequired,
    })
  ).isRequired,
  batchName: PropTypes.string.isRequired,
  courseimage: PropTypes.string.isRequired,
};

export default Coursetemplate;