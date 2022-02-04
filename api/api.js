export const getData = async () => {
  const response = await fetch('https://dummy.dotmind.io/api/v1/posts');
  const json = await response.json();

  return json.data;
};

export const postData = async (data) => {
  const post = await fetch('https://dummy.dotmind.io/api/v1/post/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const response = await post.json();

  console.log(response);
};
