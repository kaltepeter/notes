---
title: Complete Godot 4 2D: Code Your Own 2D Games In Godot 4!
date: 2025-5-23
tags:
  - course
  - gamedev.tv
  - game
  - godot
---

https://www.gamedev.tv/courses/godot-complete-2d/view

## Download

https://godotengine.org/download/macos/

## Create a Project

- Select a folder to store the project 
- Check create folder
- Use future+ rendering engine

## Nodes and Scenes

- Nodes are the building blocks of Godot
- A scene is a collection of nodes grouped together
- Thre are many types of nodes, each has their own unique functionality
- A Godot game is made up of many scenes

## Scenes

- convention is to name after the root node
- main scene is the scene that Godot runs when the game starts
- blue rectangle is the area in the game. blue rectangle is the viewport

### Instancing Scenes

1. Select the target scene root node
1. Click 'Instance Scene'
1. Select the scene to instance

Changing the original scene will not override instance changes.

To edit the child nodes of an instance, right click and check 'Editable Children'

## Parent and Child Nodes

- Deleting a parent deletes the children
- Positions are relative to the parent


## Pysics Body

### Rigid Body 2D

- Needs a collision shape
- has automatic phisics
- For collision shapes, never use transform, use shape properties or orange dot

## Coordinates

-x is left, +x is right
-y is up, +y is down

## Draw Order and Z-Index

- Can be negative
- Set background to large negative index
- Player is 0
- Organize other nodes around player
- Overrides scene tree order

## Scripting

- Scripts are files that contain code
- A node by itself has limited behavior
- Attach scripts to extend the default functionality of a node
- Example: Sprite2D node displays a texture by default. If you want the sprite to follow the mouse, you would attach a script to it and add the movement code.

### Languages

- GDScript - made by Godot for Godot
- C# - can't use in the Godot Scripting Workspace, popular by game developers and well supported
- C/C++ - fast and powerful

- You can mix all or any of these in the same project
- Example: Use GDScript for default and C# or C++ for performance critical code

### Adding 

1. Select root node
1. Click "Add Script" button
1. Default name matches the root node
1. Check template 'Node: Default'
1. Click 'Create'

Template

```GDScript
extends Node2D


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
```

### GDScript

https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html

- `#` is a comment
- `func` is a function
- `_` is a special function called by Godot
- `pass` is a placeholder
- `->` is a return type
- `extends <object>` is a subclass
- `**` is the power operator
- `50 / 12` is `4`, no float
- `50.0 / 12.0` is `4.166666666666667`
- `print("2 * 2 is " + str(4))` converts 4 to a string
- `var num = 4` declare a variable

`_ready()` is called when the node enters the scene tree for the first time.
`_process(delta)` is called every frame. `delta` is the elapsed time since the previous frame.
`_physics_process(delta)` is called every physics update. Unaffected by the frame rate.

#### Movement

- `apply_impulse` sets initial velocity, used for one time impact
- `apply_force` applies force over time, used for continuous force

```GDScript
apply_impulse(Vector2(25, 50)) # move 25 right, 50 down


func _process(delta: float) -> void:
	pass
	
	
func _physics_process(delta: float) -> void:
    # move 25 right, 0 down
	apply_force(Vector2(25, 0))
```

## Frames Per Second (FPS)

- Higher FPS means the game is running faster
- V-Sync: FPS is synced to the monitor's refresh rate
- Godot has V-sync on by default

`Engine.get_frames_per_second()` print FPS

### Input

Set the 'move_right' in the Project Settings > Input Map

1. Name 'move_right' and click 'Add'
1. Click 'Add Event'
1. Select an input key or mouse button
1. Repeat

```GDScript
Input.is_action_pressed("move_right")
```

### Movement

```GDScript
func _physics_process(delta: float) -> void:
	velocity = Vector2(100, 0) # property available to CharacterBody2D
	move_and_slide() # uses velocity property
```

## Nodes

- `Camera2D` 
    - Can be used to follow a node
    - Automatically follows the object
- `Area2D`
    - Does not have collision resolution
    - Can only detect other pyshics bodies and areas
    - We use it to detect when two physics object collide without creating a collision between them
- `CollisionShape2D`
- `CollisionPolygon2D`
    - Give a list of points
- `Polygon2D`
    - Give a list of points
    - Can have a texture
- `CanvasLayer`
    - Separate rendering layer
    - Layer ordering is a higher priority than z-index
    - Has it's own transform, camera will not effect it
    - Good practice to have a canvas layer as parent of ui nodes at all times
- `LabelNode`
    - Displays text
-  `Node`
    - Does nothing
    - Used as a parent to organiaze nodes
    - TIP: Create a graphics node and put all graphics under it

## Signals

- A signal is an event that can be triggered by the user or the engine
- Find signals under Node > Signals
- Click connect and connect to a script

## Debugging

### Collision Shapes

- Debug > Visible Collision Shapes
- If polygon is hard to see, navigate to the polygon and make it invisible

## Paralax

The background moves slower than the foreground, which creates depth

## Scale Mode Project Settings

Scale mode > onl.y canvas items keeps the game in place
