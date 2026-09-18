import json
from ollama import chat

MODEL_NAME = "llama3.2"


def analyze_match_with_llm(cv_text: str, job_text: str):

    prompt = f"""
Tu es un assistant spécialisé dans le recrutement.

Ton objectif est de déterminer si le candidat correspond à une offre d'emploi.

IMPORTANT :
1. Commence par analyser et comprendre l'OFFRE D'EMPLOI.
2. Identifie les compétences, expériences, formations et exigences demandées.
3. Ensuite, analyse le CV du candidat.
4. Compare le CV avec les exigences de l'offre.
5. Ne jamais inventer une information qui n'existe pas dans le CV.
6. Sois objectif.

DONNEES À ANALYSER :

OFFRE D'EMPLOI :
{job_text}

CV DU CANDIDAT :
{cv_text}

Retourne UNIQUEMENT un JSON valide, sans markdown et sans explication supplémentaire.

Format obligatoire :

{{
    "score": 0,
    "matched": false,
    "matching_skills": [],
    "missing_requirements": [],
    "matching_experience": [],
    "matching_education": [],
    "explanation": ""
}}

Règles du score :

80-100 = Très bonne correspondance
60-79 = Bonne correspondance
40-59 = Correspondance partielle
0-39 = Faible correspondance

"matched" doit être true si le score est supérieur ou égal à 60.
"""

    response = chat(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "Tu es un expert en analyse de CV et d'offres d'emploi."
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