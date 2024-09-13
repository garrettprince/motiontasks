import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { Button } from '@/components/ui/button';

function AuthButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAuth = async () => {
    if (user) {
      await supabase.auth.signOut();
    } else {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
    }
  };

  return (
    <Button onClick={handleAuth}>
      {user ? 'Log out' : 'Log in'}
    </Button>
  );
}

export default AuthButton;
