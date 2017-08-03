import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as net from 'net'
import * as readline from 'readline'

const gatewayPort = 7770;
const lambdaPort = 7777;

const app = express();

app.use(bodyParser.json());

app.get('/:stage/hello', (req, res) => {
    console.log('hello');
    res.status(200).send({ greeting: 'hello!' });
});

app.post('/:stage/update', (req, res, next) => {
    console.log('update', req.body);
    sendUpdateToLambda(req.body, (err, data) => {
        if(err) res.status(500).send(err);
        else res.status(200).header('Content-Type', 'application/json').send(data);
        next();
    });
});

app.listen(gatewayPort, 'localhost');


function sendUpdateToLambda(update, cb) {
    const socket = net.connect(lambdaPort);    
    socket.on('error', err => {
        console.error(err);
        socket.destroy();
    });

    socket.on('connect', () => {
        const rl = readline.createInterface(socket, socket);
        rl.question(JSON.stringify(update) + '\n', answer => {
            if(answer.startsWith('[ERR]')) {
                cb(answer);
            }
            else {
                cb(undefined, answer);
            }

            rl.close();
            socket.destroy();
        });
    });
}

