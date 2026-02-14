import { db, storage } from './index.html'; // Firebase already initialized

import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";

const regForm = document.getElementById("regForm");
const regResult = document.getElementById("regResult");

regForm.addEventListener("submit", async (e) => {
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

    if (!team || !tag || !p1 || !p2 || !p3 || !p4 || !sub || !igl || !wa || !logoFile) {
        regResult.innerText = "Please fill all fields!";
        return;
    }

    try {
        const logoRef = ref(storage, teamLogos/${logoFile.name});
        await uploadBytes(logoRef, logoFile);
        const logoURL = await getDownloadURL(logoRef);

        await addDoc(collection(db, "teams"), {
            team, tag, p1, p2, p3, p4, sub, igl, wa, logoURL, timestamp: serverTimestamp()
        });

        regResult.innerText = "Team registered successfully!";
        regForm.reset();
    } catch(err) {
        console.error(err);
        regResult.innerText = "Error registering team!";
    }
});

// Points Calculator
window.calcPoints = function() {
    const r = document.getElementById("rank").value;
    let p = 0;
    if(r==1)p=10;
    else if(r==2)p=6;
    else if(r==3)p=4;
    else if(r>3)p=2;
    document.getElementById("result").innerText = "Points: " + p;
};
