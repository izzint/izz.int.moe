/*
this script is free to use for anything, whenever!
by izz
*/

const USERNAME = "izz";
const devMode = true; // enable if developing live

// gets the data from the nekoweb api!!
const getStats = async () => {
    const stats = await fetch(`https://nekoweb.org/api/site/info/${USERNAME}`).then(r => r.json());
    const statsBox = document.getElementById("footer"); // you can replace this to the class/id (?) you need

    const creationDate = new Date(stats.created_at).toLocaleDateString();
    const updatedDate = new Date(stats.updated_at).toLocaleDateString();
    const updatedTime = new Date(stats.updated_at).toLocaleTimeString();

    const daysSinceUpdate = Math.floor(stats.created_at/8.64e7);
    console.log(daysSinceUpdate);

    const updatedText = document.createElement("small");
    updatedText.innerText = ` Created On: ${creationDate}, Last Updated On: ${updatedDate} at ${updatedTime}`;

    const vistorCounter = document.createElement("small");
    vistorCounter.className = "vistor_counter";
    vistorCounter.innerText = stats.views;

    // finally add everything
    statsBox.appendChild(vistorCounter);
    statsBox.appendChild(updatedText);
}
if (!devMode == true) {
    getStats();
}