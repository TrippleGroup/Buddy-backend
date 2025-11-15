# Buddy Backend (Tripple Hydro and Energy)

This backend handles:
- OpenAI chat requests
- HeyGen Realtime Avatar TTS
- Secure system prompt storage
- Communication with Wix frontend

## Endpoints

### POST /api/buddy
Send a user message and receive:
- AI reply (text)
- HeyGen avatar response (stream info)

Example request:
{
  "userMessage": "Hello Buddy"
}

### POST /api/session
Creates a HeyGen realtime session (optional)

---

## Environment Variables (Vercel)

OPENAI_KEY  
HEYGEN_KEY  
AVATAR_ID  
BUDDY_SYSTEM_PROMPT  

---

## Deployment
This project is deployed on Vercel and automatically updates whenever code is pushed to GitHub.
