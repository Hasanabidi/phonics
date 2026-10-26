import React, { Suspense, useEffect } from 'react';

function TrackerInner() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const searchParams = new URLSearchParams(window.location.search);

      // 1. Developer / Admin Exclusion
      if (searchParams.get('admin') === 'true') {
        localStorage.setItem('admin_bypass', 'true');
        return;
      }

      if (localStorage.getItem('admin_bypass') === 'true') {
        return;
      }

      // 2. Track Both Custom (?v=client-name) & Direct Links
      const v = searchParams.get('v');
      const client = v && v.trim() ? v.trim() : 'direct-visitor';

      // 3. Prevent Duplicate Spam in Same Session
      const sessionKey = `visited_${client}`;
      if (sessionStorage.getItem(sessionKey)) {
        return;
      }

      // Mark session key immediately
      sessionStorage.setItem(sessionKey, 'true');

      // 4. Background Dispatch
      const payload = {
        client,
        page: window.location.pathname + window.location.search,
        userAgent: navigator.userAgent || '',
      };

      fetch('/api/notify-client-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silent failure: Never interrupt client experience
      });
    } catch {
      // Safe fallback
    }
  }, []);

  return null;
}

export function ClientTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}

export default ClientTracker;
