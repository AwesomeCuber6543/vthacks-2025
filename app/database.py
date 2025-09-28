import pymysql
import os
from typing import Dict, List, Optional, Any
from contextlib import contextmanager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DatabaseManager:
    def __init__(self):
        self.host = os.getenv("DB_HOST", "localhost")
        self.port = int(os.getenv("DB_PORT", "3306"))
        self.user = os.getenv("DB_USER", "root")
        self.password = os.getenv("DB_PASSWORD", "")
        self.database = os.getenv("DB_NAME", "vthacks_2025")
    
    @contextmanager
    def get_connection(self):
        connection = None
        try:
            connection = pymysql.connect(
                host=self.host,
                port=self.port,
                user=self.user,
                password=self.password,
                database=self.database,
                charset='utf8mb4',
                cursorclass=pymysql.cursors.DictCursor
            )
            yield connection
        except Exception as e:
            if connection:
                connection.rollback()
            raise e
        finally:
            if connection:
                connection.close()
    
    def get_table_schema(self, table_name: str) -> Dict[str, Any]:
        """Get schema information for a specific table"""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                # Get column information
                cursor.execute(f"""
                    SELECT 
                        COLUMN_NAME,
                        DATA_TYPE,
                        IS_NULLABLE,
                        COLUMN_KEY,
                        COLUMN_DEFAULT,
                        EXTRA
                    FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_SCHEMA = '{self.database}' 
                    AND TABLE_NAME = '{table_name}'
                    ORDER BY ORDINAL_POSITION
                """)
                columns = cursor.fetchall()
                
                # Get foreign key information
                cursor.execute(f"""
                    SELECT 
                        COLUMN_NAME,
                        REFERENCED_TABLE_NAME,
                        REFERENCED_COLUMN_NAME
                    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                    WHERE TABLE_SCHEMA = '{self.database}' 
                    AND TABLE_NAME = '{table_name}'
                    AND REFERENCED_TABLE_NAME IS NOT NULL
                """)
                foreign_keys = cursor.fetchall()
                
                return {
                    "table_name": table_name,
                    "columns": columns,
                    "foreign_keys": foreign_keys
                }
    
    def execute_query(self, query: str, params: tuple = None) -> List[Dict[str, Any]]:
        """Execute a SELECT query and return results"""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                return cursor.fetchall()
    
    def execute_insert(self, query: str, params: tuple = None) -> int:
        """Execute an INSERT query and return the last insert ID"""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                conn.commit()
                return cursor.lastrowid
    
    def execute_update(self, query: str, params: tuple = None) -> int:
        """Execute an UPDATE query and return the number of affected rows"""
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                conn.commit()
                return cursor.rowcount
    
    def upsert_user(self, user_data: Dict[str, Any]) -> int:
        """Insert or update user data"""
        query = """
            INSERT INTO user (first, last, school, grad_year, major, instate, state, country)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
            first = VALUES(first),
            last = VALUES(last),
            school = VALUES(school),
            grad_year = VALUES(grad_year),
            major = VALUES(major),
            instate = VALUES(instate),
            state = VALUES(state),
            country = VALUES(country),
            updated_at = CURRENT_TIMESTAMP
        """
        params = (
            user_data.get('first'),
            user_data.get('last'),
            user_data.get('school'),
            user_data.get('grad_year'),
            user_data.get('major'),
            user_data.get('instate'),
            user_data.get('state'),
            user_data.get('country')
        )
        return self.execute_insert(query, params)
    
    def upsert_financial(self, user_id: int, financial_data: Dict[str, Any]) -> int:
        """Insert or update financial data for a user"""
        query = """
            INSERT INTO financial (user_id, salary, credit_score, savings)
            VALUES (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
            salary = VALUES(salary),
            credit_score = VALUES(credit_score),
            savings = VALUES(savings),
            updated_at = CURRENT_TIMESTAMP
        """
        params = (
            user_id,
            financial_data.get('salary'),
            financial_data.get('credit_score'),
            financial_data.get('savings')
        )
        return self.execute_insert(query, params)
    
    def upsert_tuition(self, user_id: int, tuition_data: Dict[str, Any]) -> int:
        """Insert or update tuition data for a user"""
        query = """
            INSERT INTO tuition (user_id, tuition_full, scholarship)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE
            tuition_full = VALUES(tuition_full),
            scholarship = VALUES(scholarship),
            updated_at = CURRENT_TIMESTAMP
        """
        params = (
            user_id,
            tuition_data.get('tuition_full'),
            tuition_data.get('scholarship')
        )
        return self.execute_insert(query, params)
    
    def add_chat(self, user_id: int, summary: str, content: str) -> int:
        """Add a new chat entry"""
        query = """
            INSERT INTO chat (user_id, summary, content)
            VALUES (%s, %s, %s)
        """
        params = (user_id, summary, content)
        return self.execute_insert(query, params)
    
    def get_user_chats(self, user_id: int) -> List[Dict[str, Any]]:
        """Get all chats for a specific user"""
        query = """
            SELECT chat_id, summary, content, created_at, updated_at
            FROM chat
            WHERE user_id = %s
            ORDER BY created_at DESC
        """
        return self.execute_query(query, (user_id,))
    
    def get_financial_data(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Get financial data for a specific user"""
        query = "SELECT * FROM financial WHERE user_id = %s"
        results = self.execute_query(query, (user_id,))
        return results[0] if results else None
    
    def get_tuition_data(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Get tuition data for a specific user"""
        query = "SELECT * FROM tuition WHERE user_id = %s"
        results = self.execute_query(query, (user_id,))
        return results[0] if results else None
    
    def get_user_by_id(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        query = "SELECT * FROM user WHERE user_id = %s"
        results = self.execute_query(query, (user_id,))
        return results[0] if results else None
    
    def get_user_by_name(self, first: str, last: str) -> Optional[Dict[str, Any]]:
        """Get user by first and last name"""
        query = "SELECT * FROM user WHERE first = %s AND last = %s"
        results = self.execute_query(query, (first, last))
        return results[0] if results else None
    
    def get_all_users(self) -> List[Dict[str, Any]]:
        """Get all users"""
        query = "SELECT * FROM user ORDER BY created_at DESC"
        return self.execute_query(query)

# Global database manager instance
db_manager = DatabaseManager()
