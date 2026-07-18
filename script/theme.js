document.addEventListener("DOMContentLoaded", () => {

    // 저장된 테마 적용
    if (localStorage.getItem("theme") === "yahoo") {
        document.body.classList.add("yahoo-theme");
    }

    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("yahoo-theme");
            const iframe = document.getElementById("mainFrame");
            if (iframe && iframe.contentDocument) {
                iframe.contentDocument.body.classList.toggle("yahoo-theme");
            }
            if (document.body.classList.contains("yahoo-theme")) {
                localStorage.setItem("theme", "yahoo");
            } else {
                localStorage.removeItem("theme");
            }
        });
    }

});