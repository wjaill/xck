

let broadcast = {

    broad(info){
        for(let id in this.clientMap){
            this.clientMap[id].send(info)
        }
    }

}

module.exports =  broadcast