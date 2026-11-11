import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {extname, resolve, sep} from 'node:path';
const root=process.cwd();const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.ico':'image/x-icon','.json':'application/json'};
const port=Number(process.env.PORT)||4173;
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const target=resolve(root,'.'+pathname);if(target!==root&&!target.startsWith(root+sep)){res.writeHead(403).end();return;}let f=target;let st=await stat(f).catch(()=>null);if(!st||st.isDirectory())f=resolve(root,'index.html');const contents=await readFile(f);res.writeHead(200,{'Content-Type':types[extname(f)]||'application/octet-stream','Cache-Control':'no-cache'}).end(contents);}catch{res.writeHead(404).end('No encontrado');}}).listen(port,()=>console.log(`Abre http://localhost:${port}`));
