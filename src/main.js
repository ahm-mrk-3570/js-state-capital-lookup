const input = document.querySelector("#input");
const output = document.querySelector("#output");

const searchList = async (value) => {
  const res = await fetch("/data/states.json");
  const states = await res.json();

  let matchesStates = states.filter((state) => {
    const regex = new RegExp(`^${value}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });

  let matchedHtml = "";

  matchesStates.map((match) => {
    matchedHtml += `
      <div class="card">
          <h4 class="title-card">${match.name} (${match.abbr}) <span class="capital-card">${match.capital}</span></h4>
          <small>Lat : ${match.lat} / Long : ${match.long}</small>
      </div>
    `;
  });

  output.innerHTML = matchedHtml;
  
  if (value === "") {
    output.innerHTML = "";
  }
};

input.addEventListener("input", () => searchList(input.value));
