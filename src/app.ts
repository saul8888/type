
import express from 'express';
import { json } from "body-parser";
import { connect } from "./db/database";
import perfil from './perfil/route';
import post from './post/route';
import friend from './friends/route';
import {loggerMiddleware} from './perfil/route';

const app = express()
app.use(json())

connect();

app.use(loggerMiddleware)
app.use('/api',perfil)
app.use('/api',post)
app.use('/api',friend)

app.listen(3000)
