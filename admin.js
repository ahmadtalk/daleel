document.addEventListener('DOMContentLoaded', () => {

  if (typeof supabase === 'undefined') {
    console.error('Supabase غير معرف. تحقق من تحميل supabaseClient.js أولاً.');
    return;
  }

  const adminForm = document.getElementById('adminForm');
  const message = document.getElementById('message');

  adminForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newLink = {
      name: document.getElementById('adminName').value.trim(),
      url: document.getElementById('adminUrl').value.trim(),
      description: document.getElementById('adminDescription').value.trim(),
      category: document.getElementById('adminCategory').value.trim()
    };

    try {
      const { data, error } = await supabase
        .from('dalillinks')
        .insert([newLink])
        .select();

      if (error) {
        message.textContent = 'خطأ أثناء الإضافة: ' + error.message;
        message.style.color = 'red';
        return;
      }

      message.textContent = 'تمت إضافة الرابط بنجاح!';
      message.style.color = 'green';
      adminForm.reset();

    } catch (err) {
      message.textContent = 'حدث خطأ غير متوقع.';
      message.style.color = 'red';
      console.error(err);
    }
  });

});
