const jwt = require('jsonwebtoken');
const myFunction = async () => {
    const key = process.env.JWT_SECRET;
    const token = jwt.sign({_id: 'abc234'}, key, {expiresIn: '5 seconds'});
    console.log(token);

    const data = jwt.verify(token, key);
    console.log(data);
};

myFunction().then().catch((e) => console.log(e));
