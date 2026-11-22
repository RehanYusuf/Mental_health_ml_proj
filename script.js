const API_URL = "https://mental-health-ml-proj.onrender.com/predict";

const OPTIONS = {
  gender: ["Male","Female"],
  academic_level: ["High-School","Undergraduate","Graduate"],
  most_used_platform: ["Instagram","TikTok","YouTube","WhatsApp","Facebook","Twitter","Snapchat","LinkedIn","WeChat","LINE","KakaoTalk","VKontakte"],
  purpose_of_use: ["Entertainment","Education","Networking","News"],
  stress_level: ["Low","Medium","High","Very High"],
  country: ["India","USA","Canada","Australia","UK","Germany","Mexico","Turkey","France","Other"]
};
const SLIDERS = [
  {key:"avg_daily_usage_hours", label:"Social media use per day"},
  {key:"study_hours", label:"Study per day"},
  {key:"physical_activity_hours", label:"Physical activity per day"},
  {key:"sleep_hours_per_night", label:"Sleep per night"}
];
const DEFAULTS = {age:21,gender:"Male",country:"India",academic_level:"Undergraduate",most_used_platform:"Instagram",purpose_of_use:"Entertainment",avg_daily_usage_hours:5.5,daily_unlocks:60,study_hours:4,physical_activity_hours:1,sleep_hours_per_night:7,stress_level:"Medium"};
const PRESETS = [
  {name:"Balanced student", note:"Good sleep, light screen time", data:{age:20,gender:"Female",country:"Canada",academic_level:"Undergraduate",most_used_platform:"WhatsApp",purpose_of_use:"Education",avg_daily_usage_hours:2.5,daily_unlocks:35,study_hours:4,physical_activity_hours:1.5,sleep_hours_per_night:8,stress_level:"Low"}},
  {name:"Heavy social media user", note:"Long hours, short nights", data:{age:19,gender:"Female",country:"USA",academic_level:"Undergraduate",most_used_platform:"TikTok",purpose_of_use:"Entertainment",avg_daily_usage_hours:8.5,daily_unlocks:140,study_hours:2,physical_activity_hours:0.5,sleep_hours_per_night:5.5,stress_level:"High"}},
  {name:"High academic stress", note:"Heavy study load, little rest", data:{age:23,gender:"Male",country:"India",academic_level:"Graduate",most_used_platform:"LinkedIn",purpose_of_use:"Networking",avg_daily_usage_hours:4,daily_unlocks:70,study_hours:10,physical_activity_hours:0,sleep_hours_per_night:5,stress_level:"Very High"}}
];

const $ = id => document.getElementById(id);
const state = {...DEFAULTS};

/* ---------- build controls ---------- */
function buildSelect(id, values){
  $(id).innerHTML = values.map(v => `<option value="${v}">${v}</option>`).join("");
  $(id).addEventListener("change", e => { state[id] = e.target.value; });
}
function buildSeg(id, values){
  const el = $(id);
  el.innerHTML = values.map(v => `<button type="button" role="radio" aria-checked="false" data-v="${v}">${v}</button>`).join("");
  el.addEventListener("click", e => {
    const b = e.target.closest("button"); if(!b) return;
    state[id] = b.dataset.v; paintSeg(id);
  });
}
function paintSeg(id){
  $(id).querySelectorAll("button").forEach(b => b.setAttribute("aria-checked", b.dataset.v === state[id]));
}
function buildSliders(){
  $("sliders").innerHTML = SLIDERS.map(s => `
    <div class="field">
      <label for="${s.key}-n">${s.label} <span class="hint">(hours)</span></label>
      <div class="slider-row">
        <input type="range" id="${s.key}-r" min="0" max="24" step="0.5" aria-label="${s.label}">
        <input class="inp" type="number" id="${s.key}-n" min="0" max="24" step="0.5">
      </div>
    </div>`).join("");
  SLIDERS.forEach(({key}) => {
    const r = $(key+"-r"), n = $(key+"-n");
    r.addEventListener("input", () => { state[key] = parseFloat(r.value); n.value = r.value; });
    n.addEventListener("input", () => {
      const v = parseFloat(n.value);
      if(!isNaN(v)){ state[key] = v; r.value = Math.min(24, Math.max(0, v)); }
    });
  });
}

buildSelect("academic_level", OPTIONS.academic_level);
buildSelect("most_used_platform", OPTIONS.most_used_platform);
buildSeg("gender", OPTIONS.gender);
buildSeg("purpose_of_use", OPTIONS.purpose_of_use);
buildSeg("stress_level", OPTIONS.stress_level);
buildSliders();

