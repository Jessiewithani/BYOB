const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3001);
app.use(express.json())
app.use(cors());

app.get('/api/v1/characters', async (request, response) => {

    try {
        const characters = await database('characters').select();
        response.status(200).json(characters)
    } catch(error) {
        response.status(500).json({error})
    }
})

app.get('/api/v1/versions', async (request, response) => {

    try {
        const versions = await database('versions').select();
        response.status(200).json(versions)
    } catch(error) {
        response.status(500).json({error})
    }
})

app.get('/api/v1/characters/:id', async (request, response) => {

    try {
        const characters = await database('characters').where('id', request.params.id).select();
        characters.length ? response.status(200).json(characters) : response.status(404).json({error: `Could not find character with id ${request.params.id}`})
    } catch(error) {
        response.status(500).json({error})
    }
})

app.get('/api/v1/versions/:id', async (request, response) => {

    try {
        const versions = await database('versions').where('id', request.params.id).select();
        versions.length ? response.status(200).json(versions) : response.status(404).json({error: `Could not find version with id ${request.params.id}`})
    } catch(error) {
        response.status(500).json({error})
    }
})

app.post('/api/v1/characters', async (request, response) => {
    const character = request.body;

    for (let requiredParameter of ['name', 'status', 'species', 'type']) {
        if (!character[requiredParameter]) {
            return response
                .status(422)
                .send({error: `Expected format: { name: <String>, status: <String>, species: <String>, type: <String> }. You're missing a "${requiredParameter}" property.`})
        }
    }

    try {
        const id = await database('characters').insert(character, 'id');
        response.status(201).json({id})
    } catch (error) {
        response.status(500).json({error});
    }
});

app.post('/api/v1/versions', async (request, response) => {
    const version = request.body;

    for (let requiredParameter of ['name', 'status', 'species', 'type', 'location']) {
        if (!version[requiredParameter]) {
            return response
                .status(422)
                .send({error: `Expected format: { name: <String>, status: <String>, species: <String>, type: <String>, location: <String> }. You're missing a "${requiredParameter}" property.`})
        }
    }

    try {
        const id = await database('versions').insert(version, 'id');
        response.status(201).json({id})
    } catch (error) {
        response.status(500).json({error});
    }
});

app.delete('/api/v1/characters/:id', async (request, response) => {
    try {
        const character = await database('characters').where('id', request.params.id)
        
        if (character.length > 0) {
            await database('characters').where('id', request.params.id).del()
            response.status(200).send('character deleted')
        } else {
            response.status(422).json({error: ` no record found for id ${request.params.id}`});
        }
    } catch (error) {
        response.status(500).json({ error })
    }
})

app.listen(app.get('port'), () => {
    console.log(`Server is running on http://localhost:${app.get('port')}.`)
})