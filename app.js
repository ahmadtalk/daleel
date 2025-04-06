// تهيئة Supabase
const supabaseUrl = 'https://wbkvftjmtnihcavfwikg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6India3ZmdGptdG5paGNhdmZ3aWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDIyMTIsImV4cCI6MjA1OTQ3ODIxMn0.8ExDJ3Y4nzufeDMuRl82VWPK_3LI14qj5-6qitiCJq0';
const supabase = createClient(supabaseUrl, supabaseKey);

// جلب الروابط
async function fetchLinks() {
  const { data } = await supabase
    .from('dalillinks')
    .select('*')
    .order('created_at', { ascending: false });
  return data;
}

// إضافة رابط
async function addLink(newLink) {
  await supabase.from('dalillinks').insert([newLink]);
}
