import { useEffect, useMemo, useState } from 'react';
import propertyService from '../services/propertyService';

export default function useProperties(params = {}) {
  const stableParams = useMemo(() => JSON.stringify(params), [params]);
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await propertyService.getAll(JSON.parse(stableParams));
        if (!active) return;
        setProperties(response.data.data.items || []);
        setPagination(response.data.data.pagination || null);
      } catch (err) {
        if (!active) return;
        setError(err.message || 'Failed to load properties');
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [stableParams]);

  return { properties, pagination, loading, error, setProperties };
}
