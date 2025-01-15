import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabase';
export function useUserInfo() {
  const userEmail = ref('Guest');
  const userId = localStorage.getItem('user_id');

  onMounted(async () => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', userId)
            .single();
    
        if (error) {
            throw error;
        }
    
        if (data) {
            userEmail.value = data.email;
        }
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  });

  return {
    userEmail,
  };
} 