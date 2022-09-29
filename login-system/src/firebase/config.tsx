// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

import {
  getAuth,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut 
} from "firebase/auth";

import {
  collection,
  getDoc, getDocFromServer, getDocs, query, where
} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
import UserDetails from "../dataTypes/UserDetails";
import Task from "../dataTypes/Task";
import Team from "../dataTypes/Team";
import { addToList, randomString } from "../App";
import UserTeam from "../dataTypes/UserTeam";

let isTesting = true;

// Your web app's Firebase configuration
const testConfig = {
  apiKey: "AIzaSyD1Z8u6LAQDrwBAd-t-aMzoYFpgrfjFH0E",
  authDomain: "gdscusyd-test.firebaseapp.com",
  projectId: "gdscusyd-test",
  storageBucket: "gdscusyd-test.appspot.com",
  messagingSenderId: "430942619633",
  appId: "1:430942619633:web:66d173a44511aef2d5e650",
  measurementId: "G-QN1CHDNMJM"
};

const prodConfig = {
  apiKey: "AIzaSyCdgEs7mefO_Woe3UJA7lgdlrtiqjpmfCI",
  authDomain: "gdsc-usyd.firebaseapp.com",
  projectId: "gdsc-usyd",
  storageBucket: "gdsc-usyd.appspot.com",
  messagingSenderId: "971303209941",
  appId: "1:971303209941:web:1866f25a953d3e1016cb5c",
  measurementId: "G-S1VSX495L5"
};

let appConfig = isTesting ? testConfig : prodConfig;

// Initialize Firebase
const app = firebase.initializeApp(appConfig);
const auth = getAuth(app);

// Initialize db
const db = app.firestore();

// Initialize analytics
const analytics = getAnalytics(app);

// log in function
const firebaseSignIn = async (email: string, password: string, route?: string) => {
  let status = false;

  await signInWithEmailAndPassword(auth, email, password)
  .then((response) => {
    // @ts-ignore
    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
    sessionStorage.setItem('userId', response.user.uid);

    status = true;
  })
  .catch ((error) => {
    if (error.message === "Firebase: Error (auth/wrong-password).") {
      alert("Incorrect password");
    } else if (error.message === "Firebase: Error (auth/user-not-found).") {
      alert("User not found");
    } else {
      alert(error.message);
    }
  })

  return status;
};

const firebaseSignUp = async (firstName: string, lastName: string, email: string, password: string) => {
  let status = false;
  
  await createUserWithEmailAndPassword(auth, email, password)
  .then(async (response) => {
    const user = response.user;

    // @ts-ignore
    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
    sessionStorage.setItem('userId', user.uid);

    await db.collection("users").doc(user.uid).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      tasks: [],
      teams: []
    });

    status = true;
  })
  .catch((error) => {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      alert("Email already exists. Try signing in.");
    } else {
      alert(error.message);
    }
  })

  return status;
};

const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } 
  
  catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  sessionStorage.clear();
  window.location.href = "/";
};

const getUser = async (uid: string) => {
  let docRef = db.collection('users').doc(uid);

  // @ts-ignore
  let tempDoc: UserDetails = (await getDocFromServer(docRef)).data();

  return tempDoc;
}

const updateTasksInUser = async (uid: string, tasks: string[]) => {
  await db.collection('users').doc(uid).update({tasks: tasks});
}

const updateTeamsInUser = async (uid: string, teams: UserTeam[]) => {
  await db.collection('users').doc(uid).update({teams: teams});
}

const getTasks = async () => {
  const filesRef = collection(db, 'tasks');
  const q = query(filesRef, where("available", "==", true));

  const tempDoc = (await getDocs(q)).docs.map((doc) => {
    // @ts-ignore
    const file: Task = {id: doc.id, ...doc.data()};

    return file;
  })

  return tempDoc;
}

