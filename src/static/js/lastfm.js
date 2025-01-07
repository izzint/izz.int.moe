const username = "izzint";

async function getSong() {
  const portfolio = document.createElement("img"); // create the image early so we can load the placeholder
  portfolio.src = "/img/placeholder.webp"; // it's webp

  const current = await fetch(`https://lastfm-last-played.biancarosa.com.br/${username}/latest-song`).then((r) => r.json());
  const listeningTo = document.getElementById("listening-to");

  const info = document.createElement("marquee"); // replace with fake marquee mayb? // CURSE YOU!
  info.innerText = `Last Listened To: ${current.track.name} - ${current.track.album['#text']} - ${current.track.artist['#text']}`

  portfolio.alt = current.track.album[`#text`];
  portfolio.src = current.track.image[2]['#text'];

  listeningTo.appendChild(portfolio);
  listeningTo.appendChild(info);
};
getSong();