/*
---------------------------------------------------------------------------------------------------------
The instructor doesn't like the style of your programming.  So he asks you to redo the last exercise.
---------------------------------------------------------------------------------------------------------
*/

//The appropriate modules have already been added as follows:
const fs = require('fs')
const path = require('path')

// For this task you will be async/await <-------------- IMPORTANT!!
// You may use code from the previous parts BUT NO CODE USING CALLBACKS/PROMISES
// You can use Promise.all but no use of the "then" handler or of "new Promise"

//You may use the following function to help you:
//JSON.parse()
//Math.min()
//Math.max()
const readDir = d => new Promise((res, rej) => fs.readdir(d, (e, files) => e?rej(e):res(files)))
const readFile = f => new Promise((res, rej) => fs.readFile(f, 'utf8', (e, data) => e?rej(e):res(data)))

// sections is the path to directory containing student quizzes organized by section, solution is the path to solution file.  the function should return a promise that is resolved with an associative array where the keys are sections and each value is an associative array with two keys, "min" and "max" and the corresponding minimum or maximum score of that section as the value.  See the test case below for example format.

const get_student_sections = async sections => {
	//add code here
	dict = {}
	let files = await readDir(sections)
	await Promise.all(files.map(async file => {
		let data = await readDir(path.join(sections, file))
		dict[file] = data
	}))
	return dict

}

const maxx = (list) =>{
	ans = list[0]
	for(i = 0; i < list.length; i++){
		if(list[i] > ans)
			ans = list[i]
	}
	return ans
}


const minn = (list) => {
	ans = list[0]
	for(i = 0; i < list.length; i++){
		if(list[i]< ans)
			ans = list[i]
	}
	return ans
}

const get_student_grades = async (sections, solution) => {
	//add code here
	let grade = {}
	let sol = await readFile(solution)
	const soll = JSON.parse(sol)
	let dict = await get_student_sections(sections)
	let promises = []
	let counter = dict.length
	let secs = Object.keys(dict)
	await Promise.all(secs.map(async (sec, i) =>{
		await Promise.all(dict[sec].map(async (stu) => {
			let data = await readFile(path.join(sections, sec, stu))
				sAns = JSON.parse(data)
				let counter = 0
					for(key2 in sAns){
						if(sAns[key2] == soll[key2])
							counter++
					}
					if(!(sec in grade))
						grade[sec] = {}
					if(!(stu in grade[sec]))
						grade[sec][stu] = counter
		}))
	}))
	return grade
}


const get_max_min = async (sections, solution) => {
	//add code here
	let maxmind = {}
		let dict = await get_student_grades(sections, solution)
		let secs = Object.keys(dict)
		let min = 0
		let max = 0
		await Promise.all(secs.map((sec)=> {
			let numbers = Object.values(dict[sec])
			max = maxx(numbers)
			min = minn(numbers)
			maxmind[sec] = {"min":min, "max":max}
		}))
	return maxmind
}



module.exports = get_max_min

get_max_min('sections', 'solution\\key.txt').then((d) => console.log(d))
