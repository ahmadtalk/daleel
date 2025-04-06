// createLink.js

async function addLink(linkData) {
    const { data, error } = await supabase
        .from('dalillinks')
        .insert([linkData]);

    if (error) {
        console.error('خطأ في إضافة الرابط:', error.message);
    } else {
        console.log('تمت إضافة الرابط بنجاح:', data);
    }
}
