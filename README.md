# SL PWA
The official SL (Stockholms Lokaltrafik) Android app is not great so decided to make a PWA that I can use to avoid getting frustrated.

#### Things to do
- [ ] CI/CD with Github Actions
- [x] Fix web manifest to make the app able to be installed

#### Features
- [x] Show countdown for each suggested trip until they leave
- [ ] Star trips
- [ ] Show legs of the trip
- [ ] Detailed view of a trip
- [ ] Select time
- [ ] Save `from` and `to` in query parameters with `URLSearchParams` and `History API`.
- [ ] Show original time if trip was delayed

#### Bugs
- [x] Seleting an address as a location breaks the trip planning API