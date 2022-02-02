let queue = true

on('playerConnecting', async (name, setKickReason, deferrals) => {
    let src = global.source;
    if (queue) {
        deferrals.defer();
        setTimeout(() => {
            deferrals.update(`Sıra kontrol ediliyor.`)
            //deferrals.update(`Checking the server queue.`)
            if (playersInQueue.size === 0) {
                deferrals.done()
                playersInQueue.add(name)
            } else {
                setInterval(() => {
                    if (playersInQueue.size !== 0) {
                        deferrals.update(`Şu anda bu sunucunun tekli giriş sırası aktif. Sırada ${playersInQueue.size} kişi mevcut.`)
                        //deferrals.update(`This server has a join queue active right now. There are ${playersInQueue.size} players in the queue. Please Wait.`)
                    } else {
                        deferrals.done()
                        playersInQueue.add(name)
                    }
                }, 100);
            }
        }, 0)
    } else {
        deferrals.done()
    }
});

setInterval(() => {
    playersInQueue.clear()
}, 60000);

onNet('eph:queue:spawned', () => {
    playersInQueue.delete(GetPlayerName(source))
});

exports("queueSize", () => {
    return (playersInQueue.size)
});

exports("clearQueue", () => {
    playersInQueue.clear()
    return (playersInQueue.size)
});

exports("toggleQueue", () => {
    queue = !queue
    return (queue)
});

exports("queueState", () => {
    return (queue)
});

exports("getQueuedPlayers", () => {
    return (JSON.stringify(playersInQueue))
});

exports("isInQueue", (pname) => {
    return (playersInQueue.has(pname)) //id based in future
});

RegisterCommand("togglequeue", function (source) {
    if (source === 0) {
        queue = !queue
        console.log(`Queue is now ${queue ? "on" : "off"}`)
    }
})
RegisterCommand("queuesize", function () {
    if (source === 0) {
        console.log("Queue size is :", playersInQueue.size, "players.")
    }
})
RegisterCommand("queuestate", function (source) {
    if (source === 0) {
        console.log(`Queue is ${queue ? "on" : "off"}`)
    }
})
RegisterCommand("clearqueue", function (source) {
    if (source === 0) {
        playersInQueue.clear()
        console.log(`Queue is cleared.`)
    }
})


let playersInQueue = new Set()
