const bcrypt = require('bcryptjs');
const UserData = require('./user.cjs');
const { TeacherData, StudentData, TimetableData } = require('./indexmodules.cjs');
const CourseData = require('./courseModel.cjs');
const BatchData = require('./batchModel.cjs');
const Attendance = require('./attendanceModel.cjs');
const LeaveData = require('./leaveModel.cjs');
const QuizData = require('./quizModel.cjs');
const NoticeData = require('./noticeModel.cjs');
const GradeData = require('./gradeModel.cjs');
const LectureData = require('./lectureModel.cjs')

const getProgressDataService = async (teacherId) => {
    try {
        // Fetch courses taught by the teacher
        const teachers = await TeacherData.find({ teacherId });
       
        // Collect all batch IDs taught by the teacher
        const batchIds = teachers.reduce((acc, teacher) => {
            acc.push(...teacher.batchIds);
            return acc;
        }, []);

        // Fetch batch data for all collected batch IDs
        const batches = await BatchData.find({ batchId: { $in: batchIds } });

        // Create progress data from batches
        const progressData = [];
        batches.forEach(batch => {
            batch.courseIds.forEach(courseId => {
                progressData.push({
                    value: batch.strength,
                    label: courseId
                });
            });
        });

       
        return progressData;
    } catch (error) {
        throw new Error('Error fetching progress data: ' + error.message);
    }
};

const getSessionsService = async (teacherId) => {
    try {

        // Fetch sessions related to the teacher
        const sessions = await TimetableData.find({ teacherId });
       

        // Collect batch IDs from the fetched sessions
        const batchIds = sessions.map(session => session.batchId);

        // Fetch batch details for the collected batch IDs
        const batches = await BatchData.find({ batchId: { $in: batchIds } });

        // Create a map of batchId to batch details for quick lookup
        const batchMap = batches.reduce((acc, batch) => {
            acc[batch.batchId] = batch;
            return acc;
        }, {});

        // Map the session data with batch details
        const sessionData = sessions.map(session => ({
            courseName: session.courseName,
            batch: batchMap[session.batchId]?.batchName || 'Unknown',
            strength: batchMap[session.batchId]?.strength || 0,
            room: session.room,
            day:session.day,
            time:session.startTime
        }));

       
        return sessionData;
    } catch (error) {
        throw new Error('Error fetching session data: ' + error.message);
    }
};


const getBatchesByTeacherService = async (teacherId) => {
    try {
       
        // Fetch batches related to the teacher
        const teacher = await TeacherData.findOne({ teacherId });
        if (!teacher) {
            return []; // Return empty array if no teacher found
        }
        const batchIds = teacher.batchIds;

        // Fetch batch details for the collected batch IDs
        const batches = await BatchData.find({ batchId: { $in: batchIds } });

        // Create a map of batchId to batch details for quick lookup
        const batchMap = batches.reduce((acc, batch) => {
            acc[batch.batchId] = batch;
            return acc;
        }, {});

       
        const batchData = batches.map(batch => ({
            courseIds: batch.courseIds,
            batch: batchMap[batch.batchId]?.batchName || 'Unknown',
            strength: batchMap[batch.batchId]?.strength || 0,
        }));
        return batchData;
    } catch (error) {
        throw new Error('Error fetching batch data: ' + error.message);
    }
};

