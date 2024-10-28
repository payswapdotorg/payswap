import axios from 'axios'

// get fiat prices
const handler = async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://paygateglobal.com/api/v1/pay',
    params: {
      auth_token: '4df14d0d-506f-4c76-a6b7-990f1603bfce',
      phone_number: '92227100',
      amount: '1',
      description: 'pay',
      identifier: `${Math.round(Math.random() * Math.max(0, 100 - 0))}`,
      network: 'FLOOZ',
      url: 'https://www.payswap.org/cancan/collections/1/Water',
    },
  }

  try {
    const response = await axios.request(options)
    console.log('1response==========>', response)
    res.send({
      data: response.data,
      error: null,
    })
  } catch (error) {
    console.log('1error==========>', error)
    res.send({
      data: null,
      error,
    })
  }
}

export default handler
