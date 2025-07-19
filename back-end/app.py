from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from model import analyze_resume
import os
import fitz  # PyMuPDF
from dotenv import load_dotenv
import traceback

load_dotenv()
app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI"))
db = client['resume_db']
collection = db['resumes']

def extract_text_from_pdf(file):
    pdf_bytes = file.read()
    with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
        text = "\n".join(page.get_text() for page in doc)
    return text

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files.get('resume')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    filename = file.filename.lower()

    try:
        if filename.endswith(".pdf"):
            text = extract_text_from_pdf(file)
        elif filename.endswith(".txt"):
            text = file.read().decode('utf-8')
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        result = analyze_resume(text)

        collection.insert_one({
            "resume": text,
            "score": result['score'],
            "feedback": result['feedback']
        })

        return jsonify(result)
    
    except Exception as e:
        print("🔥 ERROR:", traceback.format_exc())  # Print full traceback in terminal
        return jsonify({"error": str(e)}), 500

@app.route("/resumes", methods=["GET"])
def get_resumes():
    docs = list(collection.find({}, {"_id": 0}))  # exclude Mongo _id for cleaner output
    return jsonify(docs)

if __name__ == "__main__":
    app.run(debug=True)