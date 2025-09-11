fetch("/api/leaderboard")
.then(d => d.json())
.then(leaderboard => {
  console.log(leaderboard)
  const tbody = document.getElementById("leaderboard");
  leaderboard.forEach(player => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${player.name}</td>
      <td>${player.total_points}</td>
    `;
    tbody.appendChild(tr);
  });
})