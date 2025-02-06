local function ShowNotification(data)
    SendNUIMessage({
        action = 'showNotification',
        data = data
    })
end

function ShowProgress(data, cb)
    if type(data) == 'string' then
        data = { label = data }
    end
    
    data.duration = data.duration or 5000
    data.position = data.position or 'bottom'
    
    SendNUIMessage({
        action = 'showProgress',
        data = data
    })
    
    CreateThread(function()
        Wait(data.duration)
        if cb then cb(true) end
    end)
end

local function HideProgress()
    SendNUIMessage({
        action = 'updateProgress'
    })
end

local function ShowTextUI(data)
    if type(data) == 'string' then
        data = { description = data }
    end
    
    SendNUIMessage({
        action = 'showTextUI',
        data = data
    })
end

local function HideTextUI()
    SendNUIMessage({
        action = 'hideTextUI'
    })
end

RegisterNetEvent('tj_utils:notify')
AddEventHandler('tj_utils:notify', ShowNotification)

RegisterNetEvent('tj_utils:progress')
AddEventHandler('tj_utils:progress', ShowProgress)

RegisterNetEvent('tj_utils:hideProgress')
AddEventHandler('tj_utils:hideProgress', HideProgress)

RegisterNetEvent('tj_utils:showTextUI')
AddEventHandler('tj_utils:showTextUI', ShowTextUI)

RegisterNetEvent('tj_utils:hideTextUI')
AddEventHandler('tj_utils:hideTextUI', HideTextUI)

exports('ShowNotification', ShowNotification)
exports('ShowProgress', ShowProgress)
exports('HideProgress', HideProgress)
exports('ShowTextUI', ShowTextUI)
exports('HideTextUI', HideTextUI)

RegisterCommand('info', function()
    ShowNotification({
        type = 'info', 
        title = 'Info',
        description = 'This is TJ Utils',
        duration = 5000, 
        position = 'top-right',
    })
end)

RegisterCommand('success', function()
    ShowNotification({
        type = 'success', 
        title = 'Success',
        description = 'Action completed successfully',
        duration = 5000,
        position = 'top-right',
    })
end)

RegisterCommand('error', function()
    ShowNotification({
        type = 'error', 
        title = 'Error',
        description = 'This is error notification',
        duration = 5000,
        position = 'top-right',
    })
end)

RegisterCommand('warning', function()
    ShowNotification({
        type = 'warning', 
        title = 'Warning',
        description = 'This is warning notification',
        duration = 5000,
        position = 'top-right',
    })
end)

RegisterCommand('progress', function()
    ShowProgress({
        label = 'Loading TJ utils...',
        duration = 5000, 
        position = 'bottom',
        icon = 'fa-spinner'
    }, function(success)
        if success then
            ShowNotification({
                type = 'success', 
                title = 'Success',
                description = 'Loaded TJ Utils',
                duration = 5000,
                position = 'top-right',
            })
        end
    end)
end)

RegisterCommand('textui', function()
    ShowTextUI({
        icon = 'fa-keyboard',
        title = 'Interaction',
        description = 'Press [E] to interact with TJ Utils',
        position = 'middle-right' 
    })
end)

RegisterCommand('hidetextui', function()
    HideTextUI()
end)