import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js'
import stadiumRouter from './routes/stadium.js'
import connectDatabase from './db/db.js'


connectDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/stadiums', stadiumRouter)

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})