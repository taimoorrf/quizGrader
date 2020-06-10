/*
---------------------------------------------------------------------------------------------------------
Impressive!  So far so good.
You have earned your instructor's trust and so he has given you the solution to the questions.  Don't let him down and get him the marks for each student as soon as possible!
---------------------------------------------------------------------------------------------------------
*/

// The appropriate modules have already been added as follows:
const fs = require('fs')
const path = require('path')

// For this task you will be using ONLY 'callbacks()' <--------- IMPORTANT!!!!!!!!!!!
// You will need the following function to help you:
// fs.readdir(path, callback(err,list))
// fs.readFile(path,'utf8',callback(err,data))
// path.join(path, filename) 
// JSON.parse()

// Tip: Feel free to use code from the previous part

// questions is the path to the directory with questions, solutions is the file containing solutions, and callback is the function to be called with the associtive array containing student roll numbers as keys and their scores as values
const get_student_scores = (questions, solutions, callback) => {
	let count = 0
	var finalArray = new Object()
	answers = ""
	fs.readdir(questions, (err, files) => {
		if (err) {
			console.log('Could not read files')
		} 
		else {
			fs.readFile(solutions, 'utf8', (err, data) => {
				if (err) {
					console.log('Error in reading solutions')
				}
				else {
					answers = JSON.parse(data)
				}
			})
			files.forEach(file => {
					fs.readFile(path.join(questions, file),'utf8', (err,data) => {
						if (err){
							console.log('File not read')
						}
						else {
							score = 0 
							ansKeys = Object.keys(answers)
							parsedData = JSON.parse(data)
							dataKeys = Object.keys(parsedData)	
							counter = 0 
							
							while(counter < dataKeys.length) {
								if (answers[ansKeys[counter]] == parsedData[dataKeys[counter]]){
									score++
								}
								counter++
							}
							
							finalArray[file] = score
							if (++count == files.length) {
								callback(finalArray)
							}
						}
					})
			})
		}
	})
}

qPath = "./questions"
solPath = "./solution/key.txt"
module.exports = get_student_scores

 get_student_scores (qPath, solPath ,function(x){
 	console.log(x)
 })

