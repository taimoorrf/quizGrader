/*
---------------------------------------------------------------------------------------------------------
Ok there is a problem now.  Apparently, the administration is busy dealing with multiple DC accusations by TAs, instructors and even students.  There is a mayham everywhere.  So instead of laughing at how things have turned out everywhere, you act responsibly and decided to fix this problem.  You know how world works and after doing some research you figure out some rules where if two students meet the conditions then they might have cheated.

Rules:

-> Two students must of the same section
-> Two students will have more than 80% of their incorrect answers equal
-> Two students will have more than 50% of their overall answers equal

If two student meet these requiremenets, then they are to be investigated.

The one thing you've gotta do is that you need to always do the best you can do, no matter what the given situation, no matter what comes up against you.  You do the best you can do, and you never give up. Never quit.

And so believe, relax and keep moving forward!!!
---------------------------------------------------------------------------------------------------------
*/

// The appropriate modules have already been added as follows:
const fs = require('fs')
const path = require('path')

// For this task you will be async/await <-------------- IMPORTANT!!
// You may use code from the previous parts BUT NO CODE USING CALLBACKS (Promises based code from previous parts is fine)

// You will nee the following function to help you:
// path.join(path, filename) 
// JSON.parse()
const readDir = d => new Promise((res, rej) => fs.readdir(d, (e, files) => e?rej(e):res(files)))
const readFile = f => new Promise((res, rej) => fs.readFile(f, 'utf8', (e, data) => e?rej(e):res(data)))

const get_student_sections = sections => 
	//add code here
	new Promise((resolve,reject)=>
        readDir(sections).then(s => {
            const dict = {}
            const promises_sections = s.map(x =>
                readDir(sections+'\\'+x).then(files => dict[x] = files))
		    Promise.all(promises_sections).then(()=>resolve(dict))
        }))

const get_suspects = async (sections, solution) => {
    const list_sect = await get_student_sections(sections)
    const key = JSON.parse(await readFile(solution))
	const dict = {}
    const answers = {}
    for (const x in list_sect) {
        answers[x] = {}
        for (const y of list_sect[x]) {
            answers[x][y] = JSON.parse(await readFile(`${sections}\\${x}\\${y}`))
        }

        dict[x] = []
        for (const s1 of list_sect[x])
            for (const s2 of list_sect[x] ) {
                count= 0
                c=0
                for(i in key) {
                    if (answers[x][s1][i] == answers[x][s2][i]) {
                        c++
                        if (key[i] != answers[x][s1][i]) {count++}}
                }
                if (c*2>Object.keys(key).length && s1!=s2 && count*2>Object.keys(key).length) {
                    dict[x].push([s1, s2])
                }
        }
    }
    console.log('Now')
    return dict
}

module.exports = get_suspects

get_suspects('sections', 'solution\\key.txt').then(x=>console.log(x))
