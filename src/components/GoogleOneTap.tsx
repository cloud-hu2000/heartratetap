 "use client";

import { useEffect } from "react";

const GoogleOneTap = () => {
  useEffect(() => {
    const scriptId = "gsi-client";
    function initOnce() {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      // @ts-ignore
      if (!clientId || typeof window === "undefined" || !(window as any).google?.accounts?.id) return;

      // @ts-ignore
      const handleCredentialResponse = (response: any) => {
        if (!response || !response.credential) return;
        // send JWT to server login endpoint for verification
        void fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ credential: response.credential })
        })
          .then(async (res) => {
            if (res.ok) {
              // reload to reflect authenticated state or update UI as needed
              window.location.reload();
            } else {
              console.error("Google login failed", await res.text());
            }
          })
          .catch((err) => {
            console.error("Google login error", err);
          });
      };

      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse
      });

      // render standard button into container
      const container = document.getElementById("google-signin-button");
      if (container) {
        // @ts-ignore
        window.google.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          text: "signin_with"
        });
      }

      // show One Tap prompt
      // @ts-ignore
      window.google.accounts.id.prompt();
    }

    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client";
      s.id = scriptId;
      s.async = true;
      s.defer = true;
      s.onload = initOnce;
      document.head.appendChild(s);
    } else {
      initOnce();
    }

    return () => {
      // cancel any active One Tap
      try {
        // @ts-ignore
        window.google?.accounts?.id?.cancel && window.google.accounts.id.cancel();
      } catch {
        // ignore
      }
    };
  }, []);

  return <div id="google-signin-button" style={{ display: "inline-block" }} />;
};

export default GoogleOneTap;


