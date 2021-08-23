import env from 'dotenv'
import app from './index'

env.config()
app.listen(process.env.PORT, () => {
  console.log('Server started')
})
