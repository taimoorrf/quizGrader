/*
---------------------------------------------------------------------------------------------------------
Ok since the instructor has gone out of his way to do all the documentations himself for you.  You feel kinda nice.  So you have decided to make his grading even easier.  You will be calculating the highest and minimum score for each section. 
---------------------------------------------------------------------------------------------------------
*/

//The appropriate modules have already been added as follows:
const fs = require('fs')
const path = require('path')

//For this task you will be using ONLY 'Promise' <--------- IMPORTANT!!!!!!!!!!!
//Make sure you DO NOT use async/await <--------- IMPORTANT!!!!!!!!!!!

//You may use the following function to help you:
//JSON.parse()
//Math.min()
//Math.max()
const readDir = d => new Promise((res, rej) => fs.readdir(d, (e, files) => e?rej(e):res(files)))
const readFile = f => new Promise((res, rej) => fs.readFile(f, 'utf8', (e, data) => e?rej(e):res(data)))

//Tip: Feel free to use code from the previous part BUT NO CODE USING CALLBACKS

// sections is the path to directory containing student quizzes organized by section, solution is the path to solution file.  the function should return a promise that is resolved with an associative array where the keys are sections and each value is an associative array with two keys, "min" and "max" and the corresponding minimum or maximum score of that section as the value.  See the test case below for example format.

const get_student_sections = sections => {
	//add code here
	dict = {}
	return new Promise((resolve) => {
		readDir(sections).then((files) =>{
			return Promise.all(files.map(file => {
				return readDir(path.join(sections, file)).then((data) => {
					dict[file] = data
				})
			}))
		}).then(()=> resolve(dict)).catch((e) => console.log(e))
	})

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

const get_student_grades = (sections, solution) => {
	//add code here
	let grade = {}
	return new Promise(resolve => readFile(solution).then((sol) =>{
		const soll = JSON.parse(sol)
		get_student_sections(sections).then((dict) =>{
			let promises = []
			let counter = dict.length
			let secs = Object.keys(dict)
			return Promise.all(secs.map((sec, i) =>{
				return Promise.all(dict[sec].map((stu) => {
					return readFile(path.join(sections, sec, stu)).then((data) => {
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
					})
				}))
			}))
		}).then(() =>  resolve(grade))
	}))
}


const get_max_min = (sections, solution) => {
	//add code here
	let maxmind = {}
	return new Promise((resolve => {
		return get_student_grades(sections, solution).then((dict => {
			let secs = Object.keys(dict)
			let min = 0
			let max = 0
			return Promise.all(secs.map((sec)=> {
				let numbers = Object.values(dict[sec])
				max = maxx(numbers)
				min = minn(numbers)
				maxmind[sec] = {"min":min, "max":max}
			}))
		})).then(()=> resolve(maxmind))
	}))
}

module.exports = get_max_min

get_max_min('sections', 'solution\\key.txt').then((d) => console.log(d))

console.log(minn([1,2,3]))