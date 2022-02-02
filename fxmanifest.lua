----------------------------------------
-- eph-queue | an extremely lightweight queue script
----------------------------------------

fx_version 'adamant'
game 'gta5'

author 'ephesus'
description 'Prevents two or more players from simultaneously joining to the server, assuring a smooth network usage.'

server_script 'server.js'
client_script 'client.lua'

server_export 'queueSize'
server_export 'clearQueue'
server_export 'toggleQueue'
server_export 'queueState'
server_export 'isInQueue'
server_export 'getQueuedPlayers'