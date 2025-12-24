const API_KEY = "YOUR_OPENAI_API_KEY";
let questionNumber = 1;
let summaryData = "";

document.getElementById("domainName").innerText = localStorage.getItem("domain");

async function askAI(prompt) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

async function loadQuestion() {
    const domain = localStorage.getItem("domain");
    const q = await askAI(`Ask interview question ${questionNumber} for ${domain}.`);
    document.getElementById("question").innerText = q;
}

async function submitAnswer() {
    const answer = document.getElementById("answer").value;

    const feedback = await askAI(`
      Evaluate this answer in 3 lines.
      Answer: ${answer}
      Give score and improvements.
    `);

    summaryData += `<p><b>Q${questionNumber}:</b> ${document.getElementById("question").innerText}<br>
    <b>Feedback:</b> ${feedback}</p><hr>`;

    document.getElementById("feedback").innerHTML = feedback;

    questionNumber++;

    if (questionNumber <= 5) {
        setTimeout(() => {
            document.getElementById("answer").value = "";
            loadQuestion();
        }, 1000);
    } else {
        localStorage.setItem("summary", summaryData);
        window.location.href = "summary.html";
    }
}

loadQuestion();
