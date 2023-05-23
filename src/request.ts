type RequestOptions = {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete',
  body?: any,
  headers?: any,
}

export const request = async(
  url: string,
  {
    method = 'get',
    body,
    headers = {
      Accept: `application/json`,
      'Content-Type': `application/json`,
    },
  }: RequestOptions) => {
  const response = await fetch(
    url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  })

  const { ok, status } = response

  if (ok) {
    return await response.json()
  }

  if (status) {
    throw new Error(String(status), { cause: { status, response }});
  }

  throw new Error("Unknown error", { cause: { status, response }})
}
