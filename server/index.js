const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
let validator = require('email-validator')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken')

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: 'userId',
    secret: 'thisIsMySecretForUsers',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
        sameSite: 'strict'
    }


}))



const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: '1dev2',
    database: 'crud_agenda',
})

app.post('/registerment', (req, res) => {

    const email = req.body.email
    const password = req.body.password
    let errors = [];

    if (validator.validate(req.body.email)) {

        if (password.length < 8) {
            errors.push({ msg: 'Password should be atleast 8 characters' });
            res.status(401).send('Password should be atleast 8 characters');;

        } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {

                if (err) {
                    console.log(err)
                }

                db.query("INSERT INTO users (email, password) VALUES (?,?)", [email, hash], (err, result) => {
                    console.log(err);
                }
                );

                res.send({ msg: "Ok!" })
            })
        }

    } else {
        res.status(400).send('Invalid Email');
    }


});


app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        const id = result[0].idusers
                        console.log(result[0])
                        const token = jwt.sign({ id }, "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611", {
                            expiresIn: 300,
                        })

                        req.session.user = result;

                        res.json({ auth: true, token: token, result: result })
                    } else {
                        res.json({ auth: false, message: 'Combinação usuário/senha incorreta!' });

                    }
                })
            } else {
                res.json({ auth: false, message: 'Usuário não existe!' });
            }
        }
    )
});

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) {
        res.send('Você precisa de um token, tente novamente!')
    } else {
        jwt.verify(token, "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611", (err, decoded) => {
            if (err) {
                res.status(401).json({ auth: false, message: "A autenticação falhou!" })
            } else {

                req.userId = decoded.id;
                next();
            }

        })
    }
}



app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send('Olá, você está autenciado!')
})

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false });
    }
})

app.post('/register', verifyJWT, (req, res) => {
    const { name } = req.body;
    const { description } = req.body;
    const { date_and_hour_initial } = req.body;
    const { date_and_hour_final } = req.body;
    const { status } = req.body;
    const user_id = req.userId;
    console.log('test', req.userId)
    console.log('test2', user_id);

    let SQL = `INSERT INTO activities (name, description, date_and_hour_initial, date_and_hour_final, status, user_id) VALUES ("${name}", "${description}", "${date_and_hour_initial}", "${date_and_hour_final}", "${status}", ${user_id})`;

    let response;

    db.query(SQL, [name, description, date_and_hour_initial, date_and_hour_final, status, user_id], (err, result) => {
        if (err) { console.log(err); }
        response = result;
    });
    db.commit()
    res.send(response);
});

app.get('/getCards', verifyJWT, (req, res) => {
    const userId = req.userId
    console.log(userId)
    let SQL = `SELECT * from activities WHERE user_id = "${userId}"`;

    db.query(SQL, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    })

});

app.get('/getCalendar', verifyJWT, (req, res) => {

    let SQL = 'SELECT * from activities';

    db.query(SQL, (err, result) => {
        if (err) console.log(err)
        else {


            const dados_Calendar = [];

            let dados_do_banco = result;
            for (let i = 0; i < dados_do_banco.length; i++) {
                const novo_objeto = {
                    title:
                        `Evento: ${dados_do_banco[i].name}                 
                     Status: ${dados_do_banco[i].status}
                    Descrição: ${dados_do_banco[i].description}
                    groupId: ${dados_do_banco[i].user_id},`,
                    start: dados_do_banco[i].date_and_hour_initial,
                    end: dados_do_banco[i].date_and_hour_final,
                    groupId: dados_do_banco[i].user_id,
                }
                dados_Calendar.push(novo_objeto);
            } res.send(dados_Calendar);
        };
    })

});

app.put('/edit', verifyJWT, (req, res) => {
    const { id } = req.body;
    const { status } = req.body;


    let SQL = `UPDATE activities SET status = ? WHERE idactivities = ?`

    db.query(SQL, [status, id], (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    });
});

app.delete('/delete/:id', verifyJWT, (req, res) => {
    const { id } = req.params;

    let SQL = 'DELETE FROM activities WHERE idactivities = ?';

    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
})

app.listen(3001, () => {
    console.log('rodando servidor');
});