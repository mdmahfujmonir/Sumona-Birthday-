/* MIDNIGHT WISH — all editable content lives in CONFIG below. */
const CONFIG = {
  recipient: "Sumona",
  birthday: "2026-11-14T00:00:00",
  signature: "From someone who wishes you well.",
  music: "assets/music/background.mp3",
  gallery: [
    {src:"assets/images/sumona-01.jpg",caption:"A lovely smile.",position:"center"},
    {src:"assets/images/sumona-02.jpg",caption:"A moment worth appreciating.",position:"center"},
    {src:"assets/images/sumona-03.jpg",caption:"Simply beautiful.",position:"center"},
    {src:"assets/images/sumona-04.jpg",caption:"An ordinary moment with a special charm.",position:"center"},
    {src:"assets/images/sumona-05.jpg",caption:"Keep smiling.",position:"center"},
    {src:"assets/images/sumona-06.jpg",caption:"A little moment, a lovely memory.",position:"center"},
    {src:"assets/images/sumona-07.jpg",caption:"A beautiful day to remember.",position:"center"},
    {src:"assets/images/sumona-08.jpg",caption:"A snapshot full of charm.",position:"center"},
    {src:"assets/images/sumona-09.jpg",caption:"May your days stay bright.",position:"center"},
    {src:"assets/images/sumona-10.jpg",caption:"A little piece of sunshine.",position:"center"},
    {src:"assets/images/sumona-11.jpg",caption:"A lovely moment in time.",position:"center"},
    {src:"assets/images/sumona-12.jpg",caption:"Keep being wonderfully you.",position:"center"}
  ],
  wishes: [
    ["Happiness","May you always find reasons to smile."],
    ["Peace","May your heart always find peace."],
    ["Confidence","May you always believe in your own abilities."],
    ["Success","May your hard work lead you to beautiful achievements."],
    ["Health","May you enjoy good health and strength."],
    ["Friendship","May you always be surrounded by genuine people."],
    ["Courage","May you never lose the courage to follow your dreams."],
    ["Opportunities","May wonderful opportunities find their way to you."],
    ["Memories","May you collect countless beautiful memories."],
    ["Fulfilment","May life bring you the happiness you truly deserve."]
  ],
  gifts: [
    ["A Little Reminder","You are worthy of kindness, happiness, and respect."],
    ["A Little Motivation","Keep going. Your dreams are worth the effort."],
    ["A Little Smile","Here is a small reminder to smile today."]
  ],
  openWhen: [
    ["A little note for a sad day","Take a breath. You do not have to solve everything today. Give yourself some kindness."],
    ["A little note for a tired day","Rest is not failure. Take your time and return when you feel ready."],
    ["A little note for a doubtful day","Remember that your progress matters, even when it feels small."],
    ["A little note for a brighter moment","Here is a little digital reminder that someone wishes you a beautiful day."]
  ],
  letter: `A Little Note For You

Some people leave behind beautiful memories, even when life takes everyone in different directions.

It has been a long time since we first knew each other. So many days have passed, and life has changed in many ways.

I never really had the chance to wish you on your birthday before. This time, I wanted to do something a little different.

I do not know how much this little surprise will mean to you, but I made it with genuine care and a sincere wish to make you smile.

I hope the coming year brings you peace, happiness, confidence, good health, and beautiful opportunities.

May your dreams grow bigger, your worries become lighter, and your days become brighter.

No expectations, no special occasion beyond this one simple wish.

Just a heartfelt birthday greeting for someone I genuinely wish well.

Happy Birthday, Sumona.

May life always be kind to you.

From someone who wishes you well.`
};

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const safeStorage = {
  get(key){try{return localStorage.getItem(key)}catch(_){return null}},
  set(key,value){try{localStorage.setItem(key,value)}catch(_){}}
};

