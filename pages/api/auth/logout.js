import cookie from 'cookie'

export default async (req, res) => {
  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize('auth', '', {
        maxAge: -1,
        path: '/',
      }),
    ])

    return res.status(200).json({ msg: 'logged out' })
  } catch (e) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}
