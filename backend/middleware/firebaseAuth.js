import admin from "../config/firebase.js"

export const verifyFirebaseToken = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "No token provided" })
        }

        const decodedToken = await admin.auth().verifyIdToken(token)

        req.firebaseUser = decodedToken

        next()

    } catch (error) {

        res.status(401).json({ message: "Invalid Firebase token" })

    }

}