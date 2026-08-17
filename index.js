const app = require("./src/app.js")

const PORT =  3000;
app.listen(PORT, ()=> {
    console.log(`Server is started on port ${PORT}`)
})