/* Stars: reduced on small screens for better performance. */
(function createStars(){
  const host=$("#stars"); if(!host) return;
  const count=window.matchMedia("(max-width: 600px)").matches?45:90;
  for(let i=0;i<count;i++){
    const star=document.createElement("i");star.className="star";
    star.style.left=Math.random()*100+"%";star.style.top=Math.random()*100+"%";
    star.style.animationDelay=(Math.random()*4)+"s";star.style.animationDuration=(2+Math.random()*4)+"s";
    if(Math.random()>.8){star.style.width="3px";star.style.height="3px"}
    host.appendChild(star);
  }
})();

/* Loader never blocks the experience for long. */
window.addEventListener("load",()=>setTimeout(()=>$("#loader")?.classList.add("done"),450));
setTimeout(()=>$("#loader")?.classList.add("done"),2500);

/* Header, menu, scroll progress and reveal animations. */
const header=$("#siteHeader"),nav=$("#nav"),menuToggle=$("#menuToggle"),progress=$("#scrollProgress"),backTop=$("#backToTop");
menuToggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
});
$$(".nav a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false")}));
function onScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(window.scrollY/max)*100:0)+"%";
  header.classList.toggle("scrolled",window.scrollY>35);
  backTop.classList.toggle("show",window.scrollY>650);
}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
backTop?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
const revealObserver=("IntersectionObserver" in window)?new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}
}),{threshold:.12}):null;
$$(".reveal").forEach(el=>revealObserver?revealObserver.observe(el):el.classList.add("visible"));

/* Birthday countdown: local browser time, with a clean post-birthday state. */
function updateCountdown(){
  const target=new Date(CONFIG.birthday).getTime(),now=Date.now(),diff=target-now;
  if(diff<=0){
    $("#countdown").innerHTML='<div class="birthday-now">✦</div>';
    $("#countdownMessage").textContent=diff> -86400000?"Today was made for celebrating you.":"A birthday memory worth keeping close.";
    return;
  }
  const units={days:86400000,hours:3600000,minutes:60000,seconds:1000};let remaining=diff;
  Object.entries(units).forEach(([id,size])=>{const value=Math.floor(remaining/size);remaining-=value*size;$("#"+id).textContent=String(value).padStart(2,"0")});
}
updateCountdown();setInterval(updateCountdown,1000);

/* Cake interaction. */
const cakeScene=$("#cakeScene"),wishButton=$("#wishButton"),cakeMessage=$("#cakeMessage"),relight=$("#relightButton");
wishButton?.addEventListener("click",()=>{
  cakeScene.classList.add("blown");cakeMessage.classList.add("show");wishButton.classList.add("hidden");relight.classList.remove("hidden");launchConfetti();
});
relight?.addEventListener("click",()=>{cakeScene.classList.remove("blown");cakeMessage.classList.remove("show");wishButton.classList.remove("hidden");relight.classList.add("hidden")});
function launchConfetti(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  for(let i=0;i<28;i++){const bit=document.createElement("i");bit.style.cssText=`position:fixed;z-index:150;left:${45+Math.random()*10}%;top:48%;width:5px;height:8px;background:${["#d6bd8b","#c99bae","#e8c6d3","#f5f0ec"][i%4]};pointer-events:none;border-radius:2px;`;
    document.body.appendChild(bit);const x=(Math.random()-.5)*420,y=180+Math.random()*380;
    bit.animate([{transform:"translate(0,0) rotate(0)",opacity:1},{transform:`translate(${x}px,${y}px) rotate(${Math.random()*600}deg)`,opacity:0}],{duration:900+Math.random()*700,easing:"cubic-bezier(.1,.7,.3,1)"}).onfinish=()=>bit.remove();
  }
}

