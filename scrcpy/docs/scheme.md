```
  +--------------------------+            +------------------------------+  
  | Android device           |            | Server                       |  
  |                          |            |                              |  
  | +----------------------+ |            | +--------------------------+ |  
  | | adb                  | | Run scrcpy | | adb (client)             | |  
  | |                      |<---------------|                          | |  
  | | (usb/tcp)            | |            | |                          | |  
  | +----------------------+ |            | +--------------------------+ |  
  |                          |            |                              |  
  | +----------------------+ |            | +--------------------------+ |  
  | | scrcpy               | |            | | nodejs                   | |  
  | |                      | |            | |                          | |  
----| (ws://0.0.0.0:8886/) | |            | | (http://0.0.0.0:8010/)   |----
| | +----------------------+ |            | +--------------------------+ | |
| +--------------------------+            +------------------------------+ |
|                                                                          |
|                                                                          |
|                                                                          |
|                                                                          |
|                                                                          |
|                                                    HTTP:                 |
|                +------------------------------+    < static (html, js...)|
|Web-socket:     | Client                       |                          |
|< Input events  |                              |    Web-socket:           |
|> Video stream  | +--------------------------+ |    < Device list         |
-------------------| Web-browser              |-----------------------------
                 | +--------------------------+ |                           
                 +------------------------------+                           
```