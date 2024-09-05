# Extract information for all profile avatars of Alkemio Users++

### Export an Excel with groups of avatars:
- Inaccessible Avatars: x
- Non Alkemio Avatars: x
- Default Avatars: x
- Alkemio Avatars: x

`npm run users-avatar-excel`


### Generate default avatar (eu.ui.avatars.com) and replace the visual for inaccessible ones

`npm run users-avatar-excel -- --generate-default`
You need to manually upload the generated ones.


### Upload default avatars hosted in eu.ui-avatars.com to Alkemio Storage

`npm run users-avatar-excel -- --upload-default`



######
In `users-avatar/utils` there is also a method that can download an SVG/PNG from provided URL and make it available for manual upload.
(not used ATM)