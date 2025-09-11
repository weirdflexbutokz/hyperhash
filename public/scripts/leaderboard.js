fetch("/api/leaderboard")
.then(d => d.json())
.then(leaderboard => {
  console.log(leaderboard)
})