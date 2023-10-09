import { initializeApp } from 'firebase/app'
import * as env from './process.env.js'

const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    databaseURL: env.DB_URL,
    projectId: env.PROJ_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID,
    appId: env.APP_ID,
    measurementId: env.MEASURMENT_ID
}
    
const app = initializeApp(firebaseConfig)

export default app