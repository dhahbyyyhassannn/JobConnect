import json
from ollama import chat

MODEL_NAME = "llama3.2"

EXTRACTION_PROMPT = """You are a CV parsing assistant. Extract the following structured data from the CV text below and return ONLY valid JSON, no explanation, no markdown formatting.

Schema:
{{
  "name": string,
  "email": string,
  "phone": string,
  "skills": [string],
  "experience": [{{"company": string, "title": string, "start_date": string, "end_date": string, "description": string}}]
}}

CV text:
\"\"\"
{cv_text}
\"\"\"

JSON:
"""


def analyze_match_with_llm(cv_text: str, job_text: str):
    prompt = f"""
    You are an AI recruitment assistant.

    Your task is to compare a candidate CV with a job offer.

    Analyze:

    1. Technical skills
    2. Work experience
    3. Education
    4. Job requirements
    5. Relevant projects

    Do not invent information that is not present in the CV.

    Give a matching score between 0 and 100.

    Rules:
    - 80-100: Strong match
    - 60-79: Good match
    - 40-59: Partial match
    - 0-39: Poor match
    - Set "matched" to true if the score is 60 or higher.
    - Only consider information explicitly present in the CV.
    - Be objective.

    Return ONLY valid JSON in this format:

    {{
        "score": 0,
        "matched": false,
        "matching_skills": [],
        "missing_requirements": [],
        "explanation": ""
    }}

    JOB OFFER:
    {job_text}

    CANDIDATE CV:
    {cv_text}
    """

    response = chat(
        model="llama3.2",
        messages=[
            {
                "role": "system",
                "content": "You are an expert recruitment assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        options={
            "temperature": 0
        }
    )

    content = response["message"]["content"]

    return json.loads(content)