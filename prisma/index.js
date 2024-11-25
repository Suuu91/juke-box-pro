const bcrypt = require("bcrypt");
const {PrismaClient} = require ("@prisma/client");
const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async register (username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userToAdd = await prisma.user.create({
          data: {
            username,
            password: hashedPassword,
        }});
        return userToAdd
      },
      async login (username, password) {
        const userToLog = prisma.user.findUniqueOrThrow({
          where: {username},
        });
        const valid = await bcrypt.compare(password, userToLog.password);
        if (!valid) throw Error ("Invalid Password")
      }
    },
  }
});

module.exports = prisma