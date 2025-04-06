const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
  const { name, url, description, category } = JSON.parse(event.body);

  const { data, error } = await supabase
    .from('dalillinks')
    .insert([{ name, url, description, category }])
    .single();

  if (error) return { statusCode: 500, body: error.message };
  return { statusCode: 200, body: JSON.stringify(data) };
};
