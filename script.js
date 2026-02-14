// Firebase Firestore & Storage reference
const db = firebase.firestore();
const storage = firebase.storage();

// Registration form
const regForm = document.getElementById("regForm");

regForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values
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
        alert("Please fill all fields and upload team logo!");
        return;
    }

    // Upload logo to Firebase Storage
    const storageRef = storage.ref();
    const logoRef = storageRef.child(teamLogos/${logoFile.name});
    await logoRef.put(logoFile);
    const logoURL = await logoRef.getDownloadURL();

    // Save registration in Firestore
    await db.collection("teams").add({
        team,
        tag,
        p1,
        p2,
        p3,
        p4,
        sub,
        igl,
        wa,
        logoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("Team registered successfully!");
    regForm.reset();
});
