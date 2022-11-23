import fs from 'fs'
import process from 'process'

console.log("Autoremove of older files from temporarty folder init started")

// Автоудаление временных файлов старше суток 
function deleteOldFiles() {
    const HOUR = 1000 * 60 * 60
    const AUTOREMOVE_INTERVAL_HOURS = Number(process.env.AUTOREMOVE_INTERVAL_HOURS)

    fs.readdir("uploads/", (err, files) => {
        if (err) return console.log("Autoremove error: ", err);
        for (const el of files) {
                fs.stat("uploads/" + el, (err, data) => {
                    const timePassed = Date.now() - data.ctime.getTime()
                    if (timePassed > HOUR * AUTOREMOVE_INTERVAL_HOURS) {
                        fs.unlink('uploads/' + el, () => console.log(el + " was deleted"))
                    } else {
                    }
                })
        }
    })
}

export default deleteOldFiles
