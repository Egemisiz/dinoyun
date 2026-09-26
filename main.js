let elixir = 3;
let currentCard = null;

const questions = [
    { q: "Peygamberlerin 'Doğru olmak' anlamına gelen sıfatı hangisidir?", options: ["Sıdk", "Fetanet", "İsmet", "Tebliğ"], answer: 0 },
    { q: "Hz. Davud (a.s.) hangi ilahi kitap verilmiştir?", options: ["Tevrat", "Zebur", "İncil", "Kur'an-ı Kerim"], answer: 1 },
    { q: "Peygamberlerin 'Akıllı ve zeki olmaları' hangi sıfattır?", options: ["Emanet", "Fetanet", "İsmet", "Sıdk"], answer: 1 },
    { q: "Peygamberlerin 'Günah işlememek' anlamına gelen sıfatı nedir?", options: ["İsmet", "Tebliğ", "Sıdk", "Fetanet"], answer: 0 }
];

// İksir Dolum Motoru
setInterval(() => {
    if(elixir < 10) {
        elixir++;
        let elixirCount = document.getElementById('elixir-count');
        let elixirFill = document.getElementById('elixir-fill');
        if(elixirCount) elixirCount.innerText = elixir;
        if(elixirFill) elixirFill.style.width = (elixir * 10) + '%';
    }
}, 2000);

function playCard(name, cost) {
    if(elixir < cost) {
        alert("Yeterli İlim İksiri yok!");
        return;
    }
    currentCard = { name: name, cost: cost };
    openQuiz();
}

function openQuiz() {
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById('quiz-q').innerText = randomQ.q;
    
    const opts = document.getElementById('quiz-opts');
    opts.innerHTML = '';
    
    randomQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => answerQuiz(idx === randomQ.answer);
        opts.appendChild(btn);
    });

    document.getElementById('quiz-modal').style.display = 'flex';
}

function answerQuiz(isCorrect) {
    document.getElementById('quiz-modal').style.display = 'none';
    if(isCorrect) {
        elixir -= currentCard.cost;
        let enemyHp = document.getElementById('enemy-hp');
        let newHp = Math.max(0, parseInt(enemyHp.innerText) - 250);
        enemyHp.innerText = newHp;
        alert("✅ Doğru Cevap! " + currentCard.name + " hamlesi yapıldı.");
        if(newHp === 0) alert("🎉 TEBRİKLER! Rakip kuleyi yıktın!");
    } else {
        alert("❌ Yanlış Cevap! İksir harcanamadı.");
    }
}