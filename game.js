const questions = [
 {c:"GÉOGRAPHIE",q:"Quelle est la capitale de la Côte d’Ivoire ?",a:["Bouaké","Abidjan","Yamoussoukro","San-Pédro"],ok:2,why:"Yamoussoukro est la capitale politique et administrative."},
 {c:"SCIENCES",q:"Quelle planète est surnommée la planète rouge ?",a:["Vénus","Mars","Jupiter","Mercure"],ok:1,why:"La poussière riche en oxyde de fer donne à Mars sa couleur rouge."},
 {c:"CULTURE GÉNÉRALE",q:"Combien de côtés possède un hexagone ?",a:["5","6","7","8"],ok:1,why:"Un hexagone possède six côtés."},
 {c:"SPORT",q:"Combien de joueurs une équipe de football aligne-t-elle au début d'un match ?",a:["9","10","11","12"],ok:2,why:"Une équipe aligne onze joueurs, gardien compris."},
 {c:"HISTOIRE",q:"En quelle année l’homme a-t-il marché sur la Lune pour la première fois ?",a:["1959","1969","1979","1989"],ok:1,why:"La mission Apollo 11 a aluni en juillet 1969."},
 {c:"SCIENCES",q:"Quel gaz les plantes absorbent-elles principalement pour la photosynthèse ?",a:["Oxygène","Azote","Dioxyde de carbone","Hydrogène"],ok:2,why:"Les plantes utilisent le dioxyde de carbone, l'eau et la lumière."},
 {c:"MATHÉMATIQUES",q:"Combien font 12 × 8 ?",a:["86","92","96","108"],ok:2,why:"12 multiplié par 8 égale 96."},
 {c:"TECHNOLOGIE",q:"Que signifie le sigle HTML ?",a:["HyperText Markup Language","HighText Machine Language","Home Tool Markup Language","Hyper Transfer Main Link"],ok:0,why:"HTML signifie HyperText Markup Language."},
 {c:"NATURE",q:"Quel est le plus grand mammifère du monde ?",a:["Éléphant d’Afrique","Girafe","Baleine bleue","Requin-baleine"],ok:2,why:"La baleine bleue est le plus grand animal connu."},
 {c:"CULTURE GÉNÉRALE",q:"Combien de minutes y a-t-il dans deux heures ?",a:["90","100","120","180"],ok:2,why:"Deux heures représentent 2 × 60 = 120 minutes."}
];
const $=id=>document.getElementById(id);
let mode="solo",index=0,score=0,locked=false;
function show(id){["home","quiz","result"].forEach(x=>$(x).classList.toggle("hidden",x!==id))}
$("soloMode").onclick=()=>{mode="solo";$("soloMode").classList.add("selected");$("groupMode").classList.remove("selected");$("groupInfo").classList.add("hidden")};
$("groupMode").onclick=()=>{mode="group";$("groupMode").classList.add("selected");$("soloMode").classList.remove("selected");$("groupInfo").classList.remove("hidden")};
function start(){index=0;score=0;show("quiz");render()}
function render(){locked=false;const q=questions[index];$("questionCount").textContent=`QUESTION ${index+1}/${questions.length}`;$("score").textContent=score;$("progress").style.width=`${index/questions.length*100}%`;$("category").textContent=q.c;$("question").textContent=q.q;$("feedback").textContent="";$("nextBtn").classList.add("hidden");$("answers").innerHTML="";q.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=String.fromCharCode(65+i)+".  "+answer;b.onclick=()=>choose(i);$("answers").appendChild(b)})}
function choose(choice){if(locked)return;locked=true;const q=questions[index];[...$("answers").children].forEach((b,i)=>{b.disabled=true;if(i===q.ok)b.classList.add("correct");else if(i===choice)b.classList.add("wrong")});if(choice===q.ok){score+=10;$("feedback").textContent="✅ Bonne réponse ! "+q.why}else{$("feedback").textContent="❌ Pas tout à fait. "+q.why}$("score").textContent=score;$("progress").style.width=`${(index+1)/questions.length*100}%`;$("nextBtn").textContent=index===questions.length-1?"VOIR MON RÉSULTAT →":"QUESTION SUIVANTE →";$("nextBtn").classList.remove("hidden")}
function finish(){$("finalScore").textContent=score;$("resultTitle").textContent=score===100?"INCROYABLE !":score>=70?"TRÈS BIEN JOUÉ !":score>=40?"BIEN ESSAYÉ !":"CONTINUE À T'ENTRAÎNER";$("resultText").textContent=`Mode ${mode==="solo"?"Solo":"Groupe (aperçu)"} · ${score/10} bonne(s) réponse(s) sur 10.`;show("result")}
$("startBtn").onclick=start;$("nextBtn").onclick=()=>{if(index<questions.length-1){index++;render()}else finish()};$("quitBtn").onclick=()=>show("home");$("againBtn").onclick=start;$("homeBtn").onclick=()=>show("home");