const getTask = async (taskId: string) => {
  let docRef = db.collection('tasks').doc(taskId);

  // @ts-ignore
  let tempDoc: Task = {id: taskId, ...(await getDoc(docRef)).data()};

  return tempDoc;
}

const updateUsersInTask = async (taskId: string, users: string[]) => {
  await db.collection('tasks').doc(taskId).update({users: users});
}

const getEventData = async (eventCode: string) => {
  let docRef = db.collection('eventCodes').doc(eventCode);

  // @ts-ignore
  let tempDoc: {name: string, color?: string} = (await getDoc(docRef)).data();

  return tempDoc;
}

const checkIfUserHasTeam = async (userTeams: UserTeam[], type: string) => {
  let result = false;

  userTeams.forEach((team) => {
    if (team.type === type) {
      result = true;
      alert("You are already in a team")
      return
    }
  })

  return result;
}

const checkIfUserOwnsTeam = async (uid: string) => {
  const teamsRef = collection(db, 'teams');
  const q = query(teamsRef, where("owner", "==", uid));

  const tempDoc = (await getDocs(q)).docs.map((doc) => {
    // @ts-ignore
    const team: Team = {id: doc.id, ...doc.data()};

    return team;
  })

  return tempDoc;
}

const getTeamsByUser = async (uid: string) => {
  const teamsRef = collection(db, 'teams');
  const q = query(teamsRef, where("members", 'array-contains', uid));

  const tempDoc = (await getDocs(q)).docs.map((doc) => {
    // @ts-ignore
    const team: Team = {id: doc.id, ...doc.data()};

    return team;
  })

  return tempDoc;
}

const joinTeam = async (uid: string, teamId: string, pin: string, type: string) => {
  let tempUser: UserDetails = await getUser(uid);
  let success = false;

  let userTeams = tempUser.teams;

  if (!(await checkIfUserHasTeam(userTeams, type))) {
    let teamRef = db.collection('teams').doc(teamId);
    let teamSnapshot = await getDocFromServer(teamRef);

    if (teamSnapshot.exists()) {
      // @ts-ignore
      let tempTeam: Team = {id: teamId, ...teamSnapshot.data()};

      if (tempTeam.pin.toString() === pin) {
        let updatedMembers: string[] = addToList(tempTeam.members, uid);
        let updatedTeams: UserTeam[] = addToList(userTeams, {id: tempTeam.id, type: tempTeam.type});

        await updateMembersInTeam(teamId, updatedMembers);
        await updateTeamsInUser(uid, updatedTeams);
        success = true
      } else {
        alert("Incorrect PIN")
      }
    } else {
      alert("Incorrect Team ID")
    }
  }

  return success;
}

const updateMembersInTeam = async (teamId: string, members: string[]) => {
  await db.collection('teams').doc(teamId).update({members: members});
}

const createTeam = async (uid: string, name: string, pin: string, type: string) => {
  console.log('checking user info')
  let tempUser: UserDetails = await getUser(uid);
  let success = false;

  let userTeams = tempUser.teams;

  console.log('generating teamId')
  let teamId = randomString(6);
  console.log(teamId);

  if (!(await checkIfUserHasTeam(userTeams, type))) {
    let tempTeamWithoutId = {
      name: name,
      pin: parseInt(pin),
      open: true,
      type: type,
      owner: uid,
      members: [uid]
    }
    
    console.log('setting team')
    await db.collection("teams").doc(teamId).set({...tempTeamWithoutId});

    console.log('adding team to user')
    let updatedTeams: UserTeam[] = addToList(userTeams, {id: teamId, type: tempTeamWithoutId.type});
    
    await updateTeamsInUser(uid, updatedTeams);
    success = true;
  }

  return success;
}

export {
  app, db, analytics, 
  firebaseSignIn, firebaseSignUp, resetPassword, logout,
  getUser, updateTasksInUser, 
  getTasks, getTask, updateUsersInTask, 
  getEventData,
  joinTeam, createTeam, checkIfUserHasTeam, checkIfUserOwnsTeam, getTeamsByUser
};