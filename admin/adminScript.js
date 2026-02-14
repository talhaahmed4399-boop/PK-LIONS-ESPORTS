import { db, storage } from './admin.html';
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { ref, deleteObject } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

const teamsList = document.getElementById("teamsList");

async function loadTeams(){
    teamsList.innerHTML = "<p>Loading teams...</p>";
    const querySnapshot = await getDocs(collection(db, "teams"));
    teamsList.innerHTML = "";

    if(querySnapshot.empty){
        teamsList.innerHTML = "<p>No teams registered yet.</p>";
        return;
    }

    querySnapshot.forEach(docSnap => {
        const data = docSnap.data();
        const id = docSnap.id;

        const div = document.createElement("div");
        div.className = "team-card";
        div.innerHTML = `
            <img src="${data.logoURL}" alt="${data.team} Logo" width="100" style="border:2px solid gold; border-radius:5px;">
            <h3>${data.team} [${data.tag}]</h3>
            <p>Players: ${data.p1}, ${data.p2}, ${data.p3}, ${data.p4}</p>
            <p>Sub: ${data.sub}</p>
            <p>IGL / Sponsor: ${data.igl}</p>
            <p>WhatsApp: ${data.wa}</p>
            <button class="delete-btn">DELETE TEAM</button>
            <hr>
        `;
        teamsList.appendChild(div);

        div.querySelector(".delete-btn").addEventListener("click", async () => {
            if(confirm(Delete team ${data.team}?)){
                try {
                    // Delete logo from storage
                    const logoRef = ref(storage, teamLogos/${data.logoURL.split('%2F')[1].split('?')[0]});
                    await deleteObject(logoRef);
                } catch(e){ console.warn("Logo might not exist", e);}
                // Delete document from Firestore
                await deleteDoc(doc(db, "teams", id));
                loadTeams();
            }
        });
    });
}

loadTeams();
