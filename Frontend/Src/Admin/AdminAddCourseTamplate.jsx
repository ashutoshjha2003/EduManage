import React, { useState, useEffect } from "react";
import AddcourseForm from "./addcourse";
import AddbatchForm from "./addbatch";

const AdminPanel = ({ onAddcourse, onAddbatch }) => {
  const [activeTab, setActiveTab] = useState("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (activeTab === 'viewCourses' || activeTab === 'addBatch') {
      fetchCourses();
    } else if (activeTab === 'viewBatches') {
      fetchBatches();
    }
  }, [activeTab]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:8080/courses');
      const data = await res.json();
      setCourses(data);
      console.log('Course data fetched:', data);
    } catch (error) {
      console.error('Failed to fetch Course:', error);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch('http://localhost:8080/batches');
      const data = await res.json();
      setBatches(data);
      console.log('Batch data fetched:', data);
    } catch (error) {
      console.error('Failed to fetch Batches:', error);
    }
  };

  return (
    <div className="p-8 sm:p-10 md:p-16 bg-gradient-to-br from-blue-100 to-white font-sans flex flex-col items-center animate-fade-in">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full max-w-5xl">
        {[
          { id: "addCourse", label: "Add Course", img: "../../Images/add course.jpg" },
          { id: "addBatch", label: "Add Batch", img: "../../Images/add batch.jpg" },
        ].map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer text-center border-2 rounded-2xl px-4 py-6 transition-all duration-300 shadow-md hover:-translate-y-1 ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-white text-indigo-600 border-indigo-600"
            }`}
          >
            <img
              src={tab.img}
              alt={tab.label}
              className="w-16 h-16 mb-3 mx-auto rounded-full shadow-md object-contain"
            />
            <strong className="text-lg font-semibold">{tab.label}</strong>
          </div>
        ))}
      </div>

      <div className="w-full max-w-6xl bg-white p-8 rounded-3xl border border-blue-200 shadow-xl transition-transform duration-300 hover:scale-[1.02] animate-fade-in">
        {activeTab === "addCourse" && (
          <>
            <h3 className="text-2xl font-semibold text-indigo-700 border-l-8 border-indigo-600 pl-4 mb-6">📚 Add Course</h3>
            <AddcourseForm onAddcourse={onAddcourse} />
          </>
        )}

        {activeTab === "addBatch" && (
          <>
            <h3 className="text-2xl font-semibold text-indigo-700 border-l-8 border-indigo-600 pl-4 mb-6">👥 Add Batch</h3>
            <AddbatchForm onAddbatch={onAddbatch} courses={courses} />
          </>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;