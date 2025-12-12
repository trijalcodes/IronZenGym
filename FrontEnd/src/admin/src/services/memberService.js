import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/members';

export const fetchMembers = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addMember = async (memberData) => {
  const res = await axios.post(BASE_URL, memberData);
  return res.data;
};

export const deleteMember = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
