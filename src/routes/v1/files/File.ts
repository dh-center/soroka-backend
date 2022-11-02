import express from "express"
import { IFileController } from "../../../interfaces"
import multer from "multer"

function getRouter(
    controller: IFileController
) {
    const router: express.Router = express.Router()
    // Multer is for file upload
    const upload = multer({ dest: 'uploads/' })

    router.route('/')
        .post(upload.array('image'), controller.upload)

    return router
}

export default getRouter
