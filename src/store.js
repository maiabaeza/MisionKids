import {DEFAULT_STATE,INITIAL_ACTIVITIES,INITIAL_REWARDS,LEVELS} from './data.js';
export const KEY='aventuras-cada-dia-v1';
const clone=o=>JSON.parse(JSON.stringify(o));
export function normalizeState(candidate){
 const input=candidate&&typeof candidate==='object'&&!Array.isArray(candidate)?candidate:{};
 const activityList=Array.isArray(input.activities)?input.activities:INITIAL_ACTIVITIES;
 const activities=activityList.filter(a=>a&&typeof a.id==='string'&&typeof a.title==='string').slice(0,60).map(a=>({id:a.id.slice(0,80),title:a.title.slice(0,90),emoji:typeof a.emoji==='string'?a.emoji.slice(0,12):'⭐',period:['Mañana','Tarde','Noche'].includes(a.period)?a.period:'Tarde',enabled:a.enabled!==false}));
 const rewards=Object.fromEntries(LEVELS.map(l=>[l.id,(Array.isArray(input.rewards?.[l.id])?input.rewards[l.id]:INITIAL_REWARDS[l.id]).filter(x=>typeof x==='string').slice(0,20).map(x=>x.slice(0,120))]));
 const days={};if(input.days&&typeof input.days==='object'){for(const [date,day] of Object.entries(input.days).slice(-3000)){if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!day||typeof day!=='object')continue;const ratings={};for(const [id,v] of Object.entries(day.ratings||{})){if(activities.some(a=>a.id===id)&&LEVELS.some(l=>l.id===v))ratings[id]=v;}days[date]={ratings,finished:day.finished===true};}}
 const claims={};if(input.claims&&typeof input.claims==='object'){for(const [key,c] of Object.entries(input.claims)){if(/^\d{4}-\d{2}-\d{2}$/.test(key)&&c&&typeof c.reward==='string')claims[key]={reward:c.reward.slice(0,120),date:String(c.date||'').slice(0,10)};}}
 return {version:1,childName:typeof input.childName==='string'&&input.childName.trim()?input.childName.trim().slice(0,48):DEFAULT_STATE.childName,activities,rewards,days,claims,parentPin:/^\d{4,8}$/.test(input.parentPin||'')?input.parentPin:'',sound:input.sound!==false};
}
export function loadState(){try{return normalizeState(JSON.parse(localStorage.getItem(KEY)||'null'));}catch{return normalizeState(null)}}
export function saveState(state){try{localStorage.setItem(KEY,JSON.stringify(normalizeState(state)));return true;}catch{return false}}
export function resetState(){return clone(DEFAULT_STATE)}
export function exportState(state){return JSON.stringify({app:'Aventuras Cada Día',exportedAt:new Date().toISOString(),data:normalizeState(state)},null,2)}
export function importState(raw){const parsed=JSON.parse(raw);if(parsed?.app!=='Aventuras Cada Día'||!parsed.data||parsed.data.version!==1)throw Error('Archivo no compatible');return normalizeState(parsed.data)}
