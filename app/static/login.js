;(async () => {
  await fetch('http://localhost:3000/login', {
    method: 'POST',
    credentials: 'same-origin',
  })

  const data = await (
    await fetch('http://localhost:3000/data', {
      method: 'GET',
      credentials: 'same-origin',
      // headers: {
      //   'csrf-token': Cookies.get('csrfToken'),
      // },
    })
  ).json()

  console.log('data', data)
})()
