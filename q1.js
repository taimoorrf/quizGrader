/* If you are using Sublime, select "View > Word Wrap" to turn on word wrapping.

---------------------------------------------------------------------------------------------------------
Your instructor has asked you to grade an online quiz taken by the class.  You being a good student accepted the task.  You are given a bunch of files for you to grade but as the instructor wasn't so sure he gave you only a bunch of quizzes at first, without the solutions.

He wants you to first give him a list of the rollnumbers of students who have taken the exam.  Being lazy, you decided to automate this task.  Knowing that this task would include huge amount of file reading, you decided to choose Javascript for this task to make the best of its asynchronous attribute.
---------------------------------------------------------------------------------------------------------
*/

// So now to get you started, the appropriate modules have already been added as follows:
const fs = require('fs')
const path = require('path')
// For this task you will be using ONLY 'callbacks' (no PROMISES or ASYNC/AWAIT)
// You will need the following function to help you:
// fs.readdir(path, callback) 
// join(separator) method for arrays
// sort() method for arrays

// Read provided documentation if you have not used this function before

// questions is the path where files are stored and callback is a function that expects a comma separated list of SORTED student rollnumbers as a single string.  The name of each file is the student's roll number.

const get_student_rollnumbers = (questions, callback) => {
	fs.readdir(questions, (err, files) => {
		if (err) {
			console.log('Could not read files')
		} 
		else {
			files.sort()
			callback(files.join(", "))
		}
	})	
}

module.exports = get_student_rollnumbers
mypath ="./questions" 

get_student_rollnumbers (mypath,function(x){
	console.log(x)
})




