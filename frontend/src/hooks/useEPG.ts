import { useEffect, useState } from 'react';
import { epgAPI } from '../services/api';

export const useEPG = (channelId?: string, year?: number) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEPG = async () => {
      try {
        setLoading(true);
        let response;
        if (year) {
          response = await epgAPI.getByYear(year);
        } else if (channelId) {
          response = await epgAPI.getByChannel(channelId);
        } else {
          response = await epgAPI.getAll();
        }
        setPrograms(response.data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEPG();
  }, [channelId, year]);

  return { programs, loading, error };
};
