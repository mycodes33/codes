import * as Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCHJ0V-4YF1Q7yrTmFywQGBWGXjVWgJeCQ',
    authDomain: 'my-blog-5bbe3.firebaseapp.com',
    databaseURL: 'https://my-blog-5bbe3.firebaseio.com',
    projectId: 'my-blog-5bbe3',
    storageBucket: 'my-blog-5bbe3.appspot.com',
    messagingSenderId: '821819435160',
    appId: '1:821819435160:web:aced5911012eac4f6488ed',
    measurementId: 'G-204HSXZ5KL'
}

Firebase.initializeApp(firebaseConfig)

export const auth = Firebase.auth()
export const db = Firebase.firestore()