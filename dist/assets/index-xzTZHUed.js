(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();(function(){const c=document.querySelectorAll(".card"),s=document.querySelector(".shuffle-button");let n,o=[],t=0;fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,AD,AC,AH").then(e=>e.json()).then(e=>{n=e.deck_id,r()}).catch(e=>console.error(e));const r=()=>{fetch(`https://deckofcardsapi.com/api/deck/${n}/draw/?count=4`).then(e=>e.json()).then(e=>{o=e.cards,a()}).catch(e=>console.error(e))},a=()=>{c.forEach((e,i)=>{e.dataset.value=o[i].value,e.querySelector(".front").style.backgroundImage=`url(${o[i].image})`,e.classList.remove("flipped")}),t=0,s.classList.add("hidden")};c.forEach(e=>{e.addEventListener("click",()=>{e.classList.contains("flipped")||(e.classList.add("flipped"),t++,t===4&&s.classList.remove("hidden"))})}),s.addEventListener("click",()=>{s.classList.add("hidden"),c.forEach((e,i)=>{setTimeout(()=>{const d=e.animate([{transform:"translateY(-280px) rotateY(180deg)"},{transform:"translateY(-280px) rotateX(40deg)"},{transform:"rotateX(40deg)"}],{duration:1e3,easing:"ease-in-out"});d.onfinish=()=>{e.classList.remove("flipped"),e.style.transform="rotateX(40deg)"}},i*200)}),setTimeout(()=>{fetch(`https://deckofcardsapi.com/api/deck/${n}/shuffle/`).then(e=>e.json()).then(e=>{r()}).catch(e=>console.error(e))},c.length*200)})})();
