import handler from '../../utils/handler'

export default handler([])
  .get(async (req, res) => {
    return res.status(200).json({ msg: 'Hello Mars' })
})