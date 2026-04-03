import { useEffect, useMemo, useState } from 'react';
import projectService from '../services/projectService';

export default function useProjects(params = {}) {
  const stableParams = useMemo(() => JSON.stringify(params), [params]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await projectService.getAll(JSON.parse(stableParams));
        if (!active) return;
        setProjects(response.data.data.items || []);
      } catch (err) {
        if (!active) return;
        setError(err.message || 'Failed to load projects');
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [stableParams]);

  return { projects, loading, error, setProjects };
}
