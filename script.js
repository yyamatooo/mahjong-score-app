const form = document.getElementById("scoreForm");
const resultList = document.getElementById("resultList");

// ローカルストレージから読み込み
let history = JSON.parse(localStorage.getItem("mahjongResults")) || [];

// 表示処理
function renderResults() {
  resultList.innerHTML = "";
  history.forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<strong>${entry.date}</strong><br>` +
      entry.players.map((p, i) => `${i + 1}位: ${p.name}（${p.score}点）`).join("<br>");
    resultList.appendChild(div);
  });
}

// 追加処理
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const nameInputs = document.querySelectorAll(".name");
  const scoreInputs = document.querySelectorAll(".score");

  const players = [];

  for (let i = 0; i < 4; i++) {
    const name = nameInputs[i].value.trim();
    const score = Number(scoreInputs[i].value);

    if (!name || isNaN(score)) {
      alert("すべてのプレイヤーの名前と点数を正しく入力してください。");
      return;
    }

    players.push({ name, score });
  }

  // データ追加
  history.unshift({ date, players });

  // 保存
  localStorage.setItem("mahjongResults", JSON.stringify(history));

  // 再描画
  renderResults();

  // フォーム初期化
  form.reset();
});

// 初期表示
renderResults();