```mermaid
%% The navigation bar help user to naviage to their desired page/feature
sequenceDiagram;
  title Navigation Bar Diagram
  actor User
  participant Server
  participant Page Button
  participant Event Listener
  participant Brower
  User ->>Page Button: 'Click'
  Page Button ->>Server: Trigger a 'click' event
  Server ->>Event Listener: Notifies the listener and request rendering page assigned
  Event Listener ->>Server: Return the rendered page
  Server ->>Brower: Update the UI
  Brower ->>User: Display the desired rendered page

  