/* Modal helper: one reusable dialog for wishes, gifts, notes and the letter. */
const modal=$("#contentModal"),modalTitle=$("#modalTitle"),modalBody=$("#modalBody"),modalEyebrow=$("#modalEyebrow");
let lastFocus=null;
function openModal(title,body,eyebrow="A LITTLE NOTE"){
  lastFocus=document.activeElement;modalTitle.textContent=title;modalBody.textContent=body;modalEyebrow.textContent=eyebrow;
  modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$(".modal-close").focus();
}
function closeModal(){
  modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";
  if(lastFocus?.focus)lastFocus.focus();
}
$$("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();closeLightbox()}});
$("#openLetter")?.addEventListener("click",()=>{
  $("#envelope").classList.add("open");
  setTimeout(()=>openModal("A Little Note For You",CONFIG.letter,"A LETTER, WRITTEN WITH CARE"),550);
});
$("#envelope")?.addEventListener("click",()=>$("#openLetter").click());

/* Gallery: real images are optional; missing images get tasteful placeholders. */
const galleryGrid=$("#galleryGrid");let currentPhoto=0;
CONFIG.gallery.forEach((photo,index)=>{
  const figure=document.createElement("figure");figure.className="photo-card";figure.style.setProperty("--tilt",`${(index%2===0?1:-1)*(1+index%3*.45)}deg`);
  const img=document.createElement("img");img.src=photo.src;img.alt=`Sumona photograph ${index+1}`;img.loading="lazy";img.style.objectPosition=photo.position||"center";
  img.addEventListener("error",()=>{img.replaceWith(createPlaceholder(index+1))},{once:true});
  const caption=document.createElement("figcaption");caption.textContent=photo.caption;
  figure.append(img,caption);figure.addEventListener("click",()=>openLightbox(index));galleryGrid.appendChild(figure);
});
function createPlaceholder(number){
  const div=document.createElement("div");div.className="photo-placeholder";
  const star=document.createElement("span");star.textContent="✦";
  const label=document.createElement("small");label.textContent=`Add sumona-${String(number).padStart(2,"0")}.jpg`;
  div.append(star,label);return div;
}
const lightbox=$("#lightbox"),lightboxImage=$("#lightboxImage");
function openLightbox(index){currentPhoto=(index+CONFIG.gallery.length)%CONFIG.gallery.length;renderLightbox();lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$("#lightboxClose").focus()}
function renderLightbox(){const p=CONFIG.gallery[currentPhoto];lightboxImage.src=p.src;lightboxImage.alt=`Sumona photograph ${currentPhoto+1}`;lightboxImage.onerror=()=>{lightboxImage.removeAttribute("src");lightboxImage.alt="Photograph not added yet"};$("#lightboxCaption").textContent=p.caption;$("#lightboxCounter").textContent=`${currentPhoto+1} / ${CONFIG.gallery.length}`}
function closeLightbox(){if(!lightbox.classList.contains("open"))return;lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$("#lightboxClose").addEventListener("click",closeLightbox);
$("#lightboxPrev").addEventListener("click",()=>openLightbox(currentPhoto-1));
$("#lightboxNext").addEventListener("click",()=>openLightbox(currentPhoto+1));
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="ArrowLeft")openLightbox(currentPhoto-1);if(e.key==="ArrowRight")openLightbox(currentPhoto+1)});
let touchStartX=0;lightbox.addEventListener("touchstart",e=>touchStartX=e.changedTouches[0].screenX,{passive:true});
lightbox.addEventListener("touchend",e=>{const dx=e.changedTouches[0].screenX-touchStartX;if(Math.abs(dx)>55)openLightbox(currentPhoto+(dx<0?1:-1))},{passive:true});

/* Ten interactive wishes. */
const wishesGrid=$("#wishesGrid");
CONFIG.wishes.forEach(([title,message],index)=>{
  const button=document.createElement("button");button.className="wish-card reveal";
  button.innerHTML=`<span>✧</span><b>${String(index+1).padStart(2,"0")}</b><small>${title}</small>`;
  button.addEventListener("click",()=>openModal(title,message,"A LITTLE WISH"));
  wishesGrid.appendChild(button);if(revealObserver)revealObserver.observe(button);else button.classList.add("visible");
});
$$("[data-gift]").forEach(button=>button.addEventListener("click",()=>{const [title,message]=CONFIG.gifts[Number(button.dataset.gift)];openModal(title,message,"A LITTLE SURPRISE")}));
$$("[data-openwhen]").forEach(button=>button.addEventListener("click",()=>{const [title,message]=CONFIG.openWhen[Number(button.dataset.openwhen)];openModal(title,message,"OPEN WHENEVER YOU NEED")}));

