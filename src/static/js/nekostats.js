/*
this script is free to use for anything, whenever!
by izz
*/

const USERNAME = "izz";

// gets the data from the nekoweb api!!
const getStats = async () => {
    const stats = await fetch(`https://nekoweb.org/api/site/info/${USERNAME}`).then(r => r.json());

    const created = new Date(stats.created_at).toLocaleDateString();
    const updated = new Date(stats.updated_at).toLocaleDateString();
    const updatedTime = new Date(stats.updated_at).toLocaleTimeString();

    const updateDays = Math.floor(stats.created_at/8.64e7); // hacky hack
}
if (!devMode == true) {
    getStats();
}