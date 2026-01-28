import { useEffect, useState } from "react";
import { me } from "@/services/apiClient";

/**
 * Global authentication hook
 * This is the ONLY place where auth state should be resolved
 * 
 * @returns {Object} { user, loading }
 * - user: Current user object or null if not authenticated
 * - loading: Boolean indicating if auth check is in progress
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
