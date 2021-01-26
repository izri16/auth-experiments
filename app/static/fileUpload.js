// eslint-disable-next-line
function onFileChangeHandler(event) {
  const file = event.target.files[0]

  const data = new FormData()
  data.append('file', file)

  fetch('http://localhost:3000/file', {
    method: 'POST',
    credentials: 'same-origin',
    body: data,
    headers: {
      'x-csrf': 1,
    },
  })
    .then((response) => response.json())
    .then((success) => console.log(success))
    .catch((error) => console.log(error))
}