/* Optional mini quiz. No answers are stored. */
const quizData=[
  {q:"Which deserves more celebration?",a:["A peaceful day","A delicious meal","A surprise gift","All of them"]},
  {q:"Which sky looks prettier?",a:["A starry night","A colourful sunset","A cloudy morning","All of them"]},
  {q:"What is the best birthday gift?",a:["Happiness","Good memories","Peace","All of them"]}
];
let quizIndex=0;
function renderQuiz(){
  const item=quizData[quizIndex];$("#quizQuestion").textContent=item.q;$("#quizProgress").textContent=`${String(quizIndex+1).padStart(2,"0")} / 03`;
  $("#quizOptions").innerHTML="";$("#quizResult").classList.add("hidden");$("#nextQuiz").classList.add("hidden");
  item.a.forEach(answer=>{const b=document.createElement("button");b.className="quiz-option";b.textContent=answer;b.addEventListener("click",()=>{$$(".quiz-option").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");$("#quizResult").classList.remove("hidden");$("#nextQuiz").classList.remove("hidden")});$("#quizOptions").appendChild(b)});
}
renderQuiz();
$("#nextQuiz").addEventListener("click",()=>{quizIndex=(quizIndex+1)%quizData.length;renderQuiz()});
$("#skipQuiz").addEventListener("click",()=>{$("#quizCard").innerHTML='<p class="eyebrow">THANK YOU FOR PLAYING</p><h3 style="font-size:30px">Hope that brought a little smile.</h3><p style="color:#aaa">Enjoy the rest of your birthday journey.</p>'});

/* Music: browser policy requires a user gesture. Missing file is handled quietly. */
const audio=$("#backgroundMusic"),musicToggle=$("#musicToggle");
let musicAvailable=true;
audio.addEventListener("error",()=>{musicAvailable=false;musicToggle.title="Add assets/music/background.mp3 to enable music";musicToggle.style.opacity=".55"});
musicToggle.addEventListener("click",async()=>{
  if(!musicAvailable){openModal("Music is optional","To enable music, add a properly licensed instrumental file named background.mp3 inside assets/music/. The rest of the website works perfectly without it.","A SMALL NOTE");return}
  if(audio.paused){try{await audio.play();musicToggle.classList.add("playing");musicToggle.setAttribute("aria-label","Pause background music")}catch(_){openModal("Music could not start","Your browser may have blocked playback. Try tapping the music button once more.","MUSIC PLAYER")}}
  else{audio.pause();musicToggle.classList.remove("playing");musicToggle.setAttribute("aria-label","Play background music")}
});
audio.addEventListener("ended",()=>musicToggle.classList.remove("playing"));

/* Small decorative fireworks on the final screen. */
(function createFireworks(){
  const host=$("#fireworks");if(!host)return;
  for(let i=0;i<7;i++){const f=document.createElement("i");f.className="firework";f.style.left=(8+Math.random()*84)+"%";f.style.top=(12+Math.random()*75)+"%";f.style.animationDelay=(Math.random()*3)+"s";f.style.animationDuration=(2.3+Math.random()*1.5)+"s";host.appendChild(f)}
})();

/* Replay: return to the opening screen and reset the cake. */
$("#replayButton").addEventListener("click",()=>{
  closeModal();closeLightbox();$("#envelope").classList.remove("open");cakeScene.classList.remove("blown");
  cakeMessage.classList.remove("show");wishButton.classList.remove("hidden");relight.classList.add("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});

/* Active nav marker. */
if("IntersectionObserver" in window){
  const sections=$$("main section[id]");
  const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){$$(".nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id))}
  }),{rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section=>activeObserver.observe(section));
}
