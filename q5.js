/*
---------------------------------------------------------------------------------------------------------
WOOHHOOOOOO!!!!
The instructor is ready to hire you.  He will be getting the paperwork ready.  While he is at it, he has asked you to mark those sections.  He has given you the key to them as well.  Since you have progressed in life so much in such little time, you will be making sure you get that job.  Let's go!
---------------------------------------------------------------------------------------------------------
*/

// The appropriate modules have already been added as follows:
const fs = require('fs')
const path = require('path')

// For this task you will be using ONLY 'Promise' <--------- IMPORTANT!!!!!!!!!!!
// Make sure you DO NOT use async/await <--------- IMPORTANT!!!!!!!!!!!

// You will need the following function to help you:
// path.join(path, filename) 
// JSON.parse()
const readDir = d => new Promise((res, rej) => fs.readdir(d, (e, files) => e?rej(e):res(files)))
const readFile = f => new Promise((res, rej) => fs.readFile(f, 'utf8', (e, data) => e?rej(e):res(data)))

// Tip: Feel free to use code from the previous part BUT NO CODE USING CALLBACKS
sec = "./sections"
sol = "./solution/key.txt"

const get_student_scores = (questions, solutions) => {
	let count = 0
	var finalArray = new Object()
	answers = ""
    return new Promise(resolve => readDir(questions).then(files => {
			readFile(solutions).then(data => answers = JSON.parse(data))
			files.forEach(file => {
					readFile(path.join(questions, file)).then(data => {
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
								resolve([questions, finalArray])
							}
						}
					)
			})
		}
	))
}

sectionsArray = new Object()
const get_student_sections = sections => {
	return new Promise (resolve => {
		readDir(sections).then(files => {
			counter = 0
			files.forEach(file => {
				readDir(path.join(sections, file)).then(students => {
					sectionsArray[file] = students
					counter++
					if (counter == files.length)
						resolve(sectionsArray)
				})
			})
		})
	})	
}


const get_student_grades = (sections, solution) => {
    return new Promise( resolve => get_student_sections(sections).then(sectionsArray => {
            counter = 0
            finalArray = new Object()
            promises = []
            for(section in sectionsArray){
                promises[counter++] = get_student_scores(path.join(sections, section), solution).then(([sec, scores]) => {
                        finalArray[sec.split('\\')[1]] = scores
                    })
			}
			
            Promise.all(promises).then(() => resolve(finalArray))
        }))
}

module.exports = get_student_grades

get_student_grades(sec, sol).then(array => console.log(array))