const getLeavesByTeacherService = async (name) => {
    try {
 
      const leaveRequests = await LeaveData.find({ teacherId: name });
      return leaveRequests;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

const getLecturesByTeacherService = async (name) => {
    try {
        const lectures = await LectureData.find({ teacherId: name });
        return lectures;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

  const getteacherProfileDataService = async (teacherId) => {
    try {
        const teacher = await TeacherData.findOne({ teacherId });
        const profileData = {
          name: teacher.teacherName,
          email:teacher.teacherEmail

        };
    
        return profileData;
    } catch (error) {
        console.error('Error fetching student profile data:', error.message);
    }
};
  const getcourseDataService = async (studentId) => {
    try {
        // Find the student
        const student = await StudentData.findOne({ studentId });
        if (!student) {
          throw new Error('Student not found');
        }
    
        // Find the batch of the student
        const batch = await BatchData.findOne({ batchId: student.batch });
        if (!batch) {
          throw new Error('Batch not found');
        }
    
        // Retrieve course details for courses belonging to the student's batch
        const courses = await CourseData.find({ courseId: { $in: batch.courseIds } });
    
        // Construct the response object
        const courseData = {
          courses: courses,
          batchName: batch// Add the batchName here
        };
    
       
        return courseData;
      } catch (error) {
        console.error('Error fetching student profile data:', error.message);
        throw error; // Propagate the error to the caller
      }
    };

  const getProfileDataService = async (studentId) => {
    try {
        console.log("stuentId", studentId);
        const student = await StudentData.findOne({ studentId });
        if (!student) {
          throw new Error('Student not found');
        }
    
         console.log("student",student);
        const batch = await BatchData.findOne({ batchId: student.batch });
        if (!batch) {
          throw new Error('Batch not found');
        }
    
        const courseIds = batch.courseIds;
    
        const profileData = {
          name: student.studentName,
          password: student.password,
          batch: student.batch,
          userName: student.studentId,
          email: student.studentEmail,
          courseIds: courseIds,
        };
    
        return profileData;
    } catch (error) {
        console.error('Error fetching student profile data:', error.message);
    }
};
const getstudentattendanceService = async (studentId) => {
   
    try {
        const student = await StudentData.findOne({ studentId });
        if (!student) throw new Error('Student not found');

        const batch = await BatchData.findOne({ batchId: student.batch });
        if (!batch) throw new Error('Batch not found for the student');

        const attendance = await Attendance.find({ batchId: student.batch, 'students.studentId': studentId });
        if (!attendance) throw new Error('Attendance data not found for the batch');

        const attendanceRecords = [];
        for (const courseId of batch.courseIds) {
            const course = await CourseData.findOne({ courseId });
            if (!course) continue;

            const studentAttendance = attendance.find(a => a.courseId === courseId).students.find(s => s.studentId === studentId);
            if (!studentAttendance) continue;

            attendanceRecords.push({
                courseId: course.courseId,
                courseName: course.courseName,
                totalClasses: course.duration,
                classesAttended: studentAttendance.present,
                attendancePercentage: (studentAttendance.present / course.duration) * 100,
            });
        }
  
        return attendanceRecords;
    } catch (error) {
        console.error('Error fetching student attendance:', error.message);
        throw error;
    }
};
const getstudentProgressDataService = async (studentId) => {
    try {
        // Find the student by studentId
        const student = await StudentData.findOne({ studentId });
        if (!student) throw new Error('Student not found');

        const batch = await BatchData.findOne({ batchId: student.batch });
        if (!batch) throw new Error('Batch not found for the student');

        const attendance = await Attendance.find({ batchId: student.batch, 'students.studentId': studentId });
        if (!attendance) throw new Error('Attendance data not found for the batch');

        // Initialize an empty array to store progress data
        const progressData = [];

        // Iterate over the courseIds in the student's batch
        for (const courseId of batch.courseIds) {
            const course = await CourseData.findOne({ courseId });
            if (!course) continue;

            const studentAttendance = attendance.find(a => a.courseId === courseId).students.find(s => s.studentId === studentId);
            if (!studentAttendance) continue;
        

            // Calculate attendance percentage
            const attendancePercentage = studentAttendance ? (studentAttendance.present / parseInt(course.duration)) * 100 : 0;

            // Push the progress data for the current course
            progressData.push({
                value: parseInt(attendancePercentage),
                label: `${course.courseName}`
            });
        }

        console.log('Progress Data:', progressData);
        return progressData;
    } catch (error) {
        console.error('Error fetching progress data:', error.message);
        throw new Error('Error fetching progress data: ' + error.message);
    }
};


const getstudentSessionsService = async (studentId) => {
    try {
        const student = await StudentData.findOne({ studentId });

       

        // Fetch the batch for the student
        const batch = await BatchData.findOne({ batchId: student.batch });

      

        // Fetch sessions related to the student's batch
        const sessions = await TimetableData.find({ batchId: student.batch });

        // Create a map of batchId to batch details for quick lookup
        const batchMap = { [student.batch]: batch };
        
        // Map the session data with batch details
        const sessionData = sessions.map(session => ({
            courseName: session.courseName,
            batch: batchMap[session.batchId]?.batchName || 'Unknown',
            strength: batchMap[session.batchId]?.strength || 0,
            room: session.room,
            day: session.day,
            time: session.startTime,
            teacherId:session.teacherName
        }));

        return sessionData;
    } catch (error) {
        throw new Error('Error fetching session data: ' + error.message);
    }
};

const getstudentquizesService = async (studentId) => {
    try {
        // Find the student with the given studentId
        const student = await StudentData.findOne({ studentId });

        if (!student) {
            throw new Error('Student not found');
        }

        // Fetch the batch for the student
        const batch = await BatchData.findOne({ batchId: student.batch });

        if (!batch) {
            throw new Error('Batch not found for the student');
        }

        // Fetch quizzes based on the courses associated with the student's batch
        const quizzes = await QuizData.find({ courseId: { $in: batch.courseIds }, batchId: student.batch });

        // Transform the quiz data into the format expected by the Events component
        const event = quizzes.map(quiz => ({
            quiztime: quiz.quizTime,
            quiz: quiz.quizName,
            courseid: quiz.courseId
        }));

        return event;
    } catch (error) {
        if (error.message.includes('Batch not found for the student')) {
            return Array(0); // Return an empty array if batch is not found
        } else {
            throw new Error('Error fetching quizzes data: ' + error.message);
        }
    }
};



const getstudentfacultyService = async (studentId) => {
    
        try {
            // Find the student with the given studentId
            const student = await StudentData.findOne({ studentId });
    
         
            // Fetch teachers associated with the batch of the student
            const teachers = await TeacherData.find({ batchIds: student.batch });
    
            // Transform the teacher data into the format expected by the Faculty component
            const faculties = teachers.map(teacher => ({
                userid: teacher.teacherId,
                name: teacher.teacherName,
                course: teacher.courseId // Assuming this is the course the teacher is associated with
            }));
    
            return faculties;
        } catch (error) {
            throw new Error('Error fetching student faculty data: ' + error.message);
        }
};

 

  const addLeaveRequestService = async (leaveDetails) => {
    try {
        // Fetch the teacher's name
        const teacher = await TeacherData.findOne({ teacherId: leaveDetails.teacherId });

        if (!teacher) {
            throw new Error('Teacher not found');
        }

        const teacherName = teacher.teacherName;

        const data = {
            ...leaveDetails,
            teacherName: teacherName,
            status: 'Pending',
        };

        const newLeaveRequest = new LeaveData(data);
        await newLeaveRequest.save();
        return true;
    } catch (err) {
        console.error('Error adding leave request:', err);
        return false;
    }
};



const updateLeaveStatusService = async (leaveId, newStatus) => {
    try {
      
        const leaveRequest = await LeaveData.findOne({ leaveId });
       
        if (leaveRequest) {
            leaveRequest.status = newStatus;
            await leaveRequest.save();
            return true;
        }
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const getLeaveRequestsService = async () => {
    try {
        const leaveRequests = await LeaveData.find({});
        return leaveRequests;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createUserDBService = (userDetails) => {
    return new Promise((resolve, reject) => {
        const userModelData = new UserData(userDetails);
        userModelData.save()
            .then(result => {
              
                resolve(true);
            })
            .catch(err => {
                console.error(err);
                resolve(false);
            });
    });
};

const getAttendanceByCourseAndBatch = async (courseId, batchId) => {
    try {
        const attendance = await Attendance.findOne({ courseId, batchId });
        
        return attendance ? attendance.students : [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateStudentAttendance = async (courseId, batchId, studentId, present) => {
    try {
        const attendance = await Attendance.findOne({ courseId, batchId });
       
        if (attendance) {
            const student = attendance.students.find(s => s.studentId === studentId);
            if (student) {
                student.present = present;
            } else {
                attendance.students.push({ studentId, present });
            }
            await attendance.save();
        } else {
            await Attendance.create({
                courseId,
                batchId,
                students: [{ studentId, present }]
            });
        }
    } catch (error) {
        throw new Error('Error while updating attendance');
    }
};

const addStudentService = async (studentDetails) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(studentDetails.password, salt);
         
        console.log("studentDetails",studentDetails);
        const newUser = new UserData({
            username: studentDetails.studentId,
            email: studentDetails.studentEmail,
            password: hashedPassword,
            role: 'student',
            // batchId: studentDetails.batchId
        });

        await newUser.save();

        const newStudent = new StudentData(studentDetails);
        await newStudent.save();

        const { courseIds, batch } = studentDetails;
        const batchId = batch;

        for (const courseId of courseIds) {
            let attendance = await Attendance.findOne({ courseId, batchId });
            if (!attendance) {
                attendance = new Attendance({ courseId, batchId, students: [] });
            }
            attendance.students.push({ studentId: studentDetails.studentId, studentName: studentDetails.studentName, present: 0 });
            await attendance.save();
        }
 
        await newUser.save();

        const newTeacher = new TeacherData(teacherDetails);
        
        await newTeacher.save();

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const addCourseService = async (courseDetails) => {
    try {
        const newCourse = new CourseData(courseDetails);
      
        await newCourse.save();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const addBatchService = async (batchDetails) => {
    try {
        const newBatch = new BatchData(batchDetails);
        
        await newBatch.save();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const getCoursesService = async () => {
    try {
        const courses = await CourseData.find({});
        return courses;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getCourseidService = async (courseId, studentId) => {
    try {
        // Fetch course details
        const course = await CourseData.findOne({ courseId });
    
        if (!course) {
            throw new Error('Course not found');
        }

        // Fetch student details
        const student = await StudentData.findOne( studentId  );
        if (!student) {
            throw new Error('Student not found');
        }

        // Fetch the batch for the student
        const batch = await BatchData.findOne({ batchId: student.batch });

        if (!batch) {
            throw new Error('Batch not found for the student');
        }

        // Fetch notices related to the course
        const notices = await NoticeData.find({ courseId, batchId: student.batch });

        // Fetch lectures related to the course
        const lectures = await LectureData.find({ courseId, batchId: student.batch})

        // Fetch quizzes based on the courses associated with the student's batch
        const quizzes = await QuizData.find({ courseId, batchId: student.batch });

        // Fetch grades related to the course and student
        let grades = [];
        const id=student.studentId;
     
        try {
            grades = await GradeData.find({ courseId, studentId:id });
        } catch (e) {
            // Handle error if needed
        }
       
        // Map the grades to quizzes ensuring we get the latest grade
        const quizzesWithGrades = quizzes.map(quiz => {
            const quizGrades = grades.filter(grade => grade.batchId === quiz.batchId && grade.courseId === quiz.courseId);
            const latestGrade = quizGrades.length > 0 ? quizGrades[quizGrades.length - 1] : null;
            return {
                title: quiz.quizName,
                time: quiz.quizTime,
                quizId:quiz.quizId,
                grade: latestGrade ? latestGrade.grade : quiz.grade,
                link: quiz.link,
                gradedMarks: latestGrade ? latestGrade.gradedMarks : null
            };
        });

        // Construct the response object
        const courseDetails = {
            id: course.courseId,
            name: course.courseName,
            notices: notices.map(notice => ({ title: notice.title, content: notice.content })),
            lectures: lectures.map(lecture => ({ title: lecture.title, description: lecture.description, videoUrl: lecture.videoUrl})), 
            quizzes: quizzesWithGrades,
        };


        return courseDetails;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


const getBatchesService = async () => {
    try {
        const batches = await BatchData.find({});
        return batches;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const addTimetableService = async (timetableDetails) => {
    try {
        const newTimetable = new TimetableData(timetableDetails);
        await newTimetable.save();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

const getTimetableService = async (batchId) => {
    try {
        const timetables = await TimetableData.find({ batchId }).sort({ lastUpdated: -1 });
        return timetables;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
const getCoursesByTeacherService = async (teacherId) => {
    
    try {
      const teacher = await TeacherData.findOne({ teacherId });

      if (!teacher) {
        throw new Error('Teacher not found');
      }
      const courses = await CourseData.find({ courseId: { $in: teacher.courseId } });
 
      return courses;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  const getBatchesTeacherService = async (teacherId) => {
    
    try {
      const teacher = await TeacherData.findOne({ teacherId });
      if (!teacher) {
        throw new Error('Teacher not found');
      }
      const batches = await BatchData.find({ batchId: { $in: teacher.batchIds } });
   
      return batches;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const getstudentTimetableService = async (studentId) => {
    try {
      // Find the student with the given studentId
      const student = await StudentData.findOne({ studentId });
       
      if (!student) {
        throw new Error('Student not found');
      }
  
      // Fetch the batchId for the student
      const batchId = student.batch;
  
      // Fetch timetable data for the batch
      const timetables = await TimetableData.find({ batchId }).sort({ lastUpdated: -1 });
    
      return timetables;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
module.exports = {
    createUserDBService,
    addStudentService,
    addTeacherService,
    addCourseService,
    addBatchService,
    getCoursesService,
    getBatchesService,
    addTimetableService,
    getTimetableService,
    updateStudentAttendance,addLeaveRequestService,
    updateLeaveStatusService,
    getLeaveRequestsService,
    getAttendanceByCourseAndBatch,
    getProgressDataService,
    getSessionsService,
    getBatchesByTeacherService,
    getLeavesByTeacherService,
    getLecturesByTeacherService,
    getCoursesByTeacherService,
    getBatchesTeacherService,
    getstudentfacultyService,
    getstudentquizesService,
    getstudentProgressDataService,
    getstudentattendanceService,
    getstudentSessionsService,
    getProfileDataService,
    getteacherProfileDataService,
    getstudentTimetableService,
    getCourseidService,
    getcourseDataService

};