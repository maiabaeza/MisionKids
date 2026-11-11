export const LEVELS=[
 {id:'sloth',label:'Oso perezoso',message:'Hoy no se logró',points:0,color:'#a47ba1',short:'No lo hice'},
 {id:'turtle',label:'Tortuga',message:'¡Buen intento!',points:1,color:'#45b9a8',short:'Lo intenté'},
 {id:'penguin',label:'Pingüino',message:'¡Buen trabajo!',points:2,color:'#f0ae64',short:'Lo hice bien'},
 {id:'fox',label:'Zorro',message:'¡Muy bien hecho!',points:3,color:'#f58eab',short:'¡Muy bien!'},
 {id:'tiger',label:'Tigre',message:'¡Increíble!',points:4,color:'#ae53a0',short:'¡Increíble!'}
];
export const INITIAL_ACTIVITIES=[
 ['bed','Hacer mi cama','🛏️','Mañana'],['dress','Vestirme','👕','Mañana'],['pet','Dar de comer a mi mascota','🐶','Mañana'],['teeth','Cepillarme los dientes','🪥','Mañana'],
 ['eat','Comer','🍎','Tarde'],['homework','Hacer mi tarea','✏️','Tarde'],['plants','Regar las plantas','🪴','Tarde'],['dishes','Llevar los trastes','🍽️','Tarde'],
 ['bath','Bañarme','🛁','Noche'],['laundry','Llevar ropa sucia','🧺','Noche'],['toys','Guardar juguetes','🧸','Noche']
].map(([id,title,emoji,period],index)=>({id,title,emoji,period,enabled:index<8}));
export const INITIAL_REWARDS={
 sloth:['Un abrazo y volver a intentarlo mañana'],
 turtle:['10 minutos de juego','Elegir un dulce'],
 penguin:['20 minutos de juego','Salir al parque'],
 fox:['30 minutos de juego en el parque','10 minutos extra de juego'],
 tiger:['Una salida al cine','Elegir una actividad especial en familia']
};
export const DEFAULT_STATE={version:1,childName:'Pequeño explorador',activities:INITIAL_ACTIVITIES,rewards:INITIAL_REWARDS,days:{},claims:{},parentPin:'',sound:true};
export const isoDate=(date)=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export const dateFromISO=(value)=>{const [y,m,d]=value.split('-').map(Number);return new Date(y,m-1,d)};
export const mondayOf=(date)=>{const d=new Date(date.getFullYear(),date.getMonth(),date.getDate());d.setDate(d.getDate()-((d.getDay()+6)%7));return d};
export const weekDates=(date)=>{const monday=mondayOf(date);return Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(d.getDate()+i);return isoDate(d)})};
export const monthCells=(date)=>{const start=new Date(date.getFullYear(),date.getMonth(),1);start.setDate(start.getDate()-((start.getDay()+6)%7));return Array.from({length:42},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return {date:isoDate(d),day:d.getDate(),inMonth:d.getMonth()===date.getMonth()}})};
export const ratingOf=(id)=>LEVELS.find(l=>l.id===id);
export function daySummary(state,date){
 const day=state.days[date];const ratings=Object.values(day?.ratings||{}).filter(v=>ratingOf(v));
 const counts=LEVELS.map(l=>({level:l,count:ratings.filter(v=>v===l.id).length}));
 counts.sort((a,b)=>b.count-a.count||b.level.points-a.level.points);
 const enabled=state.activities.filter(a=>a.enabled);
 const completed=enabled.filter(a=>ratingOf(day?.ratings?.[a.id])).length;
 return {completed,total:enabled.length,finished:!!day?.finished,dominant:ratings.length?counts[0].level:null,average:ratings.length?ratings.reduce((t,id)=>t+ratingOf(id).points,0)/ratings.length:null};
}
export function weekSummary(state,date){
 const dates=weekDates(date), finished=dates.filter(d=>state.days[d]?.finished),ratings=finished.flatMap(d=>Object.values(state.days[d].ratings||{})).filter(v=>ratingOf(v));
 const levels=LEVELS.map(l=>({level:l,count:ratings.filter(v=>v===l.id).length})).sort((a,b)=>b.count-a.count||b.level.points-a.level.points);
 return {dates,finishedDays:finished.length,ratings:ratings.length,dominant:ratings.length?levels[0].level:null,average:ratings.length?ratings.reduce((t,id)=>t+ratingOf(id).points,0)/ratings.length:null,weekKey:dates[0]};
}
export const escapeHTML=(str)=>String(str??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
