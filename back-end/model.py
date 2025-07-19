import os
import re
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load Gemini 1.5 Flash model
model = genai.GenerativeModel(
    model_name="models/gemini-2.0-flash-lite",
    generation_config={"temperature": 0.3}
)

def analyze_resume(resume_text):
    prompt = f"""
You are an expert resume reviewer.
Given the following resume, provide:
1. A numeric score out of 100
2. A list of strengths (max 3 points)
3. A list of areas for improvement (max 3 points)

Resume:
\"\"\"
{resume_text}
\"\"\"

Format your response like:
Score: <number>
Strengths:
- ...
Areas for Improvement:
- ...
"""

    # Generate response from Gemini
    response = model.generate_content(prompt)

    # Cleanly extract score using regex
    score_match = re.search(r"score[:\s]+(\d+)", response.text, re.IGNORECASE)
    score = int(score_match.group(1)) if score_match else 0

    return {
        "score": score,
        "feedback": response.text
    }

