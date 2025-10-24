from app.core.supabase_client import supabase

def test_connection():
    try:
        # Replace 'profiles' with a table you already have in Supabase
        response = supabase.table("profiles").select("*").limit(1).execute()
        print("✅ Supabase connection successful!")
        print("Data returned:", response.data)
    except Exception as e:
        print("❌ Supabase connection failed:", e)

if __name__ == "__main__":
    test_connection()
