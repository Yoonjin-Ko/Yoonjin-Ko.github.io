const input = document.getElementById("search");
const button = document.getElementById("searchBtn");


// 검색 버튼
if (button) {
    button.addEventListener("click", search);
}


// 엔터 검색
if (input) {
    input.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            search();
        }
    });
}


function search(){

    const keyword = input.value.trim();

    if(keyword === "") return;

    searchWikipedia(keyword);
}


async function searchWikipedia(keyword) {

    try {

        const url =
            "https://en.wikipedia.org/api/rest_v1/page/summary/" +
            encodeURIComponent(keyword);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("검색 결과 없음");
        }

        const data = await response.json();

        const iframe = document.getElementById("mainFrame");
        const img = document.getElementById("defaultImg");

        if (!iframe || !img) return;

        img.style.display = "none";
        iframe.style.display = "block";

        iframe.srcdoc = `
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
body{
    font-family:Arial,sans-serif;
    padding:20px;
    line-height:1.7;
}
img{
    max-width:250px;
    float:right;
    margin-left:20px;
}
h1{
    font-size:34px;
}
p{
    font-size:18px;
}
a{
    color:#0066cc;
}
</style>
</head>
<body>

<h1>${data.title}</h1>

${
data.thumbnail
? `<img src="${data.thumbnail.source}">`
: ""
}

<p>${data.extract}</p>

<p>
<a href="${data.content_urls.desktop.page}" target="_blank">
Wikipedia에서 보기
</a>
</p>

</body>
</html>
`;

    } catch {

        alert("검색 결과가 없습니다.");

    }

}


function loadPage(page){

    const iframe = document.getElementById("mainFrame");
    const img = document.getElementById("defaultImg");

    if (!iframe || !img) return;

    img.style.display = "none";
    iframe.style.display = "block";

    iframe.removeAttribute("srcdoc");

    iframe.src = page;
}



const homeBtn = document.getElementById("homeBtn");

if (homeBtn) {

    homeBtn.addEventListener("click",function(){

        const iframe = document.getElementById("mainFrame");
        const img = document.getElementById("defaultImg");

        iframe.removeAttribute("srcdoc");
        iframe.src = "about:blank";
        iframe.style.display = "none";

        img.style.display = "block";

        input.value = "";

    });

}



function resizeIframe() {

    const iframe = document.getElementById("mainFrame");

    if (!iframe) return;

    try {

        const doc = iframe.contentWindow.document;

        iframe.style.height =
            Math.max(
                doc.body.scrollHeight,
                doc.documentElement.scrollHeight
            ) + "px";

    } catch (e) {}

}


const mainFrame = document.getElementById("mainFrame");

if (mainFrame) {
    mainFrame.addEventListener("load", resizeIframe);
}