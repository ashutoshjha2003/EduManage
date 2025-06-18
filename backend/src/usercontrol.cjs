// src/usercontrol.cjs
const userService = require('./userservices.cjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TeacherData, StudentData, TimetableData } = require('./indexmodules.cjs');
const UserData =require('./user.cjs');
// usercontrol.cjs
const NoticeData = require('./noticeModel.cjs');
const QuizData = require('./quizModel.cjs');
const GradeData = require('./gradeModel.cjs');
const LectureData = require('./lectureModel.cjs')

// Add Notice
const addNoticeControllerFn = async (req, res) => {
    try {
        const newNotice = new NoticeData(req.body);
        await newNotice.save();
        res.status(201).send('Notice added successfully');
    } catch (error) {
        res.status(500).send('Error adding notice: ' + error.message);
    }
};

const getNoticesControllerFn = async (req, res) => {
    try {
        const notices = await NoticeData.find({ courseId: req.query.courseId, batchId: req.query.batchId });
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).send('Error fetching notices: ' + error.message);
    }
};

// Add Lecture
const addLectureControllerFn = async (req, res) => {
    try {
        const newLecture = new LectureData(req.body);
        await newLecture.save();
        res.status(201).send('Lecture added successfully');
    } catch (error) {
        res.status(500).send('Error adding lecture: ' + error.message);
    }
};

// Get lectures based on courseId and batchId (if needed)
const getLecturesControllerFn = async (req, res) => {
    try {
        const lectures = await LectureData.find({ courseId: req.query.courseId, batchId: req.query.batchId });
        res.status(200).json(lectures);
    } 
    catch (error) {
        res.status(500).send('Error fetching lectures: ' + error.message);
    }
};


// Add Quiz
const addQuizControllerFn = async (req, res) => {
    try {
        const newQuiz = new QuizData(req.body);
        await newQuiz.save();
        res.status(201).send('Quiz added successfully');
    } catch (error) {
        res.status(500).send('Error adding quiz: ' + error.message);
    }
};

const getQuizzesControllerFn = async (req, res) => {
    try {
        const { courseId, batchId } = req.query;
        const quizzes = await QuizData.find({ courseId, batchId });

        const quizzesWithStudents = await Promise.all(quizzes.map(async (quiz) => {
            const grades = await GradeData.find({ quizId: quiz.quizId }); // Use quizId for finding grades
            return {
                ...quiz._doc,
                students: grades.map(grade => ({
                    studentId: grade.studentId,
                    grade: grade.grade,
                    gradedMarks: grade.gradedMarks
                }))
            };
        }));

        res.status(200).json(quizzesWithStudents);
    } catch (error) {
        res.status(500).send('Error fetching quizzes: ' + error.message);
    }
};
const addGradeControllerFn = async (req, res) => {
    try {
        const { courseId, batchId, grades } = req.body;
        for (const grade of grades) {
            await GradeData.findOneAndUpdate(
                { courseId, batchId, studentId: grade.studentId, quizId: grade.quizId },
                { grade: grade.grade, gradedMarks: grade.gradedMarks },
                { upsert: true, new: true }
            );
        }
        res.status(201).send('Grades added/updated successfully');
    } catch (error) {
        res.status(500).send('Error adding/updating grades: ' + error.message);
    }
};

const getGradesControllerFn = async (req, res) => {
    try {
        const grades = await GradeData.find({ courseId: req.query.courseId, batchId: req.query.batchId });
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).send('Error fetching grades: ' + error.message);
    }
};

const getProgressDataControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch progress data for the teacher with the specified name
        const progressData = await userService.getProgressDataService(name);
        res.status(200).json(progressData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getteacherProfileDataControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch progress data for the teacher with the specified name
        const progressData = await userService.getteacherProfileDataService(name);
        res.status(200).json(progressData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getProfileDataControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch progress data for the teacher with the specified name
        const progressData = await userService.getProfileDataService(name);
        res.status(200).json(progressData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getcourseDataControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch progress data for the teacher with the specified name
        const progressData = await userService.getcourseDataService(name);
        res.status(200).json(progressData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSessionsControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch sessions for the teacher with the specified name
        const sessions = await userService.getSessionsService(name);
        res.status(200).json(sessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getBatchesByTeacherControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch batches for the teacher with the specified name
        const batches = await userService.getBatchesByTeacherService(name);
        res.status(200).json(batches);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getLeavesByTeacherControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch leaves for the teacher with the specified name
        const leaves = await userService.getLeavesByTeacherService(name);
        res.status(200).json(leaves);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getLectureByTeacherControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch lectures for the teacher with the specified name
        const leaves = await userService.getLecturesByTeacherService(name);
        res.status(200).json(leaves);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getstudentProgressDataControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch progress data for the teacher with the specified name
        const progressData = await userService.getstudentProgressDataService(name);
        res.status(200).json(progressData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getstudentattendanceControllerFn = async (req, res) => {
    try {
        const { studentId } = req.params;
       
        // Fetch progress data for the teacher with the specified name
        const progressData = await userService.getstudentattendanceService(studentId);
        res.status(200).json(progressData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getstudentSessionsControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch sessions for the teacher with the specified name
        const sessions = await userService.getstudentSessionsService(name);
        res.status(200).json(sessions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getstudentquizesControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch batches for the teacher with the specified name
        const batches = await userService.getstudentquizesService(name);
        res.status(200).json(batches);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getstudentfacultyControllerFn = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }
        // Fetch leaves for the teacher with the specified name
        const leaves = await userService.getstudentfacultyService(name);
        res.status(200).json(leaves);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const addLeaveRequestControllerFn = async (req, res) => {
    try {
        const status = await userService.addLeaveRequestService(req.body);
        if (status) {
            res.send({ status: true, message: "Leave request created successfully" });
        } else {
            res.send({ status: false, message: "Error creating leave request" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateLeaveStatusControllerFn = async (req, res) => {
    try {
        const { leaveId, newStatus } = req.body;
        const updateStatus = await userService.updateLeaveStatusService(leaveId, newStatus);
        if (updateStatus) {
            res.send({ status: true, message: "Leave status updated successfully" });
        } else {
            res.send({ status: false, message: "Error updating leave status" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getLeaveRequestsControllerFn = async (req, res) => {
    try {
        const leaveRequests = await userService.getLeaveRequestsService();
        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const createUserControllerFn = async (req, res) => {
    try {
        const status = await userService.createUserDBService(req.body);
        if (status) {
            res.send({ status: true, message: "User created successfully" });
        } else {
            res.send({ status: false, message: "Error creating user" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addStudentControllerFn = async (req, res) => {
    try {
        const status = await userService.addStudentService(req.body);
        if (status) {
            res.send({ status: true, message: "Student added successfully" });
        } else {
            res.send({ status: false, message: "Error adding student" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addTeacherControllerFn = async (req, res) => {
    try {
        const status = await userService.addTeacherService(req.body);
        if (status) {
            res.send({ status: true, message: "Teacher added successfully" });
        } else {
            res.send({ status: false, message: "Error adding teacher" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addCourseControllerFn = async (req, res) => {
    try {
        const status = await userService.addCourseService(req.body);
        if (status) {
            res.send({ status: true, message: "Course added successfully" });
        } else {
            res.send({ status: false, message: "Error adding course" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addBatchControllerFn = async (req, res) => {
    try {
        const status = await userService.addBatchService(req.body);
        if (status) {
            res.send({ status: true, message: "Batch added successfully" });
        } else {
            res.send({ status: false, message: "Error adding batch" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getStudentsControllerFn = async (req, res) => {
    try {
      // You can filter students based on query parameters (e.g., batch)
      const students = await StudentData.find({}); // Find all students
  
      res.status(200).json(students);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getTeachersControllerFn = async (req, res) => {
    try {
      // You can filter teachers based on query parameters (e.g., course)
      const teachers = await TeacherData.find({}); // Find all teachers
  
      res.status(200).json(teachers);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
const getCoursesControllerFn = async (req, res) => {
    try {
        const courses = await userService.getCoursesService();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getCourseidControllerFn = async (req, res) => {
    try {
        const courseId = req.params.id;
        const studentId = req.query;
        const course = await userService.getCourseidService(courseId,studentId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.status(200).json(course);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getBatchesControllerFn = async (req, res) => {
    try {
        const batches = await userService.getBatchesService();
        res.status(200).json(batches);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const signUp = async (req, res) => {
    try { 
        console.log(req.body);  
        const data = req.body; 

        const adminExists = await UserData.findOne({ role: 'admin' });
        // Only one admin
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("admin", salt); // data.password
            const adminUser = new UserData({
                username: 'admin', // data.username
                email: 'admin@example.com', //data.email
                password: hashedPassword, 
                role: 'admin'
            });

            await adminUser.save();
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    } 
};
const addTimetableControllerFn = async (req, res) => {
    try {
        const status = await userService.addTimetableService(req.body);
        if (status) {
            res.send({ status: true, message: "Timetable added successfully" });
        } else {
            res.send({ status: false, message: "Error adding timetable" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTimetableControllerFn = async (req, res) => {
    try {
        const { batchId } = req.query;
        const timetables = await userService.getTimetableService(batchId);
        res.json(timetables);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
         

        const user = await UserData.findOne({ username }); 
        
        if (!user) { 
            console.log({username,password});
            return res.status(401).json({ message: 'Invalid username or password' });
        } 
        console.log(user); 
        
        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        const token = jwt.sign({ userId: user._id, role: user.role }, "secret", { expiresIn: "1d" });

        const { email } = user;

        res.status(200).json({ message: 'Login successful', token, role: user.role, username, email });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAttendanceByCourseAndBatch = async (req, res) => {
    try {
        const { courseId, batchId } = req.query;
        const attendanceData = await userService.getAttendanceByCourseAndBatch(courseId, batchId);
        res.status(200).json(attendanceData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateStudentAttendance = async (req, res) => {
    try {
        const { courseId, batchId, studentId } = req.params;
        const { present } = req.body;
        await userService.updateStudentAttendance(courseId, batchId, studentId, present);
        res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getCoursesByTeacherControllerFn = async (req, res) => {
    const teacherId = req.query.teacherId; 
   // Get teacherId from query parameters
    try {
      const courses = await userService.getCoursesByTeacherService(teacherId);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getBatchesTeacherControllerFn = async (req, res) => {
    const teacherId = req.query.teacherId; // Get teacherId from query parameters
    try {
      const batches = await userService.getBatchesTeacherService(teacherId);
      res.status(200).json(batches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// usercontrol.cjs
const getstudentTimetableControllerFn = async (req, res) => {
    const { studentId } = req.params;
    try {
      const timetable = await userService.getstudentTimetableService(studentId);
      res.json(timetable);
    } catch (error) {
      res.status(500).send('Error fetching timetable');
    }
  };
  
  const attemptQuizControllerFn = async (req, res) => {
    try {
        const { courseId, batchId, studentId, quizId } = req.body;

        // Find and update the existing record or create a new one
        await GradeData.findOneAndUpdate(
            { courseId, batchId, studentId, quizId },
            { 
                courseId,
                batchId,
                studentId,
                quizId,
                grade: null, // Initial grade as null
                gradedMarks: null // Initial graded marks as null
            },
            { upsert: true, new: true }
        );

        res.status(201).send('Quiz attempt recorded successfully');
    } catch (error) {
        res.status(500).send('Error recording quiz attempt: ' + error.message);
    }
};
module.exports = {
    createUserControllerFn,
    addStudentControllerFn,
    addTeacherControllerFn,
    signUp,
    login,
    addCourseControllerFn,
    addBatchControllerFn,
    getCoursesControllerFn,
    getBatchesControllerFn,
    getStudentsControllerFn,
    getTeachersControllerFn,
    addTimetableControllerFn,
    getTimetableControllerFn,
    getAttendanceByCourseAndBatch,
    addLeaveRequestControllerFn,
    updateLeaveStatusControllerFn,
    getLeaveRequestsControllerFn,
    updateStudentAttendance,
    getProgressDataControllerFn,
    getSessionsControllerFn,
    getBatchesByTeacherControllerFn,
    getLeavesByTeacherControllerFn,
    getLectureByTeacherControllerFn,
    getstudentProgressDataControllerFn,
    getstudentattendanceControllerFn,
    getstudentSessionsControllerFn,
    getstudentquizesControllerFn,
    getstudentfacultyControllerFn,
    getCoursesByTeacherControllerFn,
    getBatchesTeacherControllerFn,
    addNoticeControllerFn,
    getNoticesControllerFn,
    addQuizControllerFn,
    addLectureControllerFn,
    getLecturesControllerFn,
    getQuizzesControllerFn,
    addGradeControllerFn,
    getGradesControllerFn,
    getProfileDataControllerFn,
    getcourseDataControllerFn,
    getteacherProfileDataControllerFn,
    getstudentTimetableControllerFn,
    getCourseidControllerFn,
    attemptQuizControllerFn
};
