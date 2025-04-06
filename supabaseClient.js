// supabaseClient.js

const supabaseUrl = 'https://wbkvftjmtnihcavfwikg.supabase.co'; // رابط مشروعك
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India3ZmdGptdG5paGNhdmZ3aWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDIyMTIsImV4cCI6MjA1OTQ3ODIxMn0.8ExDJ3Y4nzufeDMuRl82VWPK_3LI14qj5-6qitiCJq0'; // مفتاح anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
