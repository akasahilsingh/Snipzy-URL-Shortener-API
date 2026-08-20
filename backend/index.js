const app = require("./src/app.js")

const PORT =  process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log(`Server is started on port ${PORT}`)
})

