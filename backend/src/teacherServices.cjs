const TeacherData = require('./teacherModel.cjs');

module.exports.createTeacherService = (teacherDetails) => {
    return new Promise((resolve, reject) => {
        var teacherModelData = new TeacherData(teacherDetails);

        teacherModelData.save()
            .then(result => {
                (result);
                resolve(true); // Resolve the promise with true indicating success
            })
            .catch(err => {
                console.error(err);
                resolve(false); // Resolve the promise with false indicating failure
            });
    });
};