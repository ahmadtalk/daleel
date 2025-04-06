// تهيئة Supabase
const supabaseUrl = 'https://wbkvftjmtnihcavfwikg.supabase.co';
const supabaseKey = 'SUPABASE_CLIENT_ANON_KEY';
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
