// تهيئة Supabase
const supabaseUrl = 'https://wbkvftjmtnihcavfwikg.supabase.co';
const supabaseKey = 'your-public-api-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// جلب الروابط
async function fetchLinks() {
  const { data } = await supabase
    .from('links')
    .select('*')
    .order('created_at', { ascending: false });
  return data;
}

// إضافة رابط
async function addLink(newLink) {
  await supabase.from('links').insert([newLink]);
}
