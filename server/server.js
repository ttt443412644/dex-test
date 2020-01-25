const jsonServer = require("json-server-relationship");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join("./server/", "db.json"));
//const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");
const v4 = require("node-uuid").v4;

server.use(middlewares);
server.use(jsonServer.bodyParser);

const db = router.db;

//авторизация
//https://qna.habr.com/q/386890
//https://stackoverflow.com/questions/52165333/deprecationwarning-buffer-is-deprecated-due-to-security-and-usability-issues

const generateToken = (id, res) => {
  const payload = {
    _id: id,
    iss: "http://localhost:5000",
    permissions: "poll"
  };
  const options = {
    expiresIn: "7d",
    jwtid: v4()
  };
  const secret = Buffer.from("AUTH0_CLIENT_SECRET", "base64");
  jwt.sign(payload, secret, options, (err, token) => {
    console.log(token);
    // отвечаем токеном, для будущих запросов с клиента
    return res.json({ data: token });
  });
};

server.post("/registration", (req, res, next) => {
  const user = req.body;

  //валидация

  //проверяем что такой пользователь еще не существует
  const userUser = db
    .get("user")
    .find({ email: user.email })
    .value();

  if (userUser) {
    return res
      .status(403)
      .json({ error: "Пользователь с данным email уже существует!" });
  }

  const id = new Date().getTime();
  user.id = id;
  db.get("user")
    .insert(user)
    .value();
  db.write();

  return generateToken(id, res);
});

server.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  //валидация на подбор пароля

  //получаем нашего пользователя
  const user = db
    .get("user")
    .find({ email: email, password: password })
    .value();

  //если пользователь существует
  if (user) {
    return generateToken(user.id, res);
  } else {
    return res.status(402).json({ error: "Неверный email или пароль!" });
  }
});

const requireToken = (req, res, next) => {
  const token = req.headers["x-api-key"];
  const secret = Buffer.from("AUTH0_CLIENT_SECRET", "base64");

  console.log("Проверка токена");

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    req.params.userId = decoded._id;
    console.log(req.params);
    next();
  });
};

server.use((req, res, next) => {
  console.log(req.url);

  const url = req.url;
  const method = req.method;

  //для карточки товара делаем составной объект
  if (method === "GET" && url.startsWith("/product/details/")) {
    //сохраняем полный список свойств
    const properties = db.get("properties").value();

    //получаем идентификатор продукта
    const productId = parseInt(url.substring(url.lastIndexOf("/") + 1));
    if (!isNaN(productId)) {
      //выбираем продукт из БД
      const product = db
        .get("product")
        .find({ id: productId })
        .value();

      //выбираем значения свойств для данного продукта
      const productProperties = db
        .get("product_props")
        .filter({ productId: productId })
        .value();

      //если вернуть не новый объект, то он будет сохранен в базе с новыми полями

      return res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image_url,

        productProperties: productProperties,
        properties: properties
      });
    } else {
      return res.json({
        id: null,
        productProperties: [],
        properties: properties
      });
    }
  } else {
    //для остальных запросов требуем токен
    requireToken(req, res, next);
  }
});

//проверяем на наличие свойства с таким именем
server.post("/properies", (req, res, next) => {
  const name = req.body.name;

  const property = db
    .get("properties")
    .find({ name: name })
    .value();

  if (property) {
    return res
      .status(400)
      .json({ error: "Свойство с таким наименованием уже существует!" });
    //    res.sendStatus(400);
  }
  next();
});

//при редактировании или добавлении товара - дополняем датой
server.post("/product/", (req, _, next) => {
  //сохраняем свойства продукта в отдельной таблице БД

  //обнуляем
  req.body.properties = undefined;
  req.body.productProperties = undefined;

  console.log("обнуляем 1");

  req.body.price_dt = new Date().getTime();
  next();
});
server.put("/product/:id", (req, _, next) => {
  //сохраняем свойства продукта в отдельной таблице БД

  //обнуляем
  req.body.properties = undefined;
  req.body.productProperties = undefined;

  console.log("обнуляем 2");

  req.body.price_dt = new Date().getTime();
  next();
});

//надо еще добавить свойства для продукта

server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
