# TJ Utils

A modern UI utility resource for FiveM providing notifications, progress bars, and TextUI functionality.
Preview: https://youtu.be/VabyZLvBsV4

## Features
- Modern, clean design with smooth animations
- Standalone resource
- Four notification types: info, success, error, warning
- Progress bar with label, duration, and position options
- TextUI with extensive positioning options
- Notification sounds
- Custom icon support (Font Awesome)

## Usage

### Notifications
```lua
-- Using export
exports.tj_utils:ShowNotification({
    type = 'success', -- 'info', 'success', 'error', 'warning'
    title = 'Success',
    description = 'Action completed successfully',
    duration = 5000, -- ms
    position = 'top-right', -- See positions below
    icon = 'fa-check' -- Optional custom icon (uses Font Awesome)
})

-- Server side
TriggerClientEvent('tj_utils:notify', source, {
    type = 'info',
    title = 'Information',
    description = 'This is an info message',
    duration = 3000,
    position = 'top-right'
})
```

### Progress Bar
```lua
-- Start progress (simple)
exports.tj_utils:ShowProgress('Loading...')

-- Start progress (advanced)
exports.tj_utils:ShowProgress({
    label = 'Loading...',
    duration = 2000, -- ms
    position = 'middle', -- 'middle', 'top', 'bottom'
    icon = 'fa-spinner' -- Optional custom icon
})

-- Hide progress
exports.tj_utils:HideProgress()

-- Server side
TriggerClientEvent('tj_utils:progress', source, {
    label = 'Loading...',
    duration = 2000, -- ms
    position = 'middle', -- 'middle', 'top', 'bottom'
    icon = 'fa-spinner' -- Optional custom icon
})

```

### TextUI
```lua
-- Show TextUI (simple)
exports.tj_utils:ShowTextUI('Press [E] to interact')

-- Show TextUI (advanced)
exports.tj_utils:ShowTextUI({
    icon = 'fa-keyboard',
    title = 'Interaction',
    description = 'Press [E] to interact',
    position = 'middle-right' -- See positions below
})

-- Hide TextUI
exports.tj_utils:HideTextUI()

--Server side
TriggerClientEvent('tj_utils:showTextUI', source, {
    icon = 'fa-keyboard',
    title = 'Interaction',
    description = 'Press [E] to interact',
    position = 'middle-right' -- See positions below
})

TriggerClientEvent('tj_utils:hideTextUI', source)
```

## Positions
- Notifications: 'top-right', 'top-left', 'bottom-right', 'bottom-left'
- Progress Bar: 'middle', 'top', 'bottom'
- TextUI: 
  - 'middle'
  - 'middle-right'
  - 'middle-left'
  - 'top-right'
  - 'top-left'
  - 'top'
  - 'bottom-right'
  - 'bottom-left'
  - 'bottom'

## Events
- tj_utils:notify
- tj_utils:progress
- tj_utils:hideProgress
- tj_utils:showTextUI
- tj_utils:hideTextUI

## Exports
- ShowNotification
- ShowProgress
- HideProgress
- ShowTextUI
- HideTextUI
