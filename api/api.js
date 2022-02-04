export const getData = async () => {
  const response = await fetch('https://dummy.dotmind.io/api/v1/posts');
  const json = await response.json();

  return json.data;
};
