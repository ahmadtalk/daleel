// getLinks.js

const supabaseUrl = 'https://wbkvftjmtnihcavfwikg.supabase.co' // ضع رابط مشروعك
const supabaseKey = 'your-anon-key' // ضع مفتاح anon key هنا
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchLinks() {
    const { data, error } = await supabase
        .from('dalillinks')
        .select('*');

    if (error) {
        console.error('خطأ في جلب الروابط:', error.message);
        return [];
    }

    return data;
}
