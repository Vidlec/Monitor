import { getComments } from '@services/mongo';

export default async function populateComments(data, params) {
  const comments = await getComments(params);
  data.comments = comments;
  return data;
}
