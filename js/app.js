function startInterview() {
    const domain = document.getElementById("domain").value;
    localStorage.setItem("domain", domain);
    window.location.href = "interview.html";
}
