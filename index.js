import express from 'express';
import cors from 'cors';
import path from 'path';

import connectDatabase from './db/db.js'

import authRouter from './routes/auth.js'
import stadiumRouter from './routes/stadium.js'
import eventRouter from './routes/event.js'
import ticketRouter from './routes/ticket.js'
import crmRouter from './routes/crm.js'
import dashboardRouter from './routes/dashboard.js';
import ResourceList from './routes/resource.js';
import eventbookingRouter from './routes/eventbooking.js'

connectDatabase()

const app = express()

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRouter)
app.use('/api/stadiums', stadiumRouter)
app.use('/api/events', eventRouter)
app.use('/api/tickets', ticketRouter)
app.use('/api/crm', crmRouter)
app.use('/api/dashboard', dashboardRouter);
app.use('/api/resources', ResourceList);
app.use('/api/eventbooking',eventbookingRouter)


app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})