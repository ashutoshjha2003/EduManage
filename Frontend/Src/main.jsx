import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import TeacherApp from './TeacherApp.jsx';
import AdminApp from './AdminApp.jsx';
import './index.css';
import Dashboard from './Student/Dashboard.jsx';
import Profile from './Student/Profile.jsx';
import Attendance from './Student/Attendance.jsx';
import Timetable from './Student/Timetable.jsx';
import Course from './Student/Course.jsx';
import CoursePage from './Student/CoursePage.jsx';
import TeacherDashboard from './Teacher/TeacherDashboard.jsx';
import TeacherProfile from './Teacher/TeacherProfile.jsx';
import TeacherAttendance from './Teacher/TeacherAttendance.jsx';
import TeacherTimetable from './Teacher/TeacherTimetable.jsx';
import TeacherAddLecture from './Teacher/TeacherAddLecture.jsx';
import TeacherAddNotice from './Teacher/TeacherAddNotice.jsx';
import TeacherAddQuize from './Teacher/TeacherAddQuize.jsx';
import TeacherAddGradeQuize from './Teacher/TeacherAddGradeQuize.jsx';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import AdminProfile from './Admin/AdminProfile.jsx';
import AdminAttendance from './Admin/AdminAttendance.jsx';
import AdminTimetable from './Admin/AdminTimetable.jsx';
import AdminCourse from './Admin/AdminCourse.jsx';
import Adminadd from './Admin/AdminAddCourse.jsx';
import AdminViewStudents from './Admin/AdminViewStudents.jsx';
import AdminViewTeachers from './Admin/AdminViewTeachers.jsx';
import AdminViewCourses from './Admin/AdminViewCourse.jsx';
import AdminViewBatches from './Admin/AdminViewBatch.jsx';
import Signin from './Signin.jsx';

const BodyBackgroundColor = ({ children, color }) => {
  useEffect(() => {
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [color]);

  return children || null;
};

const RoleBasedRoute = ({ element, roles }) => {
  const role = localStorage.getItem('role');
  if (roles.includes(role)) {
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};
const token = localStorage.getItem('token');
const AppWithTokenCheck = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
   
    
  }, []);
  if (token=="null") {
      
    window.location = '/signin';
  }
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<BodyBackgroundColor color="rgb(12, 15, 23)"><Signin /></BodyBackgroundColor>} />
        <Route path="/admin" element={<RoleBasedRoute roles={['admin']} element={<><AdminDashboard /><AdminApp /></>} />} />
        <Route path='/viewstudents' element={<RoleBasedRoute roles={['admin']} element={<><AdminViewStudents/><AdminApp /> </>} />} />
        <Route path='/viewteachers' element={<RoleBasedRoute roles={['admin']} element={<><AdminViewTeachers/><AdminApp /> </>} />} />
        <Route path='/viewcourses' element={<RoleBasedRoute roles={['admin']} element={<><AdminViewCourses/><AdminApp /> </>} />} />
        <Route path='/viewbatches' element={<RoleBasedRoute roles={['admin']} element={<><AdminViewBatches/><AdminApp /> </>} />} />
        <Route path="/adminprofile" element={<RoleBasedRoute roles={['admin']} element={<><AdminProfile /><AdminApp /></>} />} />
        <Route path="/adminattendance" element={<RoleBasedRoute roles={['admin']} element={<><AdminAttendance /><AdminApp /></>} />} />
        <Route path="/admintimetable" element={<RoleBasedRoute roles={['admin']} element={<><AdminTimetable /><AdminApp /></>} />} />
        <Route path="/admincourse" element={<RoleBasedRoute roles={['admin']} element={<><AdminCourse /><AdminApp /></>} />} />
        <Route path="/adminadd" element={<RoleBasedRoute roles={['admin']} element={<><Adminadd /><AdminApp /></>} />} />
        <Route path="/" element={<RoleBasedRoute roles={['student']} element={<><Dashboard /><App /></>} />} />
        <Route path="/profile" element={<RoleBasedRoute roles={['student']} element={<><Profile /><App /></>} />} />
        <Route path="/attendance" element={<RoleBasedRoute roles={['student']} element={<><Attendance /><App /></>} />} />
        <Route path="/timetable" element={<RoleBasedRoute roles={['student']} element={<><Timetable /><App /></>} />} />
        <Route path="/course" element={<RoleBasedRoute roles={['student']} element={<><Course /><App /></>} />} />
        <Route path="/teacher" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherDashboard /><TeacherApp /></>} />} />
        <Route path="/teacherprofile" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherProfile /><TeacherApp /></>} />} />
        <Route path="/teacheraddnotice" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherAddNotice /><TeacherApp /></>} />} />
        <Route path="/teacheraddquize" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherAddQuize /><TeacherApp /></>} />} />
        <Route path="/teacheraddgradequize" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherAddGradeQuize /><TeacherApp /></>} />} />
        <Route path="/teacherattendance" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherAttendance /><TeacherApp /></>} />} />
        <Route path="/teachertimetable" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherTimetable /><TeacherApp /></>} />} />
        <Route path="/teacheraddlecture" element={<RoleBasedRoute roles={['teacher']} element={<><TeacherAddLecture /><TeacherApp /></>} />} />
        <Route path="/course/:courseid" element={<RoleBasedRoute roles={['student']} element={<><CoursePage /><App /></>} />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithTokenCheck />
  </React.StrictMode>
);
