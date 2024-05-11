const os = require('os');
const cluster = require('cluster');
const express = require('express');


const totalCPUs = os.cpus().length;

if (cluster.isPrimary){
    for (let i=0; i<totalCPUs; i++){
        cluster.fork();     //! creating working thread
    }
}else{
    const app = express();
    const PORT = 8000;

    app.get('/', (req, res) => {
        return res.json({
            message: `Hello from process ${process.pid}`
    })
})

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))

}