const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
};

async function request(url: string, options?: RequestInit) {
  const headers = {
    ...getAuthHeaders(),
    ...(options?.headers ?? {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Произошла ошибка при выполнении запроса');
  }

  return response.json();
}

export const getAllNotes = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(request('/api/notes/all'));
    }, 1000);
  });
};

export const createNote = async (text: string) => {
  return await request('/api/notes/add', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
};

export const updateNote = async (id: number, text: string) => {
  return await request(`/api/notes/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, text }),
  });
};

export const deleteNote = async (id: number) => {
  return await request(`/api/notes/delete/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
};