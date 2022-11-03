import fs from 'fs'

console.log("Auto deleteion of older files from temporarty folder init")

// Автоудаление временных файлов старше суток 
function deleteOldFiles() {
    const HOUR = 1000 * 60 * 60;

    fs.readdir("uploads/", (err, files) => {
        if (err) return console.log("err: ", err);
        console.log(err, files)
        for (const el of files) {
                fs.stat("uploads/" + el, (err, data) => {
                    const timePassed = Date.now() - data.ctime.getTime()
                    if (timePassed > HOUR * 24) {
                        fs.unlink('uploads/' + el, () => console.log(el + " was deleted"))
                    } else {
                    }
                })
        }
    })
}

export default deleteOldFiles
