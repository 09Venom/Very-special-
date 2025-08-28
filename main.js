// Scene cycling + lazy asset loader
(function(){
  const scenes = [
    { id: "scene1", css: "scene1.css", js: "scene1.js" },
    { id: "scene2", css: "scene2.css", js: "scene2.js" },
    { id: "scene3", css: "scene3.css", js: "scene3.js" },
    { id: "scene4", css: "scene4.css", js: "scene4.js" },
  ];
  const radios = scenes.map(s => document.getElementById(s.id));

  // Track loaded assets so we don't duplicate
  const loaded = { css: new Set(), js: new Set() };
  const activeLinks = new Map(); // id -> link element

  function loadCSS(file, sceneId){
    if(loaded.css.has(file)){
      // still ensure it's enabled for this scene, disable others
      for(const [sid, link] of activeLinks){
        if(sid !== sceneId && link) link.disabled = true;
      }
      const link = activeLinks.get(sceneId);
      if(link) link.disabled = false;
      return Promise.resolve();
    }
    return new Promise((resolve, reject)=>{
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = file;
      link.onload = ()=>{ loaded.css.add(file); activeLinks.set(sceneId, link); resolve(); };
      link.onerror = reject;
      document.head.appendChild(link);
      // Disable other scene links if any
      for(const [sid, l] of activeLinks){
        if(sid !== sceneId && l) l.disabled = true;
      }
    });
  }

  function loadJS(file){
    if(loaded.js.has(file)) return Promise.resolve();
    return new Promise((resolve, reject)=>{
      const s = document.createElement("script");
      s.src = file;
      s.onload = ()=>{ loaded.js.add(file); resolve(); };
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  function currentIndex(){
    return scenes.findIndex(s => document.getElementById(s.id).checked);
  }
  function gotoIndex(i){
    const idx = (i + scenes.length) % scenes.length;
    const scene = scenes[idx];
    const radio = document.getElementById(scene.id);
    radio.checked = true;
    // Ensure only the active container is visible (CSS also handles this)
    document.querySelectorAll('[id$="-container"]').forEach(el => {
      el.style.display = (el.id === scene.id + "-container") ? "block" : "none";
    });
    // Lazy load assets
    Promise.all([loadCSS(scene.css, scene.id), loadJS(scene.js)]).then(()=>{
      window.dispatchEvent(new Event('scenechange'));
    }).catch((e)=>{
      console.error("Failed to load assets for", scene.id, e);
      window.dispatchEvent(new Event('scenechange'));
    });
  }

  document.getElementById('nextBtn').addEventListener('click', ()=> gotoIndex(currentIndex()+1));
  document.getElementById('prevBtn').addEventListener('click', ()=> gotoIndex(currentIndex()-1));

  // On load: start at the checked radio's scene
  document.addEventListener('DOMContentLoaded', ()=> {
    // Hide all at start; gotoIndex will show the chosen one and load its assets
    document.querySelectorAll('[id$="-container"]').forEach(el => el.style.display = "none");
    gotoIndex(currentIndex() === -1 ? 0 : currentIndex());
  });
})();




function showScene(index) {
  // Hide all scenes
  document.querySelectorAll(".scene-container").forEach(s => s.classList.add("hidden"));

  // Show current scene
  const currentScene = document.getElementById(`scene${index}`);
  if (currentScene) {
    currentScene.classList.remove("hidden");
  }

  // Controls
  const prevBtn = document.getElementById("prevBtn");
  const surpriseBtn = document.getElementById("surpriseBtn");
  const intentionBtn = document.getElementById("intentionBtn");

  // Reset visibility
  prevBtn.style.display = "inline-block";  // always visible
  surpriseBtn.style.display = "none";
  intentionBtn.style.display = "none";

  // Scene-specific logic
  if (index === 1) {
    surpriseBtn.style.display = "inline-block";
  } else if (index === 2) {
    intentionBtn.style.display = "inline-block";
  } else if (index >= 3) {
    // Only Preview stays visible, others hidden
  }
}

