const bcrypt = require('bcryptjs');
const myfunction = async () => {
    const password = 'Red12345!';
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log((password));
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('red12345!', hashedPassword);
    console.log(isMatch);
};

myfunction().then().catch((e) => console.log(e));
