import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdminAccess = () => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("https://ironzengym-1.onrender.com/api/check-session", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
          navigate("/login");
        }
      } catch (err) {
        console.error("Session check failed", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Prevent back navigation after logout
    window.history.pushState(null, null, window.location.href);
    const blockBack = () => window.history.go(1);
    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("popstate", blockBack);
    };
  }, [navigate]);

  return { loading, hasAccess };
};

export default useAdminAccess;
