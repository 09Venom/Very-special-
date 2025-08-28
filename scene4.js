
// Scene 4: Messages list (from your code, scoped)
(function(){
  const messages = [
    "Dear Apsara 💅","You're my home👺","I love your voice 😉","I love everything about you🌝","I like you in kurti🌹",
    "I like you in saari👽","I like in all dress🥳","I love seeing your eyes 💗","Stare at you 👀","Your bak bak 🤩",
    "Your presence gives me goosebump 😍","I fall in love with you again and again🤪","You're my soulmate🤗","I love holding your hands🥵","Prettiest woman ever👠",
    "Mrs baniye meri hot girl👀🌹","Sabse special person ho aap🤭","I want to be in front of you 😘","Tenu pyar krda aa me🥳","Jaan to vadd ke👺",
    "Apsara meri oxygen 😭💗","I will fill your wishlist 👠","I wanna take you out somewhere💗","My strength power 😉","US mean We🥰",
    "choti don meri 😋","This is small gift for you👀💗","Your eyes drive me crazy👀💅","Waiting for that day😋","Where we'll hold hands🌝🔪","Meri queen😒🔪"
  ];
  const ulEl = document.querySelector("#scene4-container .page4-ul");
  let daynumber = 0; let activeIndex = 0;
  function build(){
    if(!ulEl) return;
    ulEl.innerHTML = "";
    messages.forEach((msg, idx)=>{
      const li = document.createElement('li');
      li.style.setProperty('--day_idx', idx);
      li.innerHTML = `<time>${idx+1}</time><span>${msg}</span>`;
      ulEl.appendChild(li);
    });
    ulEl.style.setProperty('--rotateDegrees', -360/messages.length);
    adjust(0);
  }
  function adjust(n){
    if(!ulEl) return;
    daynumber += n;
    ulEl.style.setProperty('--currentDay', daynumber);
    const prev = ulEl.querySelector('li.active'); if(prev) prev.classList.remove('active');
    activeIndex = (activeIndex + n + messages.length) % messages.length;
    const now = ulEl.querySelector(`li:nth-child(${activeIndex+1})`); if(now) now.classList.add('active');
  }
  function updateActive(){
    const active = document.getElementById('scene4').checked;
    if(active){ build(); bind(); }
  }
  function bind(){
    const prevBtn = document.querySelector('#scene4-container .page4-controls button[aria-label="Previous message"]');
    const nextBtn = document.querySelector('#scene4-container .page4-controls button[aria-label="Next message"]');
    if(prevBtn) prevBtn.onclick = ()=> adjust(-1);
    if(nextBtn) nextBtn.onclick = ()=> adjust(1);
    const back = document.querySelector('#scene4-container .back-btn');
    if(back) back.onclick = ()=>{ document.getElementById('scene3').checked = true; window.dispatchEvent(new Event('scenechange')); };
    document.addEventListener("keydown", (e)=>{
      if(!document.getElementById('scene4').checked) return;
      if(e.key === "ArrowUp"){ e.preventDefault(); adjust(-1); }
      if(e.key === "ArrowDown"){ e.preventDefault(); adjust(1); }
    });
  }
  window.addEventListener('scenechange', updateActive);
})();
