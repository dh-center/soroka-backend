import express from "express"
import { IFileController } from "../../../interfaces"
import multer from "multer"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: IFileController
) {
    const router: express.Router = express.Router()
    // Multer is for file upload
    const upload = multer({ dest: 'uploads/' })

    router.route('/')
        .post(passport.authenticate('authAndNoAuth', { session: false }), upload.array('image'), controller.upload)

    router.route('/by-id/:fileId/:fileName')
        .get(controller.get)


    return router
}

export default getRouter
