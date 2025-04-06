// createLink.js النهائي بعد معالجة كل المشاكل

document.addEventListener('DOMContentLoaded', () => {

  if (typeof supabase === 'undefined') {
    console.error('Supabase غير معرف. تحقق من تحميل supabaseClient.js أولاً.');
    return;
  }

  const linkForm = document.getElementById('linkForm');

  if (!linkForm) {
    console.error('النموذج linkForm غير موجود في الصفحة.');
    return;
  }

linkForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newLink = {
    name: document.getElementById('newName').value.trim(),
    url: document.getElementById('newUrl').value.trim(),
    description: document.getElementById('newDescription').value.trim(),
    category: document.getElementById('newCategory').value
  };

  console.log('سيتم إرسال الرابط التالي إلى Supabase:', newLink); // 🔥 مهم جداً

  try {
    const { data, error } = await supabase
      .from('dalillinks')
      .insert([newLink]) // لاحظ الأقواس المربعة [] مهمة جداً
      .select();         // <<< إضافة .select() هنا ضرورية مع Supabase v2 للحصول على البيانات المرتجعة

    if (error) {
      console.error('خطأ أثناء إضافة الرابط:', error.message);
      alert('حدث خطأ أثناء إضافة الرابط. حاول مرة أخرى.');
      return;
    }

    console.log('تمت الإضافة بنجاح:', data);

    if (typeof init === 'function') {
      await init();
    }

    const addLinkModal = bootstrap.Modal.getInstance(document.getElementById('addLinkModal'));
    if (addLinkModal) {
      addLinkModal.hide();
    }

    linkForm.reset();
  } catch (err) {
    console.error('خطأ غير متوقع:', err);
    alert('حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.');
  }
});
