from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import psycopg2
import os
import vanna

# Load environment variables
load_dotenv()

app = FastAPI()

# Initialize Vanna API key
vanna.api_key = os.getenv("VANNA_API_KEY")

# PostgreSQL connection
connection = psycopg2.connect(os.getenv("POSTGRES_URI"))
cursor = connection.cursor()

# Request body model
class QuestionRequest(BaseModel):
    question: str

@app.post("/chat-with-data")
def chat_with_data(req: QuestionRequest):
    try:
        # Step 1: Generate SQL using Vanna
        sql_query = vanna.generate_sql(req.question)
        print("Generated SQL:", sql_query)

        # Step 2: Run SQL on Postgres
        cursor.execute(sql_query)
        rows = cursor.fetchall()
        col_names = [desc[0] for desc in cursor.description]

        # Step 3: Convert rows to list of dicts
        results = [dict(zip(col_names, row)) for row in rows]

        return {"sql": sql_query, "data": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# FastAPI Vanna service runs on: http://localhost:8000/chat-with-data
