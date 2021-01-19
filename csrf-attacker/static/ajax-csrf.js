;(async () => {
  const host = 'http://localhost:3000'
  console.log('Trying to introduce some damage ...')

  const response = await fetch(`${host}/data`, {
    method: 'GET',
    credentials: 'include',

    // All "application/json" requests, even GET are blocked by preflight request policy
    // headers: {
    // 'Content-Type': 'application/json'
    // },
  })

  console.log('response', response)
  console.log('data', await response.json())
})()
