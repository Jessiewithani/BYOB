const environment = process.env.NODE_ENV || 'development'; //lets us know that we're in an environment, if you're not sure, the default will be in development.
const configuration = require('./knexfile')[environment];//based off of the environment, connects the database to the knex file.
const database = require('knex')(configuration); //allows us to access the database.
const express = require('express');//library that creates an abstraction over the node.
const app = express(); //allows us to get access to express method.
const cors = require('cors');//allows you to make api calls from other domains.

app.set('port', process.env.PORT || 3001); //going to have our port on 3001.
app.use(express.json()); //automatically parses everything that runs through express
app.use(cors());//allows api calls from other domains.

app.get('/api/v1/characters', async (request, response) => { //our express app is handling a GET request to 'api/v1/characters'.

    try {
        const characters = await database('characters').select(); //declaring a variable called characters, with the value being the settled promise. Then when the promise is return, select the character.
        response.status(200).json(characters) //returns a status code that means that the response was successful.
    } catch(error) { //error handling
        response.status(500).json({error}) //gives back a status code of 500 which means there is a server error.
    }
})

app.get('/api/v1/versions', async (request, response) => { //our express app is handling a GET request to 'api/v1/versions'.

    try { //code in the try block is executed first
        const versions = await database('versions').select(); //declaring a variable called versions that has the value that is waiting for a promise, then accessing the characters table in the database and selecting them.
        response.status(200).json(versions) //returns a status code that means that the response was successful.
    } catch(error) { //if an error occurs
        response.status(500).json({error}) //gives back a status code of 500 which means there is a server error.
    }
})

app.get('/api/v1/characters/:id', async (request, response) => { //our express app is handling a GET request to 'api/v1/characters/:id'.

    try { //code in the try block is executed first
        const characters = await database('characters').where('id', request.params.id).select(); //declaring a variable called characters that has the value that is waiting for a promise, then accessing the characters table in the database and selecting them where the id matches the params id then selecting it.
        characters.length ? response.status(200).json(characters) : response.status(404).json({error: `Could not find character with id ${request.params.id}`}) //was a character received? Return a 200 status code which is successful and parse the text for the character, otherwise show a 404 which can't be found.
    } catch(error) { //if an error occurs
        response.status(500).json({error}) //gives back a status code of 500 which means there is a server error.
    }
})

app.get('/api/v1/versions/:id', async (request, response) => { //our express app is handling a GET request to 'api/v1/versions/:id'.

    try { //code in the try block is executed first
        const versions = await database('versions').where('id', request.params.id).select(); //declaring a variable called versions that has the value that is waiting for a promise, then accessing the characters table in the database and selecting them where the id matches the params id then selecting it.
        versions.length ? response.status(200).json(versions) : response.status(404).json({error: `Could not find version with id ${request.params.id}`}) //was a version received? Return a 200 status code which is successful and parse the text for that version, otherwise show a 404 which can't be found.
    } catch(error) { //if an error occurs
        response.status(500).json({error}); //gives back a status code of 500 which means there is a server error.
    }
})

app.post('/api/v1/characters', async (request, response) => { //our express app is handling a POST request to 'api/v1/characters'.

    const character = request.body; //declaring a variable of character with the value with the body of the request from the characters database.

    for (let requiredParameter of ['name', 'status', 'species', 'type']) { //for each of these required parameters (name, status, species, and type)
        if (!character[requiredParameter]) { //if one of the required parameters isn't present
            return response //return the response 
                .status(422) //returns a status code of 422 that means unprocessable entity.
                .send({error: `Expected format: { name: <String>, status: <String>, species: <String>, type: <String> }. You're missing a "${requiredParameter}" property.`}) //sends back an error specifying which required parameter is missing.
        }
    }

    try { //code in the try block is executed first
        const id = await database('characters').insert(character, 'id'); //declaring a variable of id, waiting for a promise to resolve, then accessing the characters table from the database and adding a new character with a new id.
        response.status(201).json({id}) //gives back a 201 status code which is more specific on a successful response.
    } catch (error) { //if an error occurs
        response.status(500).json({error}); //gives back a status code of 500 which means there is a server error.
    }
});

app.post('/api/v1/versions', async (request, response) => { //our express app is handling a POST request to 'api/v1/versions'.

    const version = request.body; //declaring a variable of version and the value is the data coming from the body of what's in the versions data.

    for (let requiredParameter of ['name', 'status', 'species', 'type', 'location']) { //for each of these required parameters (name, status, species, type, and location)
        if (!version[requiredParameter]) { //if one of the required parameters isn't present
            return response //return response
                .status(422) //returns a status code of 422 that means unprocessable entity.
                .send({error: `Expected format: { name: <String>, status: <String>, species: <String>, type: <String>, location: <String> }. You're missing a "${requiredParameter}" property.`}) //sends back an error specifying which required parameter is missing.
        }
    }

    try { //code in the try block is executed first
        const id = await database('versions').insert(version, 'id') //declaring a variable of id, waiting for the promise to resolve then accessing versions in the database and creating a new version with a new id.
        response.status(201).json({id}) //gives back a 201 status code which is more specific on a successful response.
    } catch (error) { //if an error occurs
        response.status(500).json({error}); //gives back a status code of 500 which means there is a server error.
    }
});

app.delete('/api/v1/characters/:id', async (request, response) => { //our express app is handling a DELETE request to 'api/v1/characters/:id'.

    try { //code in the try block is executed first
        const character = await database('characters').where('id', request.params.id) //declaring a variable of character, waiting for the promise to resolve, then retrieve from the database to access the characters table, find the id that matches the params in the endpoint.
        
        if (character.length > 0) { //if the data has a length that is greater than 0
            await database('characters').where('id', request.params.id).del() //retrieve from the database to access the characters table, find the id that matches the parmas in the endpoint, then delete it.
            response.status(200).send('character deleted') //returns a status code that means that the response was successful.
        } else { //otherwise
            response.status(422).json({error: ` no record found for id ${request.params.id}`}); //returns a status code of 422 that means unprocessable entity. Returns an error of a parsed text, clarify which id is not found. 
        }
    } catch (error) { //if an error occurs
        response.status(500).json({ error }) //gives back a status code of 500 which means there is a server error. Returns an error that is parsed.
    }
})

app.get('/', (request, response) => { //our express app is handling a GET request to '/'.
    response.status(200).send("dale") //returns a status code that means that the response was successful. Send the message dale.
})

app.listen(app.get('port'), () => { //just gets the server up and running, which port to run on.
    console.log(`Server is running on http://localhost:${app.get('port')}.`) //logging which port the server is running on.
})