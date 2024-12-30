const USERNAME = "izz";
let devMode = false;

// gets the data from the nekoweb api!!
const getStats = async () => {
    const stats = await fetch(`https://nekoweb.org/api/site/info/${USERNAME}`).then(r => r.json());

    const created = new Date(stats.created_at).toLocaleDateString();
    const updated = new Date(stats.updated_at).toLocaleDateString();
    const updatedTime = new Date(stats.updated_at).toLocaleTimeString();
    const updateDays = Math.floor(stats.created_at/8.64e7); // hacky hack

    document.getElementById("hits").innerText = stats.views;
    document.getElementById("followers").innerText = stats.followers;
}
if (!devMode) {
getStats();
}