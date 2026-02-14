import { db, storage } from './index.html';
import { collection, addDoc, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

const regForm = document.getElementById("regForm");
const regResult = document.getElementById("regResult");
const tournamentList = document.getElementById("tournamentList");
const leaderboardList = document.getElementById("leaderboardList");
const newsList = document.getElementById("newsList");

// TEAM REGISTRATION
regForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const team = document.getElementById("team").value;
    const tag = document.getElementById("tag").value;
    const p1 = document.getElementById("p1").value;
    const p2 = document.getElementById("p2").value;
    const p3 = document.getElementById("p3").value;
    const p4 = document.getElementById("p4").value;
    const sub = document.getElementById("sub").value;
    const igl = document.getElementById("igl").value;
    const wa = document.getElementById("wa").value;
    const logoFile = document.getElementById("logo").files[0];

    if(!team || !tag || !p1 || !p2 || !p3 || !p4 || !sub || !igl || !wa || !logoFile){
        regResult.innerText="Please fill all fields!";
        return;
    }

    try{
        const logoRef = ref(storage, teamLogos/${logoFile.name});
        await uploadBytes(logoRef, logoFile);
        const logoURL = await getDownloadURL(logoRef);

        await addDoc(collection(db,"teams"),{
            team, tag, p1, p2, p3, p4, sub, igl, wa, logoURL, timestamp: serverTimestamp()
        });

        regResult.innerText="Team registered successfully!";
        regForm.reset();
    }catch(err){
        console.error(err);
        regResult.innerText="Error registering team!";
    }
});

// FETCH TOURNAMENTS / LEADERBOARD / NEWS (PLACEHOLDER)
async function loadGlobalData(){
    // Example: fetch tournaments
    tournamentList.innerHTML="Loading...";
    const tournamentsSnap = await getDocs(collection(db,"tournaments"));
    if(tournamentsSnap.empty){
        tournamentList.innerHTML="No tournaments yet.";
    } else {
        tournamentList.innerHTML="";
        tournamentsSnap.forEach(doc=>{
            const data = doc.data();
            const div = document.createElement("div");
            div.innerHTML=<strong>${data.name}</strong> | ${data.date};
            tournamentList.appendChild(div);
        });
    }

    // Example: fetch leaderboard
    leaderboardList.innerHTML="Loading...";
    const leaderboardSnap = await getDocs(collection(db,"leaderboard"));
    if(leaderboardSnap.empty){
        leaderboardList.innerHTML="No leaderboard yet.";
    } else {
        leaderboardList.innerHTML="";
        leaderboardSnap.forEach(doc=>{
            const data = doc.data();
            const div = document.createElement("div");
            div.innerHTML=<strong>${data.team}</strong> - Points: ${data.points};
            leaderboardList.appendChild(div);
        });
    }

    // Example: fetch news
    newsList.innerHTML="Loading...";
    const newsSnap = await getDocs(collection(db,"news"));
    if(newsSnap.empty){
        newsList.innerHTML="No news yet.";
    } else {
        newsList.innerHTML="";
        newsSnap.forEach(doc=>{
            const data = doc.data();
            const div = document.createElement("div");
            div.innerHTML=<strong>${data.title}</strong> - ${data.content};
            newsList.appendChild(div);
        });
    }
}

loadGlobalData();
