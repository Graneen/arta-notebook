export const getAllNotes = async () => {
        const response = await fetch('/api/notes/all')
        .then((response) => response.json())
        .then((data) => {
            return data 
        });
        return response
};

export const createNote = async (text: string) => {
  const response = await fetch('/api/notes/add', 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({text})
  })
  .then((response) => response.json())
  .then((data) => {
      return data 
  });
  return response
};

export const updateNote = async (id: number, text: string) => {
  const response = await fetch(`/api/notes/update/${id}`, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({id, text})
  })
  .then((response) => response.json())
  .then((data) => {
      return data 
  });
  return response
};

export const deleteNote = async (id: number) => {
  const response = await fetch(`/api/notes/delete/${id}`, 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({id})
  })
  .then((response) => response.json())
  .then((data) => {
      return data 
  });
  return response
};
