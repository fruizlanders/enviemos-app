// src/supabase/adminHooks.tsx
import {useEffect, useState} from 'react';

import type {Bank, Commerce, Profile, Envio} from './adminTypes.ts';
import {supabase} from './client';

export function useAllUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {data, error} = await supabase.from('user_data').select('*');
        if (error) {
          throw error;
        }

        setUsers(data as Profile[]);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {users, loading, error};
}

export function useAllCommerces(): Commerce[] | undefined {
  const [commerces, setCommerces] = useState<
    (Commerce & {user?: Profile})[] | undefined
  >(undefined);

  useEffect(() => {
    supabase
      .from('commerce')
      .select('*, bank (*), commerce_state:commerce_state (*), user_id')
      .then(({data, error}: {data: Commerce[] | null; error: any}) => {
        if (!error && data) {
          console.log(data);
          setCommerces(data as Commerce[]);
        } else {
          console.log('error', error);
        }
      });
  }, []);

  return commerces;
}

export function useAllBanks(): Bank[] | undefined {
  const [banks, setBanks] = useState<Bank[] | undefined>(undefined);

  useEffect(() => {
    if (!banks) {
      // @ts-ignore
      supabase
        .from('bank')
        .select('*')
        .then(({data, error}: {data: Bank[] | null; error: never}) => {
          if (!error && data) {
            console.log(data);
            setBanks(data as Bank[]);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [banks]);

  return banks;
}

export function useEnvios(userId?: string): Envio[] | undefined {
  const [envios, setEnvios] = useState<Envio[] | undefined>(undefined);

  useEffect(() => {
    const fetchEnvios = async () => {
      try {
        const {data: enviosData, error} = await supabase.from('envio').select(
          `
            *,
            origin_bank:origin_bank_id(*),
            envio_state:envio_state_id(*),
            commerce:commerce_id(code)
          `
        );
        if (error) throw error;
        setEnvios(enviosData as Envio[]);
      } catch (error) {
        console.error('Error fetching envios:', error);
      }
    };

    fetchEnvios();
  }, [userId]);

  return envios;
}

// Hook para agregar un nuevo envío
export function useAddEnvio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addEnvio = async (newEnvio: Partial<Envio>) => {
    setLoading(true);
    setError(null);

    try {
      const {data, error: insertError} = await supabase
        .from('envio')
        .insert([newEnvio])
        .single();

      if (insertError) throw insertError;

      return data;
    } catch (error) {
      console.error('Error adding envio:', error);
      setError('Failed to add envio');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {addEnvio, loading, error};
}

// Hook para actualizar un envío
export function useUpdateEnvio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEnvio = async (id: string, updatedEnvio: Partial<Envio>) => {
    setLoading(true);
    setError(null);

    try {
      const {data, error: updateError} = await supabase
        .from('envio')
        .update(updatedEnvio)
        .eq('id', id)
        .single();

      if (updateError) throw updateError;

      return data;
    } catch (error) {
      console.error('Error updating envio:', error);
      setError('Failed to update envio');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {updateEnvio, loading, error};
}

// Hook para eliminar un envío
export function useDeleteEnvio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEnvio = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const {data, error: deleteError} = await supabase
        .from('envio')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      return data;
    } catch (error) {
      console.error('Error deleting envio:', error);
      setError('Failed to delete envio');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {deleteEnvio, loading, error};
}

export function useCommerces(userId?: string): Commerce[] | undefined {
  const [commerces, setCommerces] = useState<Commerce[]>([]);
  useEffect(() => {
    if (userId) {
      supabase
        .from('commerce')
        .select(
          `
          *,
          bank (*),
          commerce_state (*)
        `
        )
        .eq('user_id', userId)
        .then(({data, error} = {data: null, error: null}) => {
          if (!error) {
            console.log(data);
            // @ts-ignore
            setCommerces(data as Commerce);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [userId]);

  return commerces;
}

export function useBanks(): Bank[] | undefined {
  const [banks, setBanks] = useState<Bank[] | undefined>(undefined);

  useEffect(() => {
    if (!banks) {
      supabase
        .from('bank')
        .select('*')
        .then(({data, error} = {data: null, error: null}) => {
          if (!error) {
            console.log(data);
            // @ts-ignore
            setBanks(data as Bank);
          } else {
            console.log('error', error);
          }
        });
    }
  }, [banks]);

  return banks;
}
