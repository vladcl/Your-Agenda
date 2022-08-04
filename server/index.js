const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 10


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,

}));


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: 'userId',
    secret: 'thisIsMySecretForEachUser',
    saveUninitialized: false,
    resave: false,
    proxy: true,
    cookie: {
        expires: 1000 * 60 * 60 * 24,
        sameSite: 'strict',
    },
}))


const db = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: '1dev2',
    database: 'crud_agenda',
})



const verifyJWT = (req, res, next) => {
    const token = res.headers['x-access-token']

    if (!token) {
        res.send('Parece que você não possui um token, tente novamente!')
    } else {
        jwt.verify(token, "jwtTestSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "A autenticação falhou!" })
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send('Muito bem! Você está autenticado!')
})

app.post('/registerment', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err)
        }

        db.query("INSERT INTO user (email, password) VALUES (?,?)", [email, hash], (err, result) => {
            console.log(err);
        }
        );

        res.send({ msg: "Ok!" })
    })

});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {

                        const id = result[0].id;
                        const token = jwt.sign({ id }, "jwtTestSecret", {
                            expiresIn: 300,
                        })

                        req.session.user = result;

                        req.json({ auth: true, token: token, result: result })
                    } else {
                        res.json({ auth: false, message: "Combinação de usuário/senha inválida!" })
                    }
                })
            } else {
                req.json({ auth: false, message: 'Usuário não existe!' })
            }
        }
    )
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
})

app.post('/register', (req, res) => {
    const { name } = req.body;
    const { description } = req.body;
    const { date_and_hour_initial } = req.body;
    const { date_and_hour_final } = req.body;
    const { status } = req.body;

    let SQL = `INSERT INTO activities (name, description, date_and_hour_initial, date_and_hour_final, status) VALUES ("${name}", "${description}", "${date_and_hour_initial}", "${date_and_hour_final}", "${status}")`;

    db.query(SQL, [name, description, date_and_hour_initial, date_and_hour_final, status], (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.get('/getCards', (req, res) => {

    let SQL = 'SELECT * from activities';

    db.query(SQL, (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    })

});

app.get('/getCalendar', (req, res) => {

    let SQL = 'SELECT * from activities';

    db.query(SQL, (err, result) => {
        if (err) console.log(err)
        else {


            const dados_Calendar = [];

            let dados_do_banco = result;
            for (let i = 0; i < dados_do_banco.length; i++) {
                const novo_objet = {
                    title:
                        `Evento: ${dados_do_banco[i].name}                 
                     Status: ${dados_do_banco[i].status}
                    Descrição: ${dados_do_banco[i].description}`,
                    start: dados_do_banco[i].date_and_hour_initial,
                    end: dados_do_banco[i].date_and_hour_final,
                }
                dados_Calendar.push(novo_objet);
            } res.send(dados_Calendar);
        };
    })

});

app.put('/edit', (req, res) => {
    const { id } = req.body;
    const { status } = req.body;


    let SQL = `UPDATE activities SET status = ? WHERE idactivities = ?`

    db.query(SQL, [status, id], (err, result) => {
        if (err) console.log(err)
        else res.send(result);
    });
});

app.delete('/delete/:id', (req, res) => {
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