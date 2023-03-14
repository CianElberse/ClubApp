const Home = () => import('./pages/Home.vue')
const Club = () => import('./pages/Club.vue')
const Create = () => import('./pages/CreateClub.vue')
const Events = () => import('./pages/Events.vue')
const Chat = () => import('./pages/ChatPage.vue')
const Edit = () => import('./pages/EditClub.vue')
const CreateEvent = () => import('./pages/CreateEvent.vue')
const EditEvent = () => import('./pages/EditEvent.vue')


export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/clubs/:id',
        name: 'club',
        component: Club,
        props: true,
    },
    {
        path: '/create',
        name: 'createClub',
        component: Create,
    },
    {
        path: '/createEvent/:id',
        name: 'createEvent',
        component: CreateEvent,
    },
    {
        path: '/clubs/:id/event',
        name: 'events',
        component: Events,
    },
    {
        path: '/clubs/:id/chat',
        name: 'Calendar',
        component: Chat,
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: Edit,
    },
    {
        path: '/editEvent/:id/:cId',
        name: 'EditEvent',
        component: EditEvent,
    },
]
