import express from 'express';
import { json } from "body-parser";
import { connect } from "./db/database";
import profile from './profile/route';
import post from './post/route';
import friend from './friends/route';
import {loggerMiddleware} from './middleware/logger';

const app = express()
app.use(json())

connect();

app.use(loggerMiddleware)
app.use('/profile',profile)
app.use('/post',post)
app.use('/friend',friend)

app.listen(3000)
