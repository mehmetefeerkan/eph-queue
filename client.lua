AddEventHandler('playerSpawned', function(spawn)
    TriggerServerEvent('eph:queue:spawned')
end)