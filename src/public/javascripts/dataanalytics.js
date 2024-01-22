document.addEventListener("DOMContentLoaded",(function(){scrolled();buttonPushed();linkPushed();documentDownloaded();selectBoxSelected();radioButtonSelected();videoPlayed()}));function scrolled(){const t=document.querySelectorAll(".scrollMoveeWR");const o=new IntersectionObserver(e);t.forEach((t=>{o.observe(t)}));function e(t){t.forEach((t=>{if(t.isIntersecting){const o=t.target.textContent;console.log("テキスト情報:",o);fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"scroll",text:o,hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}))}}))}}function buttonPushed(){const t=document.querySelectorAll(".pushButtonMoveeWR");t.forEach((function(t){t.addEventListener("click",(function(){const t=this.textContent;fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"button push",buttonText:t,hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}))}))}))}function linkPushed(){const t=document.querySelectorAll(".pushLinkMoveeWR");t.forEach((function(t){t.addEventListener("click",(function(){const t=this.textContent;const o=this.getAttribute("href");fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"link push",linkText:t,linkUrl:o,hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}))}))}))}function documentDownloaded(){const t=document.querySelectorAll(".downloadLinkMoveeWR");t.forEach((function(t){t.addEventListener("click",(function(){const t=this.textContent;const o=this.getAttribute("href");fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"download",linkText:t,linkUrl:o,hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}))}))}))}function selectBoxSelected(){const t=document.querySelectorAll(".selectkMoveeWR");t.forEach((function(t){t.addEventListener("mousedown",(function(o){const e=o.target.id;fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"selectboxSelected",selectBoxName:t.name,selectBoxNameId:e,hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}))}))}))}function radioButtonSelected(){const t=document.querySelectorAll(".radioboxMoveeWR");t.forEach((function(t){t.addEventListener("mousedown",(function(o){o.stopPropagation();fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"radioButtonSelected",radioButtonName:t.getAttribute("name"),hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}));console.log("ラジオボタンがマウスでクリックされました");const e=t.getAttribute("name");console.log("ラジオボタンの name 属性:",e)}));const o=t.closest("label");if(o){o.addEventListener("mousedown",(function(){const t=o.textContent.trim();fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"radioLabelSelected",labelText:t,hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}));console.log("ラベルのテキスト:",t);console.log("ラベルがマウスでクリックされました")}))}}))}function videoPlayed(){const t=document.querySelectorAll(".videoElement");t.forEach(((t,o)=>{let e=0;let n=0;t.addEventListener("play",(function(){e=(new Date).getTime()/1e3}));t.addEventListener("pause",(function(){n=(new Date).getTime()/1e3;const c=n-e;const a=t.querySelector("source").getAttribute("src");console.log(`動画${o+1}の再生時間: ${c.toFixed(2)} 秒`);console.log(`動画${o+1}のファイル名: ${a}`);fetch("https://beta.mreactiondata.com/analytics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"video reproduction",text:a,videoPlayedTime:c.toFixed(2),hostname:window.location.hostname,path:window.location.href})}).catch((t=>{console.error("エラー:",t)}))}))}))}