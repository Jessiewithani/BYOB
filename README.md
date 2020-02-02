| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `https://byob-deployment.herokuapp.com/characters` | GET | not needed | Array of all existing characters: `[{"id": 9,"name": "Rick Sanchez","status": "alive","species": "Human","type": "","created_at": "2020-01-31T17:30:50.299Z", "updated_at": "2020-01-31T17:30:50.299Z"},{"id": 10,"name": "Morty Smith","status": "Alive","species": "Human","type": "",
"created_at": "2020-01-31T17:30:50.302Z","updated_at": "2020-01-31T17:30:50.302Z"}]` |
| `https://byob-deployment.herokuapp.com/versions` | GET | not needed | Array of all existing versions: `[{"id": 30,"name": "Aqua Rick","status": "unknown","species": "Humanoid","type": "Fish-Person","characters_id": 9,"created_at": "2020-01-31T17:30:50.308Z","updated_at": "2020-01-31T17:30:50.308Z",
"location": "Citadel of Ricks"},{"id": 35,"name": "Cop Rick",
"status": "Alive","species": "Human","type": "","characters_id": 9,"created_at": "2020-01-31T17:30:50.317Z","updated_at": "2020-01-31T17:30:50.317Z","location": "Citadel of Ricks"}]` |
| `https://byob-deployment.herokuapp.com/:id` | GET | not needed | Chosen character: `{"id": 9,"name": "Rick Sanchez","status": "alive","species": "Human","type": "","created_at": "2020-01-31T17:30:50.299Z","updated_at": "2020-01-31T17:30:50.299Z"}` |
| `https://byob-deployment.herokuapp.com/:id` | GET | not needed | Chosen version: ` { "id": 35,"name": "Cop Rick","status": "Alive","species": "Human", "type": "","characters_id": 9,"created_at": "2020-01-31T17:30:50.317Z","updated_at": "2020-01-31T17:30:50.317Z",
"location": "Citadel of Ricks"}` |
| `https://byob-deployment.herokuapp.com/characters` | POST | `` | New Character: `{"name": <String>,"status": <String>,"species": <String>,"type": <String>}` |
| `https://byob-deployment.herokuapp.com/versions` | POST | `` | New Version: `{"name": <String>,"status": <String>,"species": <String>,"type": <String>,"location": <String>}` |
| `https://byob-deployment.herokuapp.com/:id` | DELETE | not needed | Response: `9` |