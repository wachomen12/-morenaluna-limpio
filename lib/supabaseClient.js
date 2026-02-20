import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtehjswidqsijmepxcqc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZWhqc3dpZHFzaWptZXB4Y3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NjA0NjgsImV4cCI6MjA4NzEzNjQ2OH0.oCwxuzW8fJ83huxTTLbIKR33Id8VJojIcIe-uygn45M';

export const supabase = createClient(supabaseUrl, supabaseKey);