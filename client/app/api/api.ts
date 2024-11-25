
async function request(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  }).then((res) => res.json());

  return response;
}

export const getAllNotes = async () => {
  return await request('/api/notes/all');
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