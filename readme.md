# Gemini Discord Bot 🤖✨

Bot ตัวนี้เชื่อมต่อกับ Google Gemini (Generative AI) เพื่อให้ Discord server ของคุณ “คุยกับ AI” ได้  
รองรับข้อความภาษาไทย/อังกฤษ, ตอบกลับแบบ markdown, รองรับแนบโค้ดยาวๆ เป็นไฟล์ ฯลฯ  
เขียนด้วย Node.js + discord.js + [LangChain.js](https://js.langchain.com/) + Gemini API

---

## Features

- ใช้ Google Gemini LLM (Generative AI) เป็น backend
- ตอบโต้ผู้ใช้ในแชท/ช่องทาง Discord แบบเรียลไทม์
- รองรับ markdown/code block
- ถ้าข้อความยาวเกิน 2,000 ตัวอักษร — แนบไฟล์ markdown ให้อัตโนมัติ
- รองรับคำสั่ง trigger เช่น `Gem: ...`
- ปลอดภัย ไม่เก็บ log user
- ง่ายต่อการต่อยอด (เช่น เพิ่ม RAG, เชื่อม vector DB ฯลฯ)

---