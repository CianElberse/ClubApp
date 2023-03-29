import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Filter from 'bad-words';
import { ref, onUnmounted, computed } from 'vue';


firebase.initializeApp({
    apiKey: "AIzaSyCDqlWfdu7dwl41KP1T0_92odKYBqd2Ht4",
    authDomain: "testp1-6be4b.firebaseapp.com",
    projectId: "testp1-6be4b",
    storageBucket: "testp1-6be4b.appspot.com",
    messagingSenderId: "838840992774",
    appId: "1:838840992774:web:be200016c4bb5dc04aef87",
    measurementId: "G-587TFMRE8L"
})

const auth = firebase.auth()

export function useAuth() {
    const user = ref(null)
    const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
    onUnmounted(unsubscribe)
    const isLogin = computed(() => user.value !== null)

    const signIn = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        await auth.signInWithPopup(googleProvider)
    }
    const signOut = () => auth.signOut()

    return { user, isLogin, signIn, signOut }
}

const db = firebase.firestore()


const filter = new Filter()

export function useChat(i) {
    const collectionPath = "messages"+i
    const messagesCollection = db.collection(collectionPath)
    const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)
    const messages = ref([])
    const unsubscribe = messagesQuery.onSnapshot(snapshot => {
        messages.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .reverse()
    })
    onUnmounted(unsubscribe)

    const { user, isLogin } = useAuth()
    const sendMessage = text => {
        if (!isLogin.value) return
        const { photoURL, uid, displayName } = user.value
        messagesCollection.add({
            userName: displayName,
            userId: uid,
            userPhotoURL: photoURL,
            text: filter.clean(text),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return { messages, sendMessage }

}


const clubsCollection = db.collection('clubs')

export const createClub = club => {
    return clubsCollection.add(club)
}

export const getClub = async id => {
    const club = await clubsCollection.doc(id).get()
    return club.exists ? club.data() : null
}

export const updateClub = (id, club) => {
    return clubsCollection.doc(id).update(club)
}

export const deleteClub = id => {
    return clubsCollection.doc(id).delete()
}

export const useLoadClubs = () => {
    const clubs = ref([])
    const close = clubsCollection.onSnapshot(snapshot => {
        clubs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return clubs
}

const eventCollection = db.collection('event')

export const createEvent = (event) => {
    return eventCollection.add(event)
}

export const getEvent = async id => {
    const event = await eventCollection.doc(id).get()
    return event.exists ? event.data() : null
}

export const updateEvent = (id, event) => {
    return eventCollection.doc(id).update(event)
}

export const deleteEvent = id => {
    return eventCollection.doc(id).delete()
}

export const useLoadEvents = () => {
    const event = ref([])
    const close = eventCollection.onSnapshot(snapshot => {
        event.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return event
}