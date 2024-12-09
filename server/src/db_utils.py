import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "db"),
        port=int(os.getenv("DB_PORT", 3306)),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "73961200"),
        database=os.getenv("DB_NAME", "supermarkets_db")
    )

def execute_query(query, params=None, fetchone=False):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute(query, params)
        
        # Return affected row count for DELETE/INSERT/UPDATE queries
        if query.strip().upper().startswith(("INSERT", "UPDATE", "DELETE")):
            affected_rows = cursor.rowcount
            connection.commit()
            return affected_rows

        # Fetch results for SELECT queries
        if fetchone:
            result = cursor.fetchone()
        else:
            result = cursor.fetchall()

        connection.commit()
        return result

    except Exception as e:
        raise Exception(f"Database error: {str(e)}")
    finally:
        cursor.close()
        connection.close()