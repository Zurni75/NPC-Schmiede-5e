import crypto from 'crypto';
const REDIRECT='https://npc-schmiede-5e.vercel.app/api/google-oauth-callback';
export default function handler(req,res){
 const clientId=String(process.env.GOOGLE_CLIENT_ID||'').trim();
 if(!clientId)return res.status(503).send('Google OAuth ist nicht eingerichtet.');
 const state=crypto.randomBytes(24).toString('hex');
 res.setHeader('Set-Cookie',`nsc_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
 const q=new URLSearchParams({client_id:clientId,redirect_uri:REDIRECT,response_type:'code',scope:'https://www.googleapis.com/auth/drive.file',access_type:'offline',include_granted_scopes:'true',prompt:'consent',state});
 res.redirect(302,'https://accounts.google.com/o/oauth2/v2/auth?'+q.toString());
}