// country: list + custom option
$("country").innerHTML = OPTIONS.country.slice(0,-1).map(c=>`<option>${c}</option>`).join("")
  + `<option value="__other__">Other (type a country)…</option>`;
$("country").addEventListener("change", e => {
  const custom = e.target.value === "__other__";
  $("countryCustom").classList.toggle("hidden", !custom);
  state.country = custom ? $("countryCustom").value.trim() : e.target.value;
  if(custom) $("countryCustom").focus();
});
$("countryCustom").addEventListener("input", e => { state.country = e.target.value.trim(); });
$("age").addEventListener("input", e => { state.age = e.target.value === "" ? NaN : Number(e.target.value); });
$("daily_unlocks").addEventListener("input", e => { state.daily_unlocks = e.target.value === "" ? NaN : Number(e.target.value); });

/* ---------- push state to the UI ---------- */
function paintForm(){
  $("age").value = state.age;
  $("daily_unlocks").value = state.daily_unlocks;
  ["academic_level","most_used_platform"].forEach(k => $(k).value = state[k]);
  ["gender","purpose_of_use","stress_level"].forEach(paintSeg);
  const known = OPTIONS.country.slice(0,-1).includes(state.country);
  $("country").value = known ? state.country : "__other__";
  $("countryCustom").classList.toggle("hidden", known);
  $("countryCustom").value = known ? "" : state.country;
  SLIDERS.forEach(({key}) => { $(key+"-r").value = state[key]; $(key+"-n").value = state[key]; });
}
function setState(data){ Object.assign(state, data); paintForm(); }

$("presets").innerHTML = PRESETS.map((p,i)=>`<button type="button" class="preset" data-i="${i}"><b>${p.name}</b><span>${p.note}</span></button>`).join("");
$("presets").addEventListener("click", e => {
  const b = e.target.closest(".preset"); if(!b) return;
  setState(PRESETS[b.dataset.i].data); hideError();
});
$("reset").addEventListener("click", () => { setState(DEFAULTS); hideError(); show("empty"); });

/* ---------- UI helpers ---------- */
function show(which){ ["empty","loading","result"].forEach(id => $(id).classList.toggle("hidden", id !== which)); }
function showError(html){ $("error").innerHTML = html; $("error").classList.remove("hidden"); }
function hideError(){ $("error").classList.add("hidden"); }

/* ---------- validation ---------- */
function validate(){
  const s = state, errs = [];
  if(!Number.isInteger(s.age) || s.age < 10 || s.age > 100) errs.push("Age must be a whole number between 10 and 100.");
  if(!Number.isInteger(s.daily_unlocks) || s.daily_unlocks < 0) errs.push("Phone unlocks must be a whole number of 0 or more.");
  if(!s.country) errs.push("Enter a country name.");
  SLIDERS.forEach(({key,label}) => {
    if(!(s[key] >= 0 && s[key] <= 24)) errs.push(`${label} must be between 0 and 24 hours.`);
  });
  return errs;
}

