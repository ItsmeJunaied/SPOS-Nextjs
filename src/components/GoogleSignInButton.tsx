"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (resp: { credential?: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const SCRIPT_ID = "google-identity-services";

export function GoogleSignInButton({
  onToken,
  onError,
}: {
  onToken: (idToken: string) => void;
  onError?: (message: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const domId = useId();

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;

    function render() {
      if (cancelled || !window.google || !ref.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (resp) => {
          if (resp.credential) onToken(resp.credential);
          else onError?.("Google did not return a credential. Please try again.");
        },
      });
      window.google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        width: 320,
      });
    }

    if (window.google) {
      render();
      return () => {
        cancelled = true;
      };
    }

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    script.addEventListener("error", () => onError?.("Could not load Google Sign-In."));
    return () => {
      cancelled = true;
      script?.removeEventListener("load", render);
    };
  }, [onToken, onError]);

  if (!GOOGLE_CLIENT_ID) return null;

  return <div key={domId} ref={ref} className="flex justify-center" />;
}
