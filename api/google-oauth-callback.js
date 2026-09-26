import crypto from 'crypto';
const REDIRECT='https://npc-schmiede-5e.vercel.app/api/google-oauth-callback';
function cookie(req,name){const m=String(req.headers.cookie||'').match(new RegExp('(?:^|;\\s*)'+name+'=([^;]*)'));return m?decodeURIComponent(m[1]):'';}
async function redis(cmd){const r=await fetch(process.env.UPSTASH_REDIS_REST_URL,{method:'POST',headers:{Authorization:`Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(cmd)});const d=await r.json();if(!r.ok||d.error)throw new Error(d.error||`Redis ${r.status}`);return d.result;}
export default async function handler(req,res){
 try{
  const code=String(req.query?.code||''), state=String(req.query?.state||'');
  if(!code||!state||state!==cookie(req,'nsc_oauth_state'))return res.status(400).send('Ungültige Google-Anmeldung.');
  const clientId=String(process.env.GOOGLE_CLIENT_ID||''), secret=String(process.env.GOOGLE_CLIENT_SECRET||'');
  if(!clientId||!secret||!process.env.UPSTASH_REDIS_REST_URL||!process.env.UPSTASH_REDIS_REST_TOKEN)throw new Error('Server-Konfiguration unvollständig.');
  const body=new URLSearchParams({code,client_id:clientId,client_secret:secret,redirect_uri:REDIRECT,grant_type:'authorization_code'});
  const tr=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
  const tok=await tr.json(); if(!tr.ok)throw new Error(tok.error_description||tok.error||'Token-Austausch fehlgeschlagen.');
  if(!tok.refresh_token)throw new Error('Google hat kein Refresh-Token geliefert. Bitte Zugriff erneut erlauben.');
  const sid=crypto.randomBytes(32).toString('hex');
  await redis(['SET',`npc-schmiede:google-session:v1:${sid}`,tok.refresh_token]);
  res.setHeader('Set-Cookie',[`nsc_google_session=${sid}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=15552000`,`nsc_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`]);
  res.redirect(302,'/?google=connected');
 }catch(e){console.error(e);res.status(500).send('Google-Verbindung fehlgeschlagen: '+e.message);}
}