/* ---------- result rendering ---------- */
function band(score){
  if(score >= 7) return {label:"Healthy mental well-being", color:"#0f9d8f", bg:"#e0f5f2", text:"Healthy range: scores of 7 and above."};
  if(score >= 4) return {label:"Moderate well-being", color:"#c98a12", bg:"#fbf1da", text:"Moderate range: scores from 4 to 6.9."};
  return {label:"Low well-being", color:"#d1495b", bg:"#fbe6e9", text:"Low range: scores below 4."};
}
function insightsFor(s){
  const out = [];
  const add = (type, icon, msg) => out.push({type, icon, msg});
  if(s.sleep_hours_per_night < 7) add("warn","🌙",`Sleep is ${s.sleep_hours_per_night} hours a night. Moving toward 7–9 hours often helps mood and focus.`);
  else add("good","🌙",`${s.sleep_hours_per_night} hours of sleep is in a healthy range. Keeping a steady bedtime helps it last.`);
  if(s.avg_daily_usage_hours > 5) add("warn","📱",`${s.avg_daily_usage_hours} hours on social media a day is high. Trying app limits or phone-free meals could free up time.`);
  else if(s.avg_daily_usage_hours <= 3) add("good","📱",`Social media use of ${s.avg_daily_usage_hours} hours a day is modest, which leaves room for other things.`);
  if(s.daily_unlocks > 100) add("warn","🔓",`${s.daily_unlocks} unlocks a day suggests frequent checking. Turning off non-essential notifications can cut that down.`);
  if(s.physical_activity_hours < 1) add("warn","🏃",`Physical activity is ${s.physical_activity_hours} hours a day. Even a 20–30 minute walk can lift mood.`);
  else add("good","🏃",`${s.physical_activity_hours} hours of daily activity is a real strength for mood and sleep.`);
  if(s.stress_level === "High" || s.stress_level === "Very High") add("warn","🫧",`Stress is reported as ${s.stress_level.toLowerCase()}. Short breaks, talking to someone you trust, or campus counselling can help.`);
  if(s.study_hours >= 8 && s.sleep_hours_per_night < 7) add("warn","📚",`Long study days combined with short sleep can wear you down. Protecting sleep usually helps learning too.`);
  if(s.purpose_of_use === "Entertainment" && s.avg_daily_usage_hours > 5) add("note","🎬",`Most of your screen time is for entertainment. Swapping some of it for offline hobbies or time with friends may help.`);
  if(s.sleep_hours_per_night + s.study_hours + s.physical_activity_hours > 24) add("note","⏱️","Sleep, study and activity add up to more than 24 hours. Check those numbers for overlap.");
  return out.slice(0,6);
}
function renderResult(score, inputs){
  const b = band(score);
  const pct = Math.max(0, Math.min(1, (score - 1) / 9)) * 100;
  const arc = $("arcFill");
  arc.style.stroke = b.color;
  arc.style.strokeDashoffset = 100;
  $("scoreText").textContent = score.toFixed(2);
  $("gaugeSvg").setAttribute("aria-label", `Predicted score ${score.toFixed(2)} out of 10`);
  $("badge").textContent = b.label;
  $("badge").style.cssText = `background:${b.bg};color:${b.color}`;
  $("badgeText").textContent = b.text;
  $("insights").innerHTML = insightsFor(inputs).map(i => `<div class="insight ${i.type}"><i>${i.icon}</i><div>${i.msg}</div></div>`).join("");
  show("result");
  requestAnimationFrame(() => requestAnimationFrame(() => { arc.style.strokeDashoffset = 100 - pct; }));
}

/* ---------- submit ---------- */
$("form").addEventListener("submit", async e => {
  e.preventDefault(); hideError();
  const errs = validate();
  if(errs.length){ showError("<b>Check the form</b><ul class='list-disc ml-5 mt-1'>" + errs.map(m=>`<li>${m}</li>`).join("") + "</ul>"); return; }

  const payload = {
    age: state.age, gender: state.gender, country: state.country,
    academic_level: state.academic_level, most_used_platform: state.most_used_platform,
    purpose_of_use: state.purpose_of_use, avg_daily_usage_hours: state.avg_daily_usage_hours,
    daily_unlocks: state.daily_unlocks, study_hours: state.study_hours,
    physical_activity_hours: state.physical_activity_hours,
    sleep_hours_per_night: state.sleep_hours_per_night, stress_level: state.stress_level
  };

  $("submit").disabled = true; $("submit").textContent = "Predicting…"; show("loading");
  try{
    const res = await fetch(API_URL, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
    if(!res.ok){
      let detail = "";
      try{ const j = await res.json(); detail = typeof j.detail === "string" ? j.detail : JSON.stringify(j.detail, null, 1); }catch(_){}
      const kind = res.status === 422
        ? "The server rejected one of the values (422). Check that every field matches the allowed options."
        : `The server returned an error (${res.status}). Look at the terminal running uvicorn for the traceback.`;
      showError(`<b>Prediction failed</b><br>${kind}` + (detail ? `<pre class="mt-2 text-xs whitespace-pre-wrap overflow-x-auto">${detail.replace(/</g,"&lt;")}</pre>` : ""));
      show("empty"); return;
    }
    const data = await res.json();
    renderResult(Number(data.predicted_mental_health_score), payload);
  }catch(err){
    showError(`<b>Can't reach the backend</b><br>Make sure FastAPI is running at <code>http://127.0.0.1:8000</code>. From the folder with <code>main.py</code>, run <code>uvicorn main:app --reload</code>, then try again. Opening this page through <code>http://</code> (Live Server) also avoids browser restrictions on <code>file://</code> pages.`);
    show("empty");
  }finally{
    $("submit").disabled = false; $("submit").textContent = "Predict score";
  }
});

paintForm();
